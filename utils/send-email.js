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
        from: recipient,
        to: process.env.EMAIL_ADMIN,
        subject: subject,
        html: `
      <div>
      <img src="https://res.cloudinary.com/dqlfh6fxi/image/upload/v1731583303/v6myb7blzmbxqmf6fg2a.png" style="max-width: 200px;" alt="logo"/>
       <p><strong>Message from :</strong> ${recipient}</p>
       <br/>
       <p><strong>Detail : </strong>${message}</p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true, message: 'Email sent successfully' };
    } catch (error) {
        return { success: false, message: 'Failed to send email', error };
    }
};

module.exports = sendEmailByNodemailer;