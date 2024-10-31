const prisma = require("../configs/prisma")


exports.getUserProfile = (userId) => {

    return prisma.users.findUnique({

        where: {
            id: userId,
        },
        select: {
            id: true,
            firstname: true,
            lastname: true,
            phone: true,
            email: true,
        },
    })
}

exports.checkUserByUserId = (userId) => {

    return prisma.users.findUnique({

        where: { id: userId },
    })
}
