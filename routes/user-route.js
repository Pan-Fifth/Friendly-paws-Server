const express = require("express");
const router = express.Router();
const { editProfile, getProfile } = require("../controllers/user-controller");
const { sendEmail,donate, updateDonationStatus, getTotalDonationAmount } = require('../controllers/user-controller');
const { authenticate } = require("../middlewares/authenticate");




router.post('/send-email', authenticate, sendEmail)





module.exports = router;