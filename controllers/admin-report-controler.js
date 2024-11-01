const createError = require('../utils/createError');
const { 
    getChooseEventBydate, 
    getAllEvent, 
    getChooseAdoptBydate, 
    getAllAdopt,
    getChooseDonateBydate, 
    getAllDonate,
    getChooseUserActivityByDate, 
    getAllUserActivity 
} = require('../services/admin-report-service');

exports.reportEventByDate = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return next(createError(400, 'Start date and End date are required'));
        }

        const event = await getChooseEventBydate(startDate, endDate);
        res.json(event);
    } catch (err) {
        next(err);
    }
};

exports.reportAllEvent = async (req, res, next) => {
    try {
        const event = await getAllEvent();
        res.json(event);
    } catch (err) {
        console.error("Error in reportAllEvent:", err);
        res.status(500).json({ message: "Failed to fetch all events", error: err.message });
    }
};

exports.reportAdoptByDate = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return next(createError(400, 'Start date and End date are required'));
        }

        const adopt = await getChooseAdoptBydate(startDate, endDate);
        res.json(adopt);
    } catch (err) {
        next(err);
    }
};

exports.reportAllAdopt = async (req, res, next) => {
    try {
        const adopt = await getAllAdopt();
        res.json(adopt);
    } catch (err) {
        console.error("Error in reportAllAdopt:", err);
        res.status(500).json({ message: "Failed to fetch all adopt", error: err.message });
    }
};

exports.reportDonateByDate = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return next(createError(400, 'Start date and End date are required'));
        }

        const donation = await getChooseDonateBydate(startDate, endDate);
        res.json(donation);
    } catch (err) {
        next(err);
    }
};

exports.reportAllDonate = async (req, res, next) => {
    try {
        const donation = await getAllDonate();
        res.json(donation);
    } catch (err) {
        console.error("Error in reportAllDonate:", err);
        res.status(500).json({ message: "Failed to fetch all donate", error: err.message });
    }
};

// ฟังก์ชันรายงานกิจกรรมผู้ใช้ตามวันที่
exports.reportUserActivity = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return next(createError(400, 'Start date and End date are required'));
        }

        const userActivity = await getChooseUserActivityByDate(startDate, endDate);
        res.json(userActivity);
    } catch (err) {
        next(err);
    }
};

// ฟังก์ชันรายงานกิจกรรมผู้ใช้ทั้งหมด
exports.reportAllUserActivity = async (req, res, next) => {
    try {
        const userActivity = await getAllUserActivity();
        res.json(userActivity);
    } catch (err) {
        console.error("Error in reportAllUserActivity:", err);
        res.status(500).json({ message: "Failed to fetch all user activities", error: err.message });
    }
};
