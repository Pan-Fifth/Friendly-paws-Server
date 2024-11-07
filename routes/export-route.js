const express = require("express");
const router = express.Router();
const { downloadDonationReport, downloadAdoptReport, downloadEventReport, downloadEventListReport, downloadPetReport } = require('../controllers/export-controller');


router.post('/donations-report', downloadDonationReport)
router.post('/adopts-report', downloadAdoptReport)
router.post('/events-report', downloadEventReport)
router.post('/events-list-report', downloadEventListReport)
router.post('/pets-report', downloadPetReport)



module.exports = router;