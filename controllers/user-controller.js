const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const prisma = require("../configs/prisma")
const createError = require('../utils/createError');


const sendEmailByNodemailer = require('../utils/send-email');
const { getUserProfile, checkUserByUserId } = require('../services/user-service');



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


exports.getProfile = async (req, res, next) => {
    try {

        const userId = req.user.id;
        console.log(userId, "userrrrIDdd");

        const user = await getUserProfile(userId);

        if (!user) {
            return createError(404, "User not found");
        }
        res.json(user);

    } catch (err) {
        next(err);
    }
};

exports.editProfile = async (req, res, next) => {
    try {

        const userId = Number(req.params.userId);
        const { firstname, lastname, phone, email } = req.body;

        const checkUser = await checkUserByUserId(userId);

        if (!checkUser) {
            return next(createError(404, "User not found"));
        }

        const checkPhone = await prisma.users.findFirst({
            where: { phone },
        });
        if (checkPhone && checkPhone.id !== userId) {
            return next(createError(400, "Phone number already exists"));
        }

        const checkEmail = await prisma.users.findFirst({
            where: { email },
        });
        if (checkEmail && checkEmail.id !== userId) {
            return next(createError(400, "Email already exists"));
        }

        // อัปเดตข้อมูลผู้ใช้
        const updatedUser = await prisma.users.update({
            where: { id: userId }, // ใช้ userId ในการอัปเดต
            data: { firstname, lastname, phone, email },
        });

        res.json({ message: "Update success", user: updatedUser });
    } catch (err) {
        console.error("Error in editProfile:", err);
        next(err);
    }
};


