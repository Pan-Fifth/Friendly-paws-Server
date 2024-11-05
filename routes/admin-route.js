const express = require("express");
const router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const uploadFields = upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 }
  ]);
const { getAllUsers, updateUserById, deleteUserById } = require("../controllers/admin-controller");

const { reportEventByDate, reportAllEvent, reportAdoptByDate,
    reportAllAdopt, reportDonateByDate, reportAllDonate, reportAllPetList } = require('../controllers/admin-report-controller');
const { getDashboard, getDonation, updateDonation, getDonationGoals, updateDonationGoals } = require('../controllers/admin-controller');
const { createEvent } = require("../controllers/event-controller");
const uploadMulter = require("../middlewares/upload-Event");
const { authenticate } = require("../middlewares/authenticate");
const adminPageController = require('../controllers/admin-page-controller')



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

router.get('/home-content', adminPageController.getHomeContent)
router.post('/home-content', upload.single('image'), adminPageController.createHomeContent)
router.put('/home-content/:id',uploadFields, adminPageController.updateHomeContent)
router.delete('/home-content/:id', adminPageController.deleteHomeContent)


module.exports = router;
