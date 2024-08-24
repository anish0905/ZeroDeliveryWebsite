const User = require("../models/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const twilio = require("twilio");
const { generateOTP } = require("../utils/otp");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const { sendSms } = require("../../utils/smsService");




const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);


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


// console.log(client)

const sendOtp = async (mobileNumber) => {
  try {
    const verification = await client.verify
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({ to: mobileNumber, channel: "sms" });
    console.log(`OTP sent to ${mobileNumber}. SID: ${verification.sid}`);
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw new Error("Failed to send OTP. Please try again.");
  }
};

exports.requestOtp = async (req, res) => {
  const { mobileNumber } = req.body;

  try {
    let user = await User.findOne({ mobileNumber });
    if (!user) {
      user = new User({ mobileNumber });
      await user.save();
    }
    await sendOtp(mobileNumber);
    res.status(200).send("OTP sent");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.verifyOtp = async (req, res) => {
  const { mobileNumber, otp } = req.body;
  try {
    const verificationCheck = await client.verify
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks.create({ to: mobileNumber, code: otp });

    if (verificationCheck.status !== "approved") {
      return res.status(400).send("Invalid or expired OTP");
    }

    let user = await User.findOne({ mobileNumber });
    if (!user) {
      return res.status(400).send("User not found");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).send({ token, userId: user._id });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//location
exports.updateLocation = async (req, res) => {
  const { mobileNumber, location } = req.body;

  try {
    const user = await User.findOne({ mobileNumber });
    if (!user) {
      return res.status(404).send("User not found");
    }

    user.location = location;
    await user.save();

    res.status(200).send("Location updated successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getLocation = async (req, res) => {
  const { mobileNumber } = req.query;

  try {
    const user = await User.findOne({ mobileNumber });
    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).send({ location: user.location });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateAddress = async (req, res) => {
  const { mobileNumber, address } = req.body;

  try {
    const user = await User.findOne({ mobileNumber });
    if (!user) {
      return res.status(404).send("User not found");
    }

    user.address = address;
    await user.save();

    res.status(200).send("Address updated successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getAddress = async (req, res) => {
  const { userId } = req.params; // Fixed the typo from req.prams to req.params

  // Validate the UserId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send("Invalid User ID");
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).send({ address: user.addresses });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.addBalance = async (req, res) => {
  const { mobileNumber, amount } = req.body;

  try {
    const user = await User.findOne({ mobileNumber });
    if (!user) {
      return res.status(404).send("User not found");
    }

    user.wallet += amount;
    await user.save();
    res.status(200).send("Wallet updated successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getBalance = async (req, res) => {
  const { mobileNumber } = req.query;

  try {
    const user = await User.findOne({ mobileNumber });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).send({ wallet: user.wallet });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//security

exports.checkSecurity = async (req, res) => {
  const { mobileNumber } = req.query;
  console.log(`Checking security for ${mobileNumber}`);

  if (!mobileNumber) {
    return res.status(400).json({ message: "Mobile number is required" });
  }

  try {
    const user = await User.findOne({ mobileNumber });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.security) {
      return res.status(200).json({
        message:
          "Security is true. Do you want to delete this user? If yes, call the delete endpoint with confirmation.",
        userId: user._id,
      });
    } else {
      return res.status(200).json({ security: user.security });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

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
      return res
        .status(200)
        .json({ message: "User details deleted successfully" });
    } else {
      return res.status(400).json({ message: "Deletion not allowed" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { mobileNumber } = req.body;

  try {
    // Generate a 4-digit OTP
    const otpCode = generateOTP(6);

    // Find if user already exists
    let user = await User.findOne({ mobileNumber });

    if (!user) {
      // If user doesn't exist, create a new user with the OTP
      user = new User({ mobileNumber, otp: otpCode });
      await user.save();

      // Send OTP to user's mobile number (assuming you have an SMS sending service)
      // sendOTPSMS(mobileNumber, otpCode);

      return res.status(201).json({ message: "User created and OTP sent" });
    } else {
      // If user exists, update the OTP
      user.otp = otpCode;
      await user.save();

      // Send OTP to user's mobile number (assuming you have an SMS sending service)
      // sendOTPSMS(mobileNumber, otpCode);

      return res.status(200).json({ message: "OTP sent" });
    }
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ message: "Error logging in", error });
  }
};

exports.verifyUser = async (req, res) => {
  const { mobileNumber, email, otp } = req.body;

  try {
    let user;

    // Check if it's a mobile number verification
    if (mobileNumber) {
      user = await User.findOne({ mobileNumber });

      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found with this mobile number." });
      }

      // Verify the OTP for mobile
      if (user.otp !== otp) {
        return res
          .status(401)
          .json({ message: "Invalid OTP for mobile number." });
      }
    }
    // Check if it's an email verification
    else if (email) {
      user = await User.findOne({ email });

      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found with this email." });
      }

      // Verify the OTP for email
      if (user.otp !== otp) {
        return res.status(401).json({ message: "Invalid OTP for email." });
      }
    }
    // If neither mobile number nor email is provided
    else {
      return res.status(400).json({
        message: "Please provide either a mobile number or an email.",
      });
    }

    // If OTP is valid, generate a JWT token and return it to the user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Optionally, set user as verified
    user.isVerified = true;
    await user.save();

    return res.json({
      message: "OTP verified. Login successful.",
      token,
      userId: user._id,
    });
  } catch (error) {
    console.error("Error in verifyUser:", error);
    res.status(500).json({ message: "Error verifying user", error });
  }
};

exports.getUserById = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error in getUserById:", error);
    res.status(500).json({ message: "Error fetching user", error });
  }
};

exports.addUserName = async (req, res) => {
  const userId = req.params.userId;
  const { name } = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, { name }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error in addUserName:", error);
    res.status(500).json({ message: "Error updating user name", error });
  }
};

//email with login

exports.login = async (req, res) => {
  const { mobileNumber, email } = req.body;

  try {
    let user;
    const otpCode = generateOTP(6); // Generate a 6-digit OTP

    if (mobileNumber) {
      // Handle mobile number login
      user = await User.findOne({ mobileNumber });

      if (!user) {
        // If user doesn't exist, create a new user with the OTP
        user = new User({ mobileNumber, otp: otpCode });
        await user.save();
      } else {
        // If user exists, update the OTP
        user.otp = otpCode;
        await user.save();
      }

      // Send OTP to user's mobile number
      await sendOtp(mobileNumber);
      return res.status(200).json({ message: "OTP sent via mobile." });

    } else if (email) {
      // Handle email login
      user = await User.findOne({ email });

      if (!user) {
        // If user doesn't exist, create a new user with the OTP
        user = new User({ email, otp: otpCode });
        await user.save();
      } else {
        // If user exists, update the OTP
        user.otp = otpCode;
        await user.save();
      }

      // Prepare mail options
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otpCode}`,
      };

      // Send OTP via email
      transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          return res.status(500).json({ message: "Error sending OTP via email.", error });
        }
        
        // Respond after email is sent successfully
        res.status(200).json({
          message: "OTP sent to your email. Please verify to complete registration.",
          userId: user._id,
        });
      });

      // Note: Remove this line as response is handled inside sendMail callback
      // return res.status(200).json({ message: "OTP sent to your email." });

    } else {
      return res.status(400).json({ message: "Please provide either a mobile number or an email." });
    }
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Error logging in", error });
  }
};

exports.verifyUser = async (req, res) => {
  const { mobileNumber, email, otp } = req.body;

  try {
    let user;

    // Check if it's a mobile number verification
    if (mobileNumber) {
      user = await User.findOne({ mobileNumber });

      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found with this mobile number." });
      }

      // Verify the OTP for mobile
      if (user.otp !== otp) {
        return res
          .status(401)
          .json({ message: "Invalid OTP for mobile number." });
      }
    }
    // Check if it's an email verification
    else if (email) {
      user = await User.findOne({ email });

      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found with this email." });
      }

      // Verify the OTP for email
      if (user.otp !== otp) {
        return res.status(401).json({ message: "Invalid OTP for email." });
      }
    }
    // If neither mobile number nor email is provided
    else {
      return res.status(400).json({
        message: "Please provide either a mobile number or an email.",
      });
    }

    // If OTP is valid, generate a JWT token and return it to the user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Optionally, set user as verified
    user.isVerified = true;
    await user.save();

    return res.json({
      message: "OTP verified. Login successful.",
      token,
      userId: user._id,
    });
  } catch (error) {
    console.error("Error in verifyUser:", error);
    res.status(500).json({ message: "Error verifying user", error });
  }
};
