const prisma = require("../configs/prisma")

exports.getDashboard = async (req, res, next) => {
    try {
        // Get total counts
        const users = await prisma.users.count({
            where: { role: "USER" }
        });
        
        const pets = await prisma.pets.count();
        
        const adoptions = await prisma.adopts.count();
        
        const volunteers = await prisma.volunteers.count();

        // Get donation statistics for the last 6 months
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const donations = await prisma.donates.groupBy({
            by: ['created_at'],
            where: {
                created_at: {
                    gte: sixMonthsAgo
                },
                status: 'DONE'
            },
            _sum: {
                total: true
            },
            orderBy: {
                created_at: 'asc'
            }
        });

        // Get adoption status breakdown
        const adoptionStatus = await prisma.pets.groupBy({
            by: ['status'],
            _count: true
        });

        // Get recent donations
        const recentDonations = await prisma.donates.findMany({
            take: 5,
            orderBy: {
                created_at: 'desc'
            },
            include: {
                user: {
                    select: {
                        firstname: true,
                        lastname: true,
                        email: true
                    }
                }
            }
        });

        // Get pending adoptions
        const pendingAdoptions = await prisma.adopts.findMany({
            where: {
                status: 'PENDING'
            },
            take: 5,
            include: {
                user: {
                    select: {
                        firstname: true,
                        lastname: true,
                        email: true
                    }
                },
                pet: {
                    select: {
                        name_en: true,
                        type: true
                    }
                }
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        res.status(200).json({
            success: true,
            data: {
                overview: {
                    totalUsers: users,
                    totalPets: pets,
                    totalAdoptions: adoptions,
                    totalVolunteers: volunteers
                },
                donationStats: donations,
                adoptionStatus,
                recentDonations,
                pendingAdoptions
            }
        });

    } catch (err) {
        next(err);
    }
}
