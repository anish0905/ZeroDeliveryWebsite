require('dotenv').config(); // To load environment variables
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;

const client = new twilio(accountSid, authToken);

const sendSms = (to, message) => {
  client.verify.v2.services(serviceSid)
    .verifications
    .create({ to, channel: 'sms' })
    .then(verification => console.log(`Verification SID: ${verification.sid}`))
    .catch(error => console.error(`Failed to send SMS: ${error.message}`));
};

module.exports = { sendSms };
