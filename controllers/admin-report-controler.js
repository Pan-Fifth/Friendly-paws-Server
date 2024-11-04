const createError = require('../utils/createError')
const { getChooseEventBydate, getAllEvent, getChooseAdoptBydate, getAllAdopt,
    getChooseDonateBydate, getAllDonate } = require('../services/admin-report-service')


exports.reportEventByDate = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return createError(400, 'Start date and End date are required');
        }


        const event = await getChooseEventBydate(startDate, endDate);
        console.log('evennnt :>> ', event);



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
        res.status(500).json({ message: "Failed to fetch all events", error: err.message });  // เพิ่มการส่งข้อมูลข้อผิดพลาดไปยัง response
    }
};


exports.reportAdoptByDate = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return createError(400, 'Start date and End date are required');
        }


        const adopt = await getChooseAdoptBydate(startDate, endDate);
        console.log('adopt :>> ', adopt);



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
        res.status(500).json({ message: "Failed to fetch all adopt", error: err.message });  // เพิ่มการส่งข้อมูลข้อผิดพลาดไปยัง response
    }
};

exports.reportDonateByDate = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return createError(400, 'Start date and End date are required');
        }


        const donation = await getChooseDonateBydate(startDate, endDate);
        console.log('donation :>> ', donation);



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
        res.status(500).json({ message: "Failed to fetch all donate", error: err.message });  // เพิ่มการส่งข้อมูลข้อผิดพลาดไปยัง response
    }
};
