// admin-controller.js

const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const prisma = require("../configs/prisma");
const createError = require('../utils/createError');

// ฟังก์ชันดึงข้อมูลผู้ใช้ทั้งหมด (เฉพาะ Admin เท่านั้น)
const getAllUsers = async (req, res, next) => {
  try {
    // console.log(req.user,"req user")
    // // ตรวจสอบว่า user ที่ทำการร้องขอเป็น Admin หรือไม่
    // if (req.user.role !== 'ADMIN') {
    //   return next(createError(403, 'Access denied. Only admins can perform this action.'));
    // }

    const users = await prisma.users.findMany();
    res.json(users);
  } catch (error) {
    next(createError(500, 'Failed to retrieve users.'));
  }
};

// ฟังก์ชันแก้ไขข้อมูลผู้ใช้เฉพาะ Admin เท่านั้น
const updateUserById = async (req, res, next) => {
  const { id } = req.params;
  const { email, firstname, lastname, phone, role } = req.body;

  try {
    // ตรวจสอบว่า user ที่ทำการร้องขอเป็น Admin หรือไม่
    // if (req.user.role !== 'ADMIN') {
    //   return next(createError(403, 'Access denied. Only admins can perform this action.'));
    // }

    // อัปเดตข้อมูลผู้ใช้
    const updatedUser = await prisma.users.update({
      where: { id: parseInt(id) },
      data: {
        email,
        firstname,
        lastname,
        phone,
        role, // Admin สามารถแก้ไข role ได้
      },
    });

    res.json(updatedUser);
  } catch (error) {
    next(createError(500, 'Failed to update user.'));
  }
};

// ฟังก์ชันส่งอีเมลยืนยันการดำเนินการสำหรับผู้ใช้
const sendNotificationEmail = async (userEmail, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject,
    text: message,
  };

  await transporter.sendMail(mailOptions);
};




const deleteUserById = async (req, res, next) => {
    const { id } = req.params;
  
    try {
      // ตรวจสอบว่า user ที่ทำการร้องขอเป็น Admin หรือไม่
      // if (req.user.role !== 'ADMIN') {
      //   return next(createError(403, 'Access denied. Only admins can perform this action.'));
      // }
  
      // ลบข้อมูลผู้ใช้
      await prisma.users.delete({
        where: { id: parseInt(id) },
      });
  
      res.status(204).send(); // ส่งสถานะ 204 No Content หลังจากลบสำเร็จ
    } catch (error) {
      next(createError(500, 'Failed to delete user.'));
    }
  };
  
  module.exports = {
    getAllUsers,
    updateUserById,
    sendNotificationEmail,
    deleteUserById, // เพิ่มฟังก์ชันที่ลบผู้ใช้
  };