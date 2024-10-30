const express = require("express");
const router = express.Router();
const { sendEmail } = require('../controllers/user-controller');
const { editProfile, getProfile } = require("../controllers/user-controller");
const { authenticate } = require("../middlewares/authenticate");




router.post('/send-email', authenticate, sendEmail)
router.get('/profile', authenticate, getProfile)
router.patch('/edit-profile/:userId', authenticate, editProfile)





module.exports = router;