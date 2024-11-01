const prisma = require("../configs/prisma");


exports.getChooseEventBydate = async (startDate, endDate) => {
    try {
        const start = new Date(`${startDate}T00:00:00.000Z`);
        const end = new Date(`${endDate}T23:59:59.999Z`);

        console.log('Start Date (UTC):', start);
        console.log('End Date (UTC):', end);

        const events = await prisma.events.findMany({
            where: {
                date_start: { gte: start },
                date_end: { lte: end }
            },
            select: {
                id: true,
                title_th: true,
                description_th: true,
                date_start: true,
                date_end: true,
                status: true,
                location: true,

            },
            orderBy: { date_start: 'asc' }
        });

        console.log("Events Found:", events);
        return events;

    } catch (error) {
        console.error("Error querying events:", error);
        throw new Error("Failed to fetch events");
    }
};

exports.getAllEvent = async () => {
    try {
        const currentYear = new Date().getFullYear();
        const startOfYear = new Date(currentYear, 0, 1);
        const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59);

        const events = await prisma.events.findMany({
            where: {
                date_start: {
                    gte: startOfYear,
                    lte: endOfYear
                }
            },
            select: {
                id: true,
                title_th: true,
                description_th: true,
                date_start: true,
                date_end: true,
                status: true,
                location: true,
            },
            orderBy: { date_start: 'asc' }
        });

        console.log("Events Found:", events);
        return events;

    } catch (error) {
        console.error("Error querying events:", error);
        throw new Error("Failed to fetch events");
    }
};


exports.getChooseAdoptBydate = async (startDate, endDate) => {
    try {
        const start = new Date(`${startDate}T00:00:00.000Z`);
        const end = new Date(`${endDate}T23:59:59.999Z`);

        console.log('Start Date (UTC):', start);
        console.log('End Date (UTC):', end);

        const adopts = await prisma.adopts.findMany({
            where: {
                created_at: { gte: start },
                created_at: { lte: end }
            },
            select: {
                id: true,
                status: true,
                socialContact: true,
                approved_at: true,
                approved_by: true,
                notes: true,
                created_at: true,
                user: {
                    select: {
                        firstname: true,
                    }
                },
                approvedByAdmin: {
                    select: {
                        firstname: true,
                        lastname: true
                    }
                },
                pet: {
                    select: {
                        name_th: true
                    }
                }
            },
            orderBy: { created_at: 'asc' }
        });

        console.log("Adopts Found:", adopts);
        return adopts;

    } catch (error) {
        console.error("Error querying adopts:", error);
        throw new Error("Failed to fetch adopts");
    }
};

exports.getAllAdopt = async () => {
    try {
        const currentYear = new Date().getFullYear();
        const startOfYear = new Date(currentYear, 0, 1);
        const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59);

        const adopts = await prisma.adopts.findMany({
            where: {
                created_at: {
                    gte: startOfYear,
                    lte: endOfYear
                }
            },
            select: {
                id: true,
                status: true,
                socialContact: true,
                approved_at: true,
                approved_by: true,
                notes: true,
                created_at: true,
                user: {
                    select: {
                        firstname: true,
                    }
                },
                approvedByAdmin: {
                    select: {
                        firstname: true,
                        lastname: true
                    }
                },
                pet: {
                    select: {
                        name_th: true
                    }
                }
            },
            orderBy: { created_at: 'asc' }
        });

        console.log("Adopts Found:", adopts);
        return adopts;

    } catch (error) {
        console.error("Error querying adopts:", error);
        throw new Error("Failed to fetch adopts");
    }
};

exports.getChooseDonateBydate = async (startDate, endDate) => {
    try {
        const start = new Date(`${startDate}T00:00:00.000Z`);
        const end = new Date(`${endDate}T23:59:59.999Z`);

        console.log('Start Date (UTC):', start);
        console.log('End Date (UTC):', end);

        const donation = await prisma.donates.findMany({
            where: {
                created_at: { gte: start },
                created_at: { lte: end }
            },
            select: {
                id: true,
                total: true,
                payment_method: true,
                transaction_id: true,
                receipt_url: true,
                status: true,
                created_at: true,
                user: {
                    select: {
                        firstname: true,
                    }
                },
            },
            orderBy: { created_at: 'asc' }
        });

        console.log("donation Found:", donation);
        return donation;

    } catch (error) {
        console.error("Error querying donation:", error);
        throw new Error("Failed to fetch donation");
    }
};

exports.getAllDonate = async () => {
    try {
        const currentYear = new Date().getFullYear();
        const startOfYear = new Date(currentYear, 0, 1);
        const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59);

        const donation = await prisma.donates.findMany({
            where: {
                created_at: {
                    gte: startOfYear,
                    lte: endOfYear
                }
            },
            select: {
                id: true,
                total: true,
                payment_method: true,
                transaction_id: true,
                receipt_url: true,
                status: true,
                created_at: true,
                user: {
                    select: {
                        firstname: true,
                    }
                },
            },
            orderBy: { created_at: 'asc' }
        });

        console.log("donation Found:", donation);
        return donation;

    } catch (error) {
        console.error("Error querying donation:", error);
        throw new Error("Failed to fetch donation");
    }
};