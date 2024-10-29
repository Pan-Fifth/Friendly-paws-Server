const prisma = require("../configs/prisma")

exports.getUserByEmail = (email) => {

    return prisma.users.findFirst({

        where: {
            email: email
        }
    })
}

exports.createNewUser = (hashPassword, email) => {

    return prisma.users.create({

        data: {
            email,
            password: hashPassword
        }
    })

}