// admin-router.js

const express = require("express");
const router = express.Router();
const { getAllUsers, updateUserById,deleteUserById } = require("../controllers/admin-controller");
const {
    reportEventByDate,
    reportAllEvent,
    reportAdoptByDate,
    reportAllAdopt,
    reportDonateByDate,
    reportAllDonate,
    reportUserActivity,
    reportAllUserActivity,
} = require('../controllers/admin-report-controler');

router.get('/report-event', reportEventByDate);
router.get('/report-event-all', reportAllEvent);

router.get('/report-adopt', reportAdoptByDate);
router.get('/report-adopt-all', reportAllAdopt);

router.get('/report-donation', reportDonateByDate);
router.get('/report-donation-all', reportAllDonate);

// เพิ่ม routes สำหรับรายงานกิจกรรมผู้ใช้
router.get('/report-user-activity', reportUserActivity);
router.get('/report-user-activity-all', reportAllUserActivity);

// เพิ่ม routes สำหรับจัดการผู้ใช้
router.get('/users', getAllUsers); // ดึงข้อมูลผู้ใช้ทั้งหมด
router.put('/users/:id', updateUserById); // แก้ไขข้อมูลผู้ใช้
router.delete('/users/:id', deleteUserById); // ลบผู้ใช้

module.exports = router;
