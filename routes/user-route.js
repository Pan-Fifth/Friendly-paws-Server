const express = require("express");
const router = express.Router();
const { editProfile, getProfile } = require("../controllers/user-controller");
const { sendEmail, donate, updateDonationStatus, getTotalDonationAmount } = require('../controllers/user-controller');
const { authenticate } = require("../middlewares/authenticate");




router.post('/send-email', authenticate, sendEmail)
router.patch('/edit-profile/:userId', authenticate, editProfile)
router.get('/profile', authenticate, getProfile)
router.post('/donate', donate)
router.get('/donate', getTotalDonationAmount)
router.patch('/donate/:id', authenticate, updateDonationStatus)





module.exports = router;