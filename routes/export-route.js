const express = require("express");
const router = express.Router();
const { downloadDonationReport, downloadAdoptReport, downloadEventReport, downloadPetReport } = require('../controllers/export-controller');


router.post('/donations-report', downloadDonationReport)
router.post('/adopts-report', downloadAdoptReport)
router.post('/events-report', downloadEventReport)
router.post('/pets-report', downloadPetReport)



module.exports = router;