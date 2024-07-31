// controllers/authController.js
const User = require("../models/User");
const nodemailer = require("nodemailer");

const Order = require('../../user/models/productOrderSchema');

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
  const { email, password, mobile, name, address, pincode } = req.body;


  if (!email || !password || !mobile || !name || !address || !pincode) {
    return res.status(400).send("All fields are required");
  }

  let user = await User.findOne({ email });
  if (user) return res.status(400).send("User already exists");

  user = new User({
    email, password, mobile,
    name,
    address,
    pincode,

  });
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


exports.vendorUpdate = async (req, res) => {
  try {
    const { mobile, name, address, pincode } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { $set: { mobile, name, address, pincode } }, { new: true });

    if (!user) return res.status(404).send("User not found");
    res.status(200).send(user);

  }
  catch (e) {
    res.status(500).send(e.message);

  }}


  exports.deleteUser = async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).send("User not found");
      res.status(200).send(user);
    } catch (e) {
      res.status(500).send(e.message);
    }
  };
  

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("User not found");

  user.generateOtp();
  await user.save();

  const mailOptions = {
    from: "amitkumar425863@gmail.com",
    to: user.email,
    subject: "Password Reset OTP",
    text: `Your OTP for password reset is ${user.otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return res.status(500).send(error.toString());
    res.status(200).send("OTP sent to your email");
  });
};




exports.verifyOtpForPasswordReset = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("User not found");
  if (user.otp !== otp) return res.status(400).send("Invalid OTP");
  if (user.otpExpires < Date.now()) return res.status(400).send("OTP expired");

  user.password = newPassword;
  user.otp = undefined;
  user.otpExpires = undefined;

  await user.save();
  res.status(200).send("Password updated successfully");
};





exports.getAllVendorsWithTotalProducts = async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        $lookup: {
          from: 'productorders',
          localField: '_id',
          foreignField: 'VendorUser',
          as: 'orders'
        }
      },
      {
        $unwind: {
          path: "$orders",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: "$orders.products",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $group: {
          _id: "$_id",
          email: { $first: "$email" },
          mobile: { $first: "$mobile" },
          name: { $first: "$name" },
          address: { $first: "$address" },
          pincode: { $first: "$pincode" },
          isVerified: { $first: "$isVerified" },
          totalProducts: { $sum: "$orders.products.quantity" }
        }
      },
      {
        $project: {
          _id: 1,
          email: 1,
          mobile: 1,
          name: 1,
          address: 1,
          pincode: 1,
          isVerified: 1,
          totalProducts: 1
        }
      }
    ]);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
