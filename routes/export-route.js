const express = require("express");
const router = express.Router();
const { downloadDonationReport, downloadAdoptReport, downloadEventReport, downloadEventListReport, downloadPetReport } = require('../controllers/export-controller');
const { authenticate } = require("../middlewares/authenticate");


router.post('/donations-report', authenticate, downloadDonationReport)
router.post('/adopts-report', authenticate, downloadAdoptReport)
router.post('/events-report', authenticate, downloadEventReport)
router.post('/events-list-report', authenticate, downloadEventListReport)
router.post('/pets-report', authenticate, downloadPetReport)



module.exports = router;