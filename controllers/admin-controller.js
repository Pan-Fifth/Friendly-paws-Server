
// admin-controller.js
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const prisma = require("../configs/prisma");
const createError = require('../utils/createError');

// ฟังก์ชันดึงข้อมูลผู้ใช้ทั้งหมด (เฉพาะ Admin เท่านั้น)
module.exports.getAllUsers = async (req, res, next) => {
  try {
    // ตรวจสอบว่า user ที่ทำการร้องขอเป็น Admin หรือไม่
    // if (req.user.role !== 'ADMIN') {
    //   return next(createError(403, 'Access denied. Only admins can perform this action.'));
    // }

    const users = await prisma.users.findMany({
      orderBy: {
        role: 'desc',
      }
    });
    res.json(users);
  } catch (error) {
    next(createError(500, 'Failed to retrieve users.'));
  }
};


// ฟังก์ชันแก้ไขข้อมูลผู้ใช้เฉพาะ Admin เท่านั้น
module.exports.updateUserById = async (req, res, next) => {
  const { id } = req.params;
  const { email, firstname, lastname, phone, role } = req.body;

  try {

    const updatedUser = await prisma.users.update({
      where: { id: parseInt(id) },
      data: {
        email,
        firstname,
        lastname,
        phone,
        role, // Admin สามารถแก้ไข role ได้
      },
    });

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};


// ฟังก์ชันส่งอีเมลยืนยันการดำเนินการสำหรับผู้ใช้
module.exports.sendNotificationEmail = async (userEmail, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject,
    text: message,
  };

  await transporter.sendMail(mailOptions);
};

// ฟังก์ชันลบผู้ใช้ตาม ID (เฉพาะ Admin เท่านั้น)
module.exports.deleteUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    // ตรวจสอบว่า user ที่ทำการร้องขอเป็น Admin หรือไม่
    // if (req.user.role !== 'ADMIN') {
    //   return next(createError(403, 'Access denied. Only admins can perform this action.'));
    // }

    // ลบข้อมูลผู้ใช้
    await prisma.users.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send(); // ส่งสถานะ 204 No Content หลังจากลบสำเร็จ
  } catch (error) {
    next(error);
  }
};

module.exports.getDashboard = async (req, res, next) => {
  try {
    // Get current date and 6 months ago date
    const now = new Date()
    const sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 6))

    // Get start of current year for YTD calculation
    const startOfYear = new Date(now.getFullYear(), 0, 1)

    // Get total YTD donations
    const ytdDonations = await prisma.donates.aggregate({
      where: {
        created_at: {
          gte: startOfYear,
        },
        status: 'DONE'
      },
      _sum: {
        total: true
      }
    })

    // Get total counts
    const [
      totalUsers,
      totalPets,
      totalAdoptions,
      totalDonations,
      totalEvents,
      totalVolunteers
    ] = await Promise.all([
      prisma.users.count({
        where: {
          role: 'USER'
        }
      }),
      prisma.pets.count(),
      prisma.adopts.count(),
      prisma.donates.count(),
      prisma.events.count(),
      prisma.volunteers.count()
    ])

    // Get monthly statistics for last 6 months
    const monthlyAdoptions = await prisma.adopts.groupBy({
      by: ['created_at'],
      where: {
        created_at: {
          gte: sixMonthsAgo
        }
      },
      _count: true,
      orderBy: {
        created_at: 'asc'
      }
    })

    const monthlyDonations = await prisma.donates.groupBy({
      by: ['created_at'],
      where: {
        created_at: {
          gte: sixMonthsAgo
        }
      },
      _sum: {
        total: true
      },
      orderBy: {
        created_at: 'asc'
      }
    })

    // Get recent activities
    const recentActivities = await Promise.all([
      // Recent adoptions
      prisma.adopts.findMany({
        take: 20,
        orderBy: { created_at: 'desc' },
        include: {
          user: {
            select: {
              firstname: true,
              lastname: true
            }
          },
          pet: {
            select: {
              name_en: true,
              name_th: true
            }
          }
        }
      }),
      // Recent donations
      prisma.donates.findMany({
        take: 5,
        orderBy: { created_at: 'desc' },
        include: {
          user: {
            select: {
              firstname: true,
              lastname: true
            }
          }
        }
      }),
      // Recent events
      prisma.events.findMany({
        take: 5,
        orderBy: { created_at: 'desc' },
        include: {
          attendees: {
            select: {
              userId: true
            }
          }
        }
      })
    ])

    // Get pets status distribution
    const petsStatusDistribution = await prisma.pets.groupBy({
      by: ['status'],
      _count: true
    })

    res.json({
      overview: {
        totalUsers,
        totalPets,
        totalAdoptions,
        totalDonations,
        totalEvents,
        totalVolunteers,
        ytdDonationsAmount: ytdDonations._sum.total || 0
      },
      monthlyStats: {
        adoptions: monthlyAdoptions,
        donations: monthlyDonations
      },
      recentActivities: {
        adoptions: recentActivities[0],
        donations: recentActivities[1],
        events: recentActivities[2]
      },
      petsStatusDistribution
    })

  } catch (error) {
    next(error)
  }
}


module.exports.getDonation = async (req, res, next) => {
  try {
    const { startDate, endDate, page = 1, limit = 20 } = req.query

    const skip = (page - 1) * parseInt(limit)

    const where = {
      created_at: {
        gte: startDate ? new Date(startDate) : new Date(new Date().setMonth(new Date().getMonth() - 1)),
        lte: endDate ? new Date(endDate) : new Date()
      }
    }

    const [donations, total] = await Promise.all([
      prisma.donates.findMany({
        where,
        include: {
          user: {
            select: {
              firstname: true,
              lastname: true
            }
          }
        },
        skip,
        take: parseInt(limit),
        orderBy: {
          created_at: 'desc'
        }
      }),
      prisma.donates.count({ where })
    ])

    res.json({
      donations,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: parseInt(page)
      }
    })
  } catch (error) {
    next(error)
  }
}
module.exports.updateDonation = async (req, res, next) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const updatedDonation = await prisma.donates.update({
      where: { id: parseInt(id) },
      data: { status },
      include: {
        user: {
          select: {
            firstname: true,
            lastname: true
          }
        }
      }
    })

    res.json(updatedDonation)
  } catch (error) {
    next(error)
  }
}


module.exports.getDonationGoals = async (req, res) => {
  const { year } = req.query
  console.log("get year", year)
  const goals = await prisma.donationGoals.findFirst({
    where: {
      year: parseInt(year)
    }
  })
  return res.status(200).json(goals)
}

module.exports.updateDonationGoals = async (req, res) => {
  const { year } = req.params
  const { targetAmount, targetPets, petsHelped } = req.body

  const updatedGoals = await prisma.donationGoals.upsert({
    where: {
      year: parseInt(year)
    },
    update: {
      targetAmount,
      targetPets,
      petsHelped
    },
    create: {
      year: parseInt(year),
      targetAmount,
      targetPets,
      petsHelped
    }
  })

  return res.status(200).json(updatedGoals)
}