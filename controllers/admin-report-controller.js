const createError = require('../utils/createError')
const { getChooseEventBydate, getAllEvent, getChooseAdoptBydate, getAllAdopt,
    getChooseDonateBydate, getAllDonate, getAllPetList ,getAllAdoptRequest,getAdoptScore } = require('../services/admin-report-service')
const {aiCalScore} = require('../services/ai-scoring')

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
        res.status(500).json({ message: "Failed to fetch all events", error: err.message });
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
        res.status(500).json({ message: "Failed to fetch all adopt", error: err.message });
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
        res.status(500).json({ message: "Failed to fetch all donate", error: err.message });
    }
};
exports.reportAllPetList = async (req, res, next) => {
    try {
        const pets = await getAllPetList();
        res.json(pets);
    } catch (err) {
        console.error("Error in reportAllPetList:", err);
        res.status(500).json({ message: "Failed to fetch all pets", error: err.message });
    }
};

exports.allAdoptRequest = async (req,res,next)=>{
    try {
        const {count,page} = req.params
        const user = req.user
        if(user.role !== "ADMIN"){
            return createError(401,"unauthorized")
        }
        const adoptRequest = await getAllAdoptRequest(count,page); 
        res.json(adoptRequest) 
    } catch (err) {
        next(err)
    }
}

exports.checkScore  = async(req,res,next)=>{
    try {
        const{id,lang}=req.params
        if(req.user.role !== "ADMIN"){
            return createError(402,"Unauthorized")
        }
        const adoptDetail = await getAdoptScore(id)
        console.log(adoptDetail)
        const score = await aiCalScore(adoptDetail,lang)
        res.json(score)
    } catch (err) {
        next(err)
    }
}
