const prisma = require('../configs/prisma');
const createError = require('../utils/createError');


exports.eventShowPages = async (req, res) => {
    try{ 
        const today = new Date();
        const allEvent = await prisma.events.findMany({
            include:{
                image: true,
            }
        });
        const pastEvent = await prisma.events.findMany({
            where: {
                date_start: {
                    lte: today,
                }
            },
            include:{
                image: true,
            }
        });
        const events = await prisma.events.findMany({
            where: {
                date_start: {
                    gte: today,
                }
            },
            include:{
                image: true,
            }
        });
        res.status(200).json({ events,pastEvent,allEvent });
    } catch(error) {
        res.status(500).json({ message: "eventShowPages error", error: error.message });
    }
}


exports.regisEvent = async (req, res, next) => {
    try{

        const userId = req.user
        const { eventId } = req.body;
        const event = await prisma.events.findFirst({
            where: {
                id: +eventId,
            }
        });    
        if(!event){
            return createError(400, "event not found");
        }
        const haveRegis = await prisma.EventAttendees.findFirst({
            where: {
                userId: +userId.user.id,
                eventId: +eventId,
            }           
        });
        if(haveRegis){
            return createError(400, "user already register event");
        }
        console.log("----",event)
        const regisEvent = await prisma.EventAttendees.create({
            data: {
                userId: +userId.user.id,
                eventId: +eventId,
            }
        });
        res.status(200).json({ message: "regisEvent success", regisEvent });
    } catch(error) {
        console.log(error)
        next(error);
        
    }
}

exports.createEvent = async (req, res, next) => {
    try{
        const { title, date_start, date_end, description, location, image } = req.body;
        const userId = req.user
        const event = await prisma.events.create({
            data: {
                title,
                date_start,
                date_end,
                description,
                location,
                image,
                userId: +userId.user.id,
            }
        });
        res.status(200).json({ message: "createEvent success", event });
    } catch(error) {
        next(error);
    }
}