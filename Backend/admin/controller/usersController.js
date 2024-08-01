// controllers/authController.js
const User = require("../models/User");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "amitkumar425863@gmail.com",
    pass: "wqql hbvq udjt erat",
  },
  tls: {
    rejectUnauthorized: false, // This will allow self-signed certificates
  },
});

exports.register = async (req, res) => {
  const { email, password, mobile } = req.body;
  let user = await User.findOne({ email });
  if (user) return res.status(400).send("User already exists");

  user = new User({ email, password, mobile });
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
    res.status(200).send("OTP sent to your email");
  });
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("User not found");
  if (user.otp !== otp) return res.status(400).send("Invalid OTP");
  if (user.otpExpires < Date.now()) return res.status(400).send("OTP expired");

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;

  await user.save();
  res.status(200).send("Email verified successfully");
};

exports.resendOtp = async (req, res) => {
  const { email } = req.body;
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
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("User not found");
    if (!user.isVerified) return res.status(400).send("Email not verified");

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).send("Invalid password");

    const token = user.generateAuthToken();
    res.send({ token, user });
  } catch (error) {
    res.status(500).send("Server error");
  }
};


