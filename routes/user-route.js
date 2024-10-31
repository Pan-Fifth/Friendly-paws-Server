const express = require("express");
const router = express.Router();
const { sendEmail, eventShowPages } = require('../controllers/user-controller');
const { authenticate } = require("../middlewares/authenticate");




router.post('/send-email', authenticate, sendEmail)






module.exports = router;