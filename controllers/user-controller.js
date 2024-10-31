const nodemailer = require('nodemailer');
const sendEmailByNodemailer = require('../utils/send-email');
const { events } = require('../configs/prisma');
const prisma = require('../configs/prisma');


exports.sendEmail = async (req, res) => {
    const { recipient, subject, message } = req.body;

    if (!recipient || !subject || !message) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        const { success, message: responseMessage, error } = await sendEmailByNodemailer(recipient, subject, message);

        if (success) {
            res.status(200).json({ message: responseMessage });
        } else {
            res.status(500).json({ message: responseMessage, error });
        }
    } catch (error) {

        res.status(500).json({ message: 'Internal server error', error });
    }

};


