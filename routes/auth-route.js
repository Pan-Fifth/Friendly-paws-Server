const express = require("express");
const router = express.Router();
const { register, login, loginGoogle, forgetPassword, resetPassword, getPrivacyPolicy, getTermsOfService } = require("../controllers/auth-controller");
const { registerAuthen, loginAuthen } = require("../middlewares/validator");


router.post('/register', registerAuthen, register)
router.post('/login', loginAuthen, login)
router.post('/login-google', loginGoogle);
router.get('/privacy-policy', getPrivacyPolicy);
router.get('/terms', getTermsOfService);

router.post('/forget-password', forgetPassword);
router.post('/reset-password/:token', resetPassword);

module.exports = router;