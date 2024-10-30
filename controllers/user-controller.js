const nodemailer = require('nodemailer');
const prisma = require('../configs/prisma');

const sendEmailByNodemailer = require('../utils/send-email');


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