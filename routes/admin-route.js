const express = require("express");
const router = express.Router();
const { getAllUsers, updateUserById, deleteUserById } = require("../controllers/admin-controller");

const { reportEventByDate, reportAllEvent, reportAdoptByDate,
    reportAllAdopt, reportDonateByDate, reportAllDonate, reportAllPetList } = require('../controllers/admin-report-controller');
const { getDashboard, getDonation, updateDonation, getDonationGoals, updateDonationGoals } = require('../controllers/admin-controller');
const { createEvent } = require("../controllers/event-controller");
const uploadMulter = require("../middlewares/upload-Event");
const { authenticate } = require("../middlewares/authenticate");


router.get('/report-event', reportEventByDate);
router.get('/report-event-all', reportAllEvent);

router.get('/report-adopt', reportAdoptByDate);
router.get('/report-adopt-all', reportAllAdopt);

router.get('/report-donation', reportDonateByDate);
router.get('/report-donation-all', reportAllDonate);
router.get('/report-pet-all', reportAllPetList);

router.get('/report-pet-all', reportAllPetList);


// เพิ่ม routes สำหรับจัดการผู้ใช้
router.get('/users', getAllUsers); // ดึงข้อมูลผู้ใช้ทั้งหมด
router.put('/users/:id', updateUserById); // แก้ไขข้อมูลผู้ใช้
router.delete('/users/:id', deleteUserById); // ลบผู้ใช้


router.get('/dashboard', getDashboard)
router.get('/manage-donation', getDonation)
router.put('/manage-donation/:id', updateDonation)

// เพิ่ม routes สำหรับสร้างอีเวนต์
router.post('/events', authenticate ,uploadMulter.single('image'), createEvent);



router.get('/', getDonationGoals)
router.put('/:year', updateDonationGoals)

module.exports = router;
