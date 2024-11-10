const express = require("express");
const router = express.Router();
const { editProfile, getProfile, sendEmail, donate, updateDonationStatus, getTotalDonationAmount } = require("../controllers/user-controller");
const { authenticate } = require("../middlewares/authenticate");

const { getAdoptHistory, getDonateHistory, getEventHistory } = require("../controllers/history-controller");




router.post('/send-email', authenticate, sendEmail)
router.patch('/edit-profile/:userId', authenticate, editProfile)
router.get('/profile', authenticate, getProfile)
router.post('/donate', donate)
router.get('/donate', getTotalDonationAmount)
router.patch('/donate/:id', authenticate, updateDonationStatus)

router.get('/donate-history/:id', authenticate, getDonateHistory)
router.get('/adopt-history/:id', authenticate, getAdoptHistory)
router.get('/event-history/:id', authenticate, getEventHistory)





module.exports = router;