const prisma = require("../configs/prisma");


exports.getChooseEventBydate = async (startDate, endDate) => {
    try {
        const checkDate = new Date(startDate) - new Date(endDate)
        let start;
        let end;
        if (checkDate < 0) {
            start = new Date(`${startDate}T00:00:00.000Z`);
            end = new Date(`${endDate}T23:59:59.999Z`);
        } else {
            start = new Date(`${endDate}T00:00:00.000Z`);
            end = new Date(`${startDate}T23:59:59.999Z`);
        }


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
                created_at: true,

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
                created_at: true,
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
        const checkDate = new Date(startDate) - new Date(endDate)
        let start;
        let end;
        if (checkDate < 0) {
            start = new Date(`${startDate}T00:00:00.000Z`);
            end = new Date(`${endDate}T23:59:59.999Z`);
        } else {
            start = new Date(`${endDate}T00:00:00.000Z`);
            end = new Date(`${startDate}T23:59:59.999Z`);
        }


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
                        phone: true
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
                        phone: true
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
        const checkDate = new Date(startDate) - new Date(endDate)
        let start;
        let end;
        if (checkDate < 0) {
            start = new Date(`${startDate}T00:00:00.000Z`);
            end = new Date(`${endDate}T23:59:59.999Z`);
        } else {
            start = new Date(`${endDate}T00:00:00.000Z`);
            end = new Date(`${startDate}T23:59:59.999Z`);
        }

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
exports.getAllPetList = async () => {
    try {

        const pets = await prisma.pets.findMany({

            select: {
                id: true,
                name_th: true,
                age: true,
                color: true,
                gender: true,
                type: true,
                status: true,
                breed_th: true,
                description_th: true,
                medical_history: true,
                is_vaccinated: true,
                is_neutered: true,
                weight: true,
                created_at: true,

            },
            orderBy: { created_at: 'asc' }
        });

        console.log("pets Found:", pets);
        return pets;

    } catch (error) {
        console.error("Error querying pets:", error);
        throw new Error("Failed to fetch pets");
    }
};

exports.getAllAdoptRequest = async (count, page) => {
    try {
        const result = await prisma.adopts.findMany({
            orderBy: { id: "desc" },
            take: +count,
            skip: ((+page) - 1) * count,
            select: {
                id:true,
                career: true,
                status: true,
                address:true,
                workTime: true,
                workPlace: true,
                dayOff: true,
                salary: true,
                socialContact: true,
                familyMemberCount: true,
                familyAlwaysHome: true,
                aloneHours: true,
                housingType: true,
                hasGarden: true,
                hasFence: true,
                canWalkDog: true,
                deliveryType: true,
                approved_at:true,
                approved_by:true,
                created_at:true,
                user: {
                    select: {
                        email: true,
                        firstname: true,
                        lastname: true,
                        phone: true,
                        email: true,
                    }
                },
                pet: {
                    select: {
                        name_th: true,
                        image: {
                            take: 1,
                            select: {
                                url: true
                            }
                        }
                    }
                },
                HomeImages:{
                    select:{
                        url:true
                    }
                }
            }
        })
        return result
    } catch (err) {
        console.log("err getAllAdoptRequest", err);
        throw new Error("Failed to fetch AllAdoptRequest");
    }
}

exports.getAdoptScore = async (id) => {
    try {
        const result = prisma.adopts.findFirst({
            where: {
                id: +id
            }
        })
        return result;
    } catch (err) {
        console.log("err adoptScore", err);
        throw new Error("Failed to AI determind score");
    }
}