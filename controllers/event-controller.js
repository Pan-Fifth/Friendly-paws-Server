const prisma = require('../configs/prisma');
const createError = require('../utils/createError');
const cloudinary = require('../configs/cloudinary');
const fs = require('fs/promises');
const path = require('path');



exports.eventShowPages = async (req, res) => {

    // const language = req.headers['accept-language'] || 'en';
    // const titleField = language === 'th' ? 'title_th' : 'title_en';
    // const descriptionField = language === 'th' ? 'description_th' : 'description_en';

    try {


        const today = new Date();
        const allEvent = await prisma.events.findMany({
            include: {
                image: true,
            }
        });
        const pastEvent = await prisma.events.findMany({
            where: {
                date_start: {
                    lte: today,
                },
                status: "COMPLETED"
            },
            select: {
                id: true,
                location: true,
                date_start: true,
                date_end: true,
                title_en: true,
                title_th: true,
                description_en: true,
                description_th: true,
                // [titleField]: true,
                // [descriptionField]: true,
                image: { select: { url: true } },
            },
        });
        const events = await prisma.events.findMany({
            where: {
                date_start: {
                    gte: today,
                },
                status: "ACTIVE"

            },
            select: {
                id: true,
                location: true,
                date_start: true,
                date_end: true,
                title_en: true,
                title_th: true,
                description_en: true,
                description_th: true,
                // [titleField]: true,
                // [descriptionField]: true,
                image: { select: { url: true } },
            },
        });
        // const formattedPastEvent = pastEvent.map(event => ({
        //     ...event,
        //     title: event[titleField],
        //     description: event[descriptionField],
        // }));
        // const formattedEvent = events.map(event => ({
        //     ...event,
        //     title: event[titleField],
        //     description: event[descriptionField],
        // }));
        // res.status(200).json({ events: formattedEvent, pastEvent: formattedPastEvent, allEvent });
        res.status(200).json({ events, pastEvent, allEvent });
    } catch (error) {
        res.status(500).json({ message: "eventShowPages error", error: error.message });
    }
}




exports.regisEvent = async (req, res, next) => {
    try {

        const userId = req.user
        console.log('userId', userId)
        const { eventId } = req.body;
        console.log("eventId", eventId)
        const event = await prisma.events.findUnique({
            where: {
                id: +eventId.eventId,
            }
        });
        console.log("event", event)
        if (!event) {
            return createError(400, "event not found");
        }
        const haveRegis = await prisma.eventAttendees.findFirst({
            where: {
                userId: +userId.id,
                eventId: +eventId.eventId,
            }
        });
        console.log("haveRegis", haveRegis)
        if (haveRegis) {
            return createError(400, "ลงทะเบียนล่วงหน้าเรียบร้อยแล้ว");
        }
        console.log("----", event)
        const regisEvent = await prisma.eventAttendees.create({
            data: {
                userId: +userId.id,
                eventId: +eventId.eventId,
            }
        });
        console.log("regisEvent--->", regisEvent)
        res.status(200).json({ message: "regisEvent success", regisEvent });
    } catch (error) {
        console.log(error)
        next(error);

    }
}


exports.createEvent = async (req, res, next) => {
    try {
        const { title, date_start, date_end, description, location, image } = req.body;
        const userId = req.user
        const event = await prisma.events.create({
            data: {
                title_en,
                title_th,
                description_en,
                description_th,
                date_start: new Date(date_start),
                date_end: new Date(date_end),
                location,
                image: {
                    create: hasFile ? { url: uploadResult.secure_url || '' } : [],
                },
            },
            include: {
                image: true,
            },
        });
        res.status(200).json({ message: "createEvent success", event });
    } catch (error) {
        next(error);
    }
}

