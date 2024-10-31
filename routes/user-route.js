const express = require("express");
const router = express.Router();
const { sendEmail,donate, updateDonationStatus, getTotalDonationAmount } = require('../controllers/user-controller');
const { authenticate } = require("../middlewares/authenticate");




router.post('/send-email', authenticate, sendEmail)
router.post('/donate',authenticate, donate)
router.get('/donate', getTotalDonationAmount)
router.patch('/donate/:id',authenticate, updateDonationStatus)





module.exports = router;