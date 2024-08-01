const User = require("../models/users");
const nodemailer = require("nodemailer");

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

exports.register = async (req, res) => {
  const {
    email,
    password,
    mobile,
    name,
    address,
    currentAddress,
    drivingLicence,
    vehicleNo,
    profilePhoto,
  } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Temporarily create user object to generate OTP
    user = new User({
      email,
      password,
      mobile,
      name,
      address,
      currentAddress,
      drivingLicence,
      vehicleNo,
      profilePhoto,
      isVerified: false,
    });

    // Generate OTP
    user.generateOtp();

    // Set up mail options
    const mailOptions = {
      from: "amitkumar425863@gmail.com",
      to: user.email,
      subject: "Verify your email",
      text: `Your OTP is ${user.otp}`,
    };

    // Send the OTP email
    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) return res.status(500).send(error.toString());

      // Temporarily save user to store OTP details
      await user.save({ validateBeforeSave: false });

      res.status(200).json({
        message:
          "OTP sent to your email. Please verify to complete registration.",
        userId: user._id,
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("User not found");
    if (user.otp !== otp) return res.status(400).send("Invalid OTP");
    if (user.otpExpires < Date.now())
      return res.status(400).send("OTP expired");

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;

    await user.save();

    res
      .status(200)
      .send(
        "Email verified successfully. You can now complete your registration."
      );
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.resendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("User not found");

    user.generateOtp();
    await user.save();

    const mailOptions = {
      from: "amitkumar425863@gmail.com",
      to: user.email,
      subject: "Verify your email",
      text: `Your OTP is ${user.otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) return res.status(500).send(error.toString());
      res.status(200).send("OTP resent to your email");
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
