const express = require("express");
const router = express.Router();
const { editProfile, getProfile } = require("../controllers/user-controller");
const { sendEmail,donate, updateDonationStatus, getTotalDonationAmount } = require('../controllers/user-controller');
const { authenticate } = require("../middlewares/authenticate");




router.post('/send-email', authenticate, sendEmail)
router.get('/profile', authenticate, getProfile)
router.patch('/edit-profile/:userId', authenticate, editProfile)
router.post('/donate',authenticate, donate)
router.get('/donate', getTotalDonationAmount)
router.patch('/donate/:id',authenticate, updateDonationStatus)





module.exports = router;