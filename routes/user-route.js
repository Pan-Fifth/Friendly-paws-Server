const express = require("express");
const router = express.Router();
const { sendEmail,donate, updateDonationStatus } = require('../controllers/user-controller');
const { authenticate } = require("../middlewares/authenticate");




router.post('/send-email', authenticate, sendEmail)
router.post('/donate', donate)
router.patch('/donate/:id', updateDonationStatus)





module.exports = router;