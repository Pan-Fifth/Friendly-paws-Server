const express = require("express");
const router = express.Router();
const { reportEventByDate, reportAllEvent, reportAdoptByDate,
    reportAllAdopt, reportDonateByDate, reportAllDonate, reportAllPetList } = require('../controllers/admin-report-controller');
const { getDashboard } = require('../controllers/admin-controller');


router.get('/report-event', reportEventByDate)
router.get('/report-event-all', reportAllEvent)

router.get('/report-adopt', reportAdoptByDate)
router.get('/report-adopt-all', reportAllAdopt)

router.get('/report-donation', reportDonateByDate)
router.get('/report-donation-all', reportAllDonate)
router.get('/dashboard', getDashboard)


router.get('/report-pet-all', reportAllPetList)

module.exports = router;