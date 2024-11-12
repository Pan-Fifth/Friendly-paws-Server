const prisma = require("../configs/prisma")

exports.getAdoptHistory = async (req, res, next) => {

    const { id } = req.params
    try {

        const FindUser = await prisma.adopts.findMany({
            where: {
                userId: +id,
                status: 'ADOPTED'
            },
            select: {
                id: true,
                created_at: true,
                status: true,
                pet: {
                    select: {
                        name_th: true,
                        name_en: true,
                        type: true,
                        age: true,
                        gender: true,
                        color: true,
                        breed_en: true,
                        breed_th: true,
                        image: {
                            select: {
                                url: true,
                            },
                        },
                    }

                }
            },
            orderBy: {
                created_at: 'desc'
            }

        })
        res.json(FindUser)

    } catch (err) {
        next(err);
    }
};
exports.getDonateHistory = async (req, res, next) => {

    const { id } = req.params
    try {

        const FindUser = await prisma.donates.findMany({
            where: {
                userId: +id
            },
        })
        res.json(FindUser)

    } catch (err) {
        next(err);
    }
};
exports.getEventHistory = async (req, res, next) => {

    const { id } = req.params
    try {

        const FindUser = await prisma.eventAttendees.findMany({
            where: {
                userId: +id
            },
            select: {
                event: true,
            }
        })
        res.json(FindUser)

    } catch (err) {
        next(err);
    }
};

