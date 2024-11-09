const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const uploadFields = upload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },
  { name: 'image4', maxCount: 1 }
]);


const { getAllUsers, updateUserById, deleteUserById } = require("../controllers/admin-controller");

const { reportEventByDate, reportAllEvent, reportListUserEvent, reportAdoptByDate,
  reportAllAdopt, reportDonateByDate, reportAllDonate, reportAllPetList, allAdoptRequest, checkScore, editAdoptRequest } = require('../controllers/admin-report-controller');
const { getDashboard, getDonation, updateDonation, getDonationGoals, updateDonationGoals } = require('../controllers/admin-controller');
const { createEvent, deleteEvent, updateEvent, getEventAttendees } = require("../controllers/event-controller");
const uploadMulter = require("../middlewares/upload-Event");
const { authenticate } = require("../middlewares/authenticate");
const adminHomePageController = require('../controllers/admin-homepage-controller');
const adminAboutPageController = require('../controllers/admin-about-controller');
const adminContactController = require('../controllers/admin-contact-controller');  // เพิ่มการนำเข้า adminContactController
const donationPageController = require('../controllers/admin-donation-controller')
const eventPageController = require('../controllers/admin-event-controller')
const contactPageController = require('../controllers/admin-contact-controller')


// รายงาน
router.get('/report-event', authenticate, reportEventByDate);
router.get('/report-event-all', authenticate, reportAllEvent);
router.get('/report-list-user-event/:eventId', authenticate, reportListUserEvent);
router.get('/report-adopt', authenticate, reportAdoptByDate);
router.get('/report-adopt-all', authenticate, reportAllAdopt);
router.get('/report-donation', authenticate, reportDonateByDate);
router.get('/report-donation-all', authenticate, reportAllDonate);
router.get('/report-pet-all', authenticate, reportAllPetList);

// จัดการผู้ใช้
router.get('/users', getAllUsers);
router.put('/users/:id', updateUserById);
router.delete('/users/:id', deleteUserById);

// all adopt request for adopt manage page
router.get("/all-adopts/:count/:page", authenticate, allAdoptRequest)
router.get("/score/:id/:lang", authenticate, checkScore)
// edit adopt request
router.patch("/edit-adopt-request/:id", authenticate, editAdoptRequest)


// จัดการ Dashboard และ Donation
router.get('/dashboard', getDashboard);
router.get('/manage-donation', getDonation);
router.put('/manage-donation/:id', updateDonation);

// เพิ่ม routes สำหรับสร้างอีเวนต์
router.post('/events', authenticate, uploadMulter.single('image'), createEvent);
router.patch('/updateEvent/:id', authenticate, updateEvent)
router.delete('/deleteEvent/:id', authenticate, deleteEvent)


// จัดการ Donation Goals
router.get('/', getDonationGoals);
router.put('/:year', updateDonationGoals);

// จัดการข้อมูลหน้า Home
router.get('/home-content', adminHomePageController.getHomeContent);
router.put('/home-content/:id', uploadFields, adminHomePageController.updateHomeContent);

// จัดการข้อมูล About Content
router.get('/about-content', adminAboutPageController.getAboutContent);
router.put('/about-content/:id', uploadFields, adminAboutPageController.updateAboutContent);

// จัดการข้อมูล ContactInfo
router.get('/contact-info', adminContactController.getContactInfo);  // ดึงข้อมูล ContactInfo
router.put('/contact-info/:id', uploadFields, adminContactController.updateContactInfo); // อัพเดทข้อมูล ContactInfo


router.get('/donation-content', donationPageController.getDonationContent)
router.put('/donation-content/:id', donationPageController.updateDonationContent)

router.get('/event-banner', eventPageController.getEventBanner)
router.put('/event-banner/:id', uploadFields, eventPageController.updateEventBanner)

// router.get('/contact-content', contactPageController.getContactContent)
// router.put('/contact-content/:id', uploadFields, contactPageController.updateContactContent)


module.exports = router;
