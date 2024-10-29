const express = require("express");
const router = express.Router();
const { register, login, forgetPassword, resetPassword } = require("../controllers/auth-controller");
const { registerAuthen, loginAuthen } = require("../middlewares/validator");


router.post('/register', registerAuthen, register)
router.post('/login', loginAuthen, login)

router.post('/forget-password', forgetPassword);
router.post('/reset-password/:token', resetPassword);




module.exports = router;