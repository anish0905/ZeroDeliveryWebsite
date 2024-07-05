const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'your-email@gmail.com', // replace with your email
        pass: 'your-email-password'   // replace with your email password or app password
    }
});

module.exports = transporter;
