const createError = require('../utils/createError')
const { getChooseEventBydate, getAllEvent, getListUserEventById, getChooseAdoptBydate, getAllAdopt,
    getChooseDonateBydate, getAllDonate, getAllPetList, getAllAdoptRequest, getAdoptScore } = require('../services/admin-report-service')
const { aiCalScore } = require('../services/ai-scoring')
const prisma = require("../configs/prisma");


exports.reportEventByDate = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return createError(400, 'Start date and End date are required');
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

        next(err);
    }
};
exports.reportListUserEvent = async (req, res, next) => {
    const { eventId } = req.params;
    console.log(eventId, "jsdjflkd")
    try {
        const event = await getListUserEventById(eventId);
        res.json(event);
    } catch (err) {
        next(err);
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
        next(err);
    }
};

exports.reportDonateByDate = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return createError(400, 'Start date and End date are required');
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
        next(err);
    }
};
exports.reportAllPetList = async (req, res, next) => {
    try {
        const pets = await getAllPetList();
        res.json(pets);
    } catch (err) {
        next(err);
    }
};

exports.allAdoptRequest = async (req, res, next) => {
    try {
        const { count, page } = req.params
        const user = req.user
        if (user.role !== "ADMIN") {
            return createError(401, "unauthorized")
        }
        const adoptRequest = await getAllAdoptRequest(count, page);
        res.json(adoptRequest)
    } catch (err) {
        next(err)
    }
}

exports.checkScore = async (req, res, next) => {
    try {
        const { id, lang } = req.params
        if (req.user.role !== "ADMIN") {
            return createError(402, "Unauthorized")
        }
        const adoptDetail = await getAdoptScore(id)

        const score = await aiCalScore(adoptDetail, lang)
        res.json(score)
    } catch (err) {
        next(err)
    }
}

exports.editAdoptRequest = async (req, res, next) => {
    try {
        const { id } = req.params
        const { select } = req.body
        const user = req.user
        console.log("id", id, "status", select, "user", user)
        if (user.role !== "ADMIN") {
            return createError(402, "Unauthorized")
        }
        const updateAdoptRequest = await prisma.adopts.update({
            where: {
                id: +id
            },
            data: {
                status: select,
                approved_at: new Date(),
                approved_by: +user.id
            }
        })
        if (select === "ADOPTED") {
            const updatePet = await prisma.pets.update({
                where: {
                    id: +updateAdoptRequest.petId
                },
                data: {
                    status: select,
                    updated_at: new Date()
                }
            })

        }

        res.json("complete")
    } catch (err) {
        next(err)
    }
}

