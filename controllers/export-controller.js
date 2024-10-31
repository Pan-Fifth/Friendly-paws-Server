const { getDonations, exportToExcel } = require('../services/export-service');


exports.downloadDonationReport = async (req, res, next) => {
    try {
        const donations = req.body.donates && req.body.donates.length > 0 ? req.body.donates : await getDonations();
        console.log("Data passed to exportToExcel:", donations); // ตรวจสอบข้อมูลอีกครั้งก่อน export
        await exportToExcel(donations, res);
    } catch (error) {
        console.error("Error in downloadDonationReport:", error);
        res.status(500).json({ message: "Failed to export report" });
    }
};
