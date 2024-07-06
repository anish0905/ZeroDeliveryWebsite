const User = require('./userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const transporter = require('./mailer');
const crypto = require('crypto');


const saltRounds = 10;
const secretKey = 'your_secret_key'; // Use a strong, secure secret key

// Register a new user and send verification email
exports.registerUser = async (req, res) => {
    const { email, username, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Generate verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const verificationTokenExpires = Date.now() + 3600000; // 1 hour

        // Create a new user
        const newUser = new User({
            email,
            username,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpires
        });

        const savedUser = await newUser.save();

        // Send verification email
        const verificationUrl = `http://localhost:3000/api/users/verify-email?token=${verificationToken}`;
        const mailOptions = {
            from: 'your-email@gmail.com',
            to: email,
            subject: 'Email Verification',
            text: `Please verify your email by clicking the following link: ${verificationUrl}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: 'Error sending verification email', error });
            }
            res.status(200).json({ message: 'Verification email sent successfully' });
        });

    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

// Verify email
exports.verifyEmail = async (req, res) => {
    const { token } = req.query;

    try {
        // Check if the user exists with the provided token
        const user = await User.findOne({ verificationToken: token, verificationTokenExpires: { $gt: Date.now() } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Verify the user's email
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error verifying email', error });
    }
};

// Create password for the user
exports.createPassword = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists and is verified
        const user = await User.findOne({ email, isVerified: true });
        if (!user) {
            return res.status(400).json({ message: 'User not verified or does not exist' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating password', error });
    }
};

// Login a user
exports.loginUsers = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check if the user is verified
        if (!user.isVerified) {
            return res.status(400).json({ message: 'Email not verified' });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};


