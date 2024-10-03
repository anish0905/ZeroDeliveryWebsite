const User = require("../models/User");
const jwt = require("jsonwebtoken");
const twilio = require("twilio");
const { generateOTP } = require("../utils/otp");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const twilioClient = new twilio(accountSid, authToken);


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "amitkumar425863@gmail.com",
    pass: "wqql hbvq udjt erat",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// const sendOtp = async (mobileNumber) => {
//   try {
//     const verification = await client.verify
//       .services(process.env.TWILIO_VERIFY_SERVICE_SID)
//       .verifications.create({ to: mobileNumber, channel: "sms" });
//     console.log(`OTP sent to ${mobileNumber}. SID: ${verification.sid}`);
//   } catch (error) {
//     console.error("Error sending OTP:", error);
//     throw new Error("Failed to send OTP. Please verify the phone number.");
//   }
// };

// const handleErrorResponse = (res, error) => {
//   console.error(error);
//   res.status(500).send(error.message);
// };

// Update Location
exports.updateLocation = async (req, res) => {
  const { mobileNumber, location } = req.body;

  try {
    const user = await User.findOne({ mobileNumber });
    if (!user) return res.status(404).send("User not found");

    user.location = location;
    await user.save();
    res.status(200).send("Location updated successfully");
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

// Get Location
exports.getLocation = async (req, res) => {
  const { mobileNumber } = req.query;

  try {
    const user = await User.findOne({ mobileNumber });
    if (!user) return res.status(404).send("User not found");

    res.status(200).send({ location: user.location });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

// Update Address
exports.updateAddress = async (req, res) => {
  const { mobileNumber, address } = req.body;

  try {
    const user = await User.findOne({ mobileNumber });
    if (!user) return res.status(404).send("User not found");

    user.address = address;
    await user.save();
    res.status(200).send("Address updated successfully");
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

// Get Address
exports.getAddress = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send("Invalid User ID");
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");

    res.status(200).send({ address: user.address });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

// Add Balance
exports.addBalance = async (req, res) => {
  const { mobileNumber, amount } = req.body;

  try {
    const user = await User.findOne({ mobileNumber });
    if (!user) return res.status(404).send("User not found");

    user.wallet += amount;
    await user.save();
    res.status(200).send("Wallet updated successfully");
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

// Get Balance
exports.getBalance = async (req, res) => {
  const { mobileNumber } = req.query;

  try {
    const user = await User.findOne({ mobileNumber });
    if (!user) return res.status(404).send("User not found");

    res.status(200).send({ wallet: user.wallet });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  const { mobileNumber, confirmDeletion } = req.query;

  if (!mobileNumber) {
    return res.status(400).json({ message: "Mobile number is required" });
  }

  if (confirmDeletion !== "true") {
    return res.status(400).json({ message: "Deletion not confirmed" });
  }

  try {
    const user = await User.findOne({ mobileNumber });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.security) {
      await User.deleteOne({ mobileNumber });
      return res.status(200).json({ message: "User details deleted successfully" });
    } else {
      return res.status(400).json({ message: "Deletion not allowed" });
    }
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

// Verify User
exports.verifyUser = async (req, res) => {
  const { mobileNumber, email, otp } = req.body;

  try {
    let user;

    if (mobileNumber) {
      user = await User.findOne({ mobileNumber });
      if (!user) return res.status(404).json({ message: "User not found with this mobile number." });
      if (user.otp !== otp) return res.status(401).json({ message: "Invalid OTP for mobile number." });
    } else if (email) {
      user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found with this email." });
      if (user.otp !== otp) return res.status(401).json({ message: "Invalid OTP for email." });
    } else {
      return res.status(400).json({ message: "Please provide either a mobile number or an email." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    user.isVerified = true;
    await user.save();

    return res.json({ message: "OTP verified. Login successful.", token, userId: user._id });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

// Get User By ID
exports.getUserById = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

// Add User Name
exports.addUserName = async (req, res) => {
  const userId = req.params.userId;
  const { name } = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, { name }, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

// exports.login = async (req, res) => {
//   const { mobileNumber, email } = req.body;

//   try {
//     let user;
//     const otpCode = generateOTP(6); // Generate a 6-digit OTP

//     // Check if the user exists by mobile number or email
//     if (mobileNumber) {
//       user = await User.findOne({ mobileNumber }) || new User({ mobileNumber, otp: otpCode });
//     } else if (email) {
//       user = await User.findOne({ email }) || new User({ email, otp: otpCode });
//     } else {
//       return res.status(400).json({ message: "Please provide either a mobile number or an email." });
//     }

//     // Update OTP in the user document
//     user.otp = otpCode;
//     await user.save();

//     // Send OTP via mobile number using Twilio
//     if (mobileNumber) {
//       try {
//         await twilioClient.messages.create({
//           body: `Your OTP code is ${otpCode}`,
//           from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
//           to: mobileNumber,
//         });
//         return res.status(200).json({ message: "OTP sent via mobile." });
//       } catch (error) {
//         console.error("Twilio error response:", error); // Log detailed error
//         return res.status(500).json({ message: "Error sending OTP via mobile.", error: error.message });
//       }
//     }
    

//     // Send OTP via email using Nodemailer
//     if (email) {
//       const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: email,
//         subject: 'Your OTP Code',
//         text: `Your OTP code is ${otpCode}`,
//       };

//       transporter.sendMail(mailOptions, (error) => {
//         if (error) {
//           console.error("Error sending email:", error);
//           return res.status(500).json({ message: "Error sending OTP via email." });
//         }
//         res.status(200).json({ message: "OTP sent via email." });
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({ message: "Error sending OTP via mobile." });

//   }
// };






exports.login = async (req, res) => {
  const { mobileNumber, email } = req.body;

  try {
    let user;
    const otpCode = generateOTP(6); // Generate a 6-digit OTP

    // If mobileNumber is provided
    if (mobileNumber) {
      // Find or create user by mobile number
      user = await User.findOne({ mobileNumber });

      // If the user doesn't exist, create a new one with a demo email and OTP
      if (!user) {
        const defaultEmail = `${new mongoose.Types.ObjectId().toString()}@zerodelivery.com`; // Demo email
        user = new User({ mobileNumber, email: defaultEmail, otp: otpCode });
      }
    } 
    // If email is provided
    else if (email && email.trim()) {
      // Find or create user by email
      user = await User.findOne({ email }) || new User({ email, otp: otpCode });
    } 
    else {
      // If neither mobile number nor email is provided, return an error
      return res.status(400).json({ message: "Please provide either a valid mobile number or an email." });
    }

    // Update OTP and expiry
    user.otp = otpCode;
    user.otpExpires = Date.now() + 15 * 60 * 1000; // OTP expires in 15 minutes
    await user.save();

    // Send OTP via mobile number using Twilio
    if (mobileNumber) {
      try {
        await twilioClient.messages.create({
          body: `Your OTP code is ${otpCode}`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: mobileNumber,
        });
        return res.status(200).json({ message: "OTP sent via mobile." });
      } catch (error) {
        return res.status(500).json({ message: "Error sending OTP via mobile.", error: error.message });
      }
    }

    // Send OTP via email using Nodemailer
    if (email && email.trim()) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otpCode}`,
      };

      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          return res.status(500).json({ message: "Error sending OTP via email." });
        }
        return res.status(200).json({ message: "OTP sent via email." });
      });
    } else {
      // If the user only provided a mobile number, return success without email sending
      return res.status(200).json({ message: "OTP generated and user created without email." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error occurred.", error: error.message });
  }
};



