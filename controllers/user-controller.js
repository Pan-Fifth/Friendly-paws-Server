const nodemailer = require('nodemailer');

const sendEmailByNodemailer = require('../utils/send-email');
const jwt = require('jsonwebtoken');


exports.sendEmail = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const googleId = decodedToken.googleId;
        const { recipient, subject, message } = req.body;

        if (!recipient || !subject || !message) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const { success, message: responseMessage, error } = await sendEmailByNodemailer(recipient, subject, message, googleId);

        if (success) {
            res.status(200).json({ message: responseMessage });
        } else {
            res.status(500).json({ message: responseMessage, error });
        }
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized: Invalid or expired token', error });
    }
};
