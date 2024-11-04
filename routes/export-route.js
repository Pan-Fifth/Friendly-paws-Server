const express = require("express");
const router = express.Router();
const { downloadDonationReport } = require('../controllers/export-controller');


router.post('/donations-report', downloadDonationReport)



module.exports = router;