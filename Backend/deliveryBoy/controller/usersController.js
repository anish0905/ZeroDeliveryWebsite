const User = require("../models/users");
const nodemailer = require("nodemailer");
const Order = require("../../user/models/productOrderSchema");
const Clint = require("../../user/models/User");
const twilio = require("twilio");
const { sendSms } = require("../../utils/smsService");
const crypto = require('crypto');



const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

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
    vendorId,
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
      vendorId,
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


exports.getAllDeliveryDetails = async(req, res) => {
  try {
    const deliveryDetails = await User.find({});
    res.status(200).json(deliveryDetails);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch delivery details', error });
  }
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

exports.updateUser = async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const updateFields = [
      "password",
      "mobile",
      "name",
      "address",
      "currentAddress",
      "drivingLicence",
      "vehicleNo",
      "profilePhoto",
    ];

    updateFields.forEach((field) => {
      if (req.body[field]) {
        user[field] = req.body[field];
      }
    });

    await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        mobile: user.mobile,
        address: user.address,
        currentAddress: user.currentAddress,
        drivingLicence: user.drivingLicence,
        vehicleNo: user.vehicleNo,
        profilePhoto: user.profilePhoto,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    let user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getOrders = async (req, res) => {
  const { deliveryBoy } = req.params;

  try {
    if (!deliveryBoy) {
      return res.status(400).json({ message: "DeliveryBoy is required" });
    }

    const orders = await Order.find({ deliveryBoy })
      .populate({
        path: "products.productId",
      })
      .populate("address");

    const ordersWithAddresses = await Promise.all(
      orders.map(async (order) => {
        const user = await Clint.findById(order.userId).select("addresses");

        if (!user || !user.addresses) {
          throw new Error(`User or addresses not found for order ${order._id}`);
        }

        const address = user.addresses.id(order.address);

        if (!address) {
          throw new Error(`Address not found for order ${order._id}`);
        }

        return { ...order.toObject(), address };
      })
    );

    if (!ordersWithAddresses.length) {
      return res.status(404).json({ message: "No orders found for this user." });
    }

    res.status(200).json(ordersWithAddresses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || "Server error. Please try again later." });
  }
};




exports.sendOtp = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch the user details
    const user = await Clint.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate OTP
    const otp = (Math.floor(100000 + Math.random() * 900000)).toString();

    // Set OTP and expiry time (e.g., 10 minutes)
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes from now
    await user.save();

    // Send OTP via email
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: user.email,
      subject: "Your OTP for Order Verification",
      text: `Your OTP is: ${otp}`,
    };
    
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};




exports.verifyAndDeliverOrder = async (req, res) => {
  const { orderId, otp } = req.body;

  try {
    // Fetch the order details
    const order = await Order.findById(orderId).populate("userId");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    console.log("Order", order);

    // Fetch the user details associated with the order
    const user = order.userId; // Use embedded userId directly
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User", user.opt);

    // Verify the OTP
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Check if OTP is expired
    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    // Mark the order as delivered
    order.status = "delivered";
    await order.save();

    // Clear the OTP and expiry time
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    // Send confirmation email
    const mailOptions = {
      from: "amitkumar425863@gmail.com",
      to: user.email,
      subject: "Order Delivered Successfully",
      text: `Your order with ID ${order._id} has been successfully delivered.`,
    };
    transporter.sendMail(mailOptions);

    

    res.status(200).json({ message: "Order delivered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getUserById = async function(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};





