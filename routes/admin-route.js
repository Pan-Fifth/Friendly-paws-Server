const express = require("express");
const router = express.Router();
const { reportEventByDate, reportAllEvent, reportAdoptByDate,
    reportAllAdopt, reportDonateByDate, reportAllDonate } = require('../controllers/admin-report-controler');


router.get('/report-event', reportEventByDate)
router.get('/report-event-all', reportAllEvent)

router.get('/report-adopt', reportAdoptByDate)
router.get('/report-adopt-all', reportAllAdopt)

router.get('/report-donation', reportDonateByDate)
router.get('/report-donation-all', reportAllDonate)
router.get('/dashboard', getDashboard )


module.exports = router;