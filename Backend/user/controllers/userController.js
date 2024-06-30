const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const twilio = require('twilio');

const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
// console.log(client)

const sendOtp = async (mobileNumber) => {
  try {
    const verification = await client.verify.services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verifications
      .create({ to: mobileNumber, channel: 'sms' });
    console.log(`OTP sent to ${mobileNumber}. SID: ${verification.sid}`);
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw new Error('Failed to send OTP. Please try again.');
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
    res.status(200).send('OTP sent');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.verifyOtp = async (req, res) => {
  const { mobileNumber, otp } = req.body;
  try {
    const verificationCheck = await client.verify.services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks
      .create({ to: mobileNumber, code: otp });

    if (verificationCheck.status !== 'approved') {
      return res.status(400).send('Invalid or expired OTP');
    }

    let user = await User.findOne({ mobileNumber });
    if (!user) {
      return res.status(400).send('User not found');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).send({ token });
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
      return res.status(404).send('User not found');
    }

    user.location = location;
    await user.save();

    res.status(200).send('Location updated successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getLocation = async (req, res) => {
  const { mobileNumber } = req.query;

  try {
    const user = await User.findOne({ mobileNumber });
    if (!user) {
      return res.status(404).send('User not found');
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
      return res.status(404).send('User not found');
    }

    user.address = address;
    await user.save();

    res.status(200).send('Address updated successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getAddress = async (req, res) => {
  const { mobileNumber } = req.query;

  try {
    const user = await User.findOne({ mobileNumber });
    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).send({ address: user.address });
  } catch (error) {
    res.status(500).send(error.message);
  }
};


