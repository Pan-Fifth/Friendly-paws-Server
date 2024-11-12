const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const prisma = require("../configs/prisma")
const createError = require('../utils/createError');


const sendEmailByNodemailer = require('../utils/send-email');
const { getUserProfile, checkUserByUserId } = require('../services/user-service');



exports.sendEmail = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return createError(401, 'Unauthorized: No token provided');
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
        const { firstname, lastname, phone } = req.body;

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



        // อัปเดตข้อมูลผู้ใช้
        const updatedUser = await prisma.users.update({
            where: { id: userId }, // ใช้ userId ในการอัปเดต
            data: { firstname, lastname, phone, },
        });

        res.json({ message: "Update success", user: updatedUser });
    } catch (err) {
        console.error("Error in editProfile:", err);
        next(err);
    }
};





exports.donate = async (req, res) => {
    const { userId, total, payment_method, transaction_id, is_recurring, receipt_url } = req.body;

    try {
        const newDonation = await prisma.donates.create({
            data: {
                userId,
                total,
                payment_method,
                transaction_id,
                is_recurring: is_recurring || false,
                receipt_url,
                status: 'PENDING'
            }
        });

        // Send confirmation email to user
        const user = await prisma.users.findUnique({
            where: { id: userId }
        });

        if (user?.email) {
            await sendEmailByNodemailer(
                user.email,
                'Thank you for your donation!',
                `We received your donation of ${total} THB. Transaction ID: ${transaction_id}`
            );
        }

        res.status(201).json({
            success: true,
            data: newDonation,
            message: 'Donation created successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create donation',
            error: error.message
        });
    }
};


exports.updateDonationStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedDonation = await prisma.donates.update({
            where: { id: parseInt(id) },
            data: { status }
        });

        res.status(200).json({
            success: true,
            data: updatedDonation,
            message: 'Donation status updated successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update donation status',
            error: error.message
        });
    }
};

exports.getTotalDonationAmount = async (req, res) => {
    try {
        const donationStats = await prisma.donates.groupBy({
            by: ['status'],
            _sum: {
                total: true
            },
            _count: true,
            where: {
                status: 'DONE'  // Only count completed donations
            }
        });

        const totalStats = {
            totalAmount: donationStats[0]?._sum.total || 0,
            totalDonations: donationStats[0]?._count || 0,
            lastUpdated: new Date().toISOString()
        };

        res.status(200).json({
            success: true,
            data: totalStats,
            message: 'Donation statistics fetched successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch donation statistics',
            error: error.message
        });
    }
};


