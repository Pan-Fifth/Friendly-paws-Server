const nodemailer = require('nodemailer');
require('dotenv').config();


const sendEmailByNodemailer = async (recipient, subject, message, googleId) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.EMAIL_ADMIN,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_ADMIN,
        to: recipient,
        subject: subject,
        text: `Message from ${recipient}:\n\n${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true, message: 'Email sent successfully' };
    } catch (error) {
        return { success: false, message: 'Failed to send email', error };
    }
};

module.exports = sendEmailByNodemailer;