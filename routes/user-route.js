const express = require("express");
const router = express.Router();
const { sendEmail } = require('../controllers/user-controller');
const { authenticate } = require("../middlewares/authenticate");




router.post('/send-email', authenticate, sendEmail)





module.exports = router;