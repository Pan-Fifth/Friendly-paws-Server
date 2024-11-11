const { getDonations, exportDonationToExcel, getAdopts, exportAdoptToExcel,
    getEvents, getListEvents, exportEventListToExcel, exportEventToExcel, getPets, exportPetToExcel } = require('../services/export-service');


exports.downloadDonationReport = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return createError(401, 'Unauthorized: No token provided');
    }
    try {
        const donations = req.body.donates && req.body.donates.length > 0 ? req.body.donates : await getDonations();
        console.log("Data passed to exportToExcel:", donations); // ตรวจสอบข้อมูลอีกครั้งก่อน export
        await exportDonationToExcel(donations, res);
    } catch (error) {
        console.error("Error in downloadDonationReport:", error);
        res.status(500).json({ message: "Failed to export report" });
    }
};
exports.downloadAdoptReport = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return createError(401, 'Unauthorized: No token provided');
    }
    try {
        const adopts = req.body.adopts && req.body.adopts.length > 0 ? req.body.adopts : await getAdopts();
        console.log("Data passed to exportToExcel:", adopts); // ตรวจสอบข้อมูลอีกครั้งก่อน export
        await exportAdoptToExcel(adopts, res);
    } catch (error) {
        console.error("Error in downloadAdoptsReport:", error);
        res.status(500).json({ message: "Failed to export report" });
    }
};
exports.downloadEventReport = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return createError(401, 'Unauthorized: No token provided');
    }
    try {
        const events = req.body.events && req.body.events.length > 0 ? req.body.events : await getEvents();
        console.log("Data passed to exportToExcel:", events); // ตรวจสอบข้อมูลอีกครั้งก่อน export
        await exportEventToExcel(events, res);
    } catch (error) {
        console.error("Error in downloadEventReport:", error);
        res.status(500).json({ message: "Failed to export report" });
    }
};
exports.downloadEventListReport = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return createError(401, 'Unauthorized: No token provided');
    }
    try {
        const events = req.body.events && req.body.events.length > 0 ? req.body.events : await getListEvents();
        console.log("Data passed to exportToExcel:", events); // ตรวจสอบข้อมูลอีกครั้งก่อน export
        await exportEventListToExcel(events, res);
    } catch (error) {
        console.error("Error in downloadEventReport:", error);
        res.status(500).json({ message: "Failed to export report" });
    }
};
exports.downloadPetReport = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return createError(401, 'Unauthorized: No token provided');
    }
    try {
        const pets = req.body.pets && req.body.pets.length > 0 ? req.body.pets : await getPets();
        console.log("Data passed to exportToExcel:", pets); // ตรวจสอบข้อมูลอีกครั้งก่อน export
        await exportPetToExcel(pets, res);
    } catch (error) {
        console.error("Error in downloadPetReport:", error);
        res.status(500).json({ message: "Failed to export report" });
    }
};
