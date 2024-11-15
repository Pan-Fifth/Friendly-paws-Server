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
exports.findUserByGoogleId = async (googleId) => {
    return await prisma.users.findUnique({
        where: {
            googleId: googleId,
        },
    });
};


exports.createGoogleUser = async (data) => {
    return await prisma.users.create({
        data: {
            googleId: data.googleId,
            email: data.email,
            password: '',
            firstname: data.firstname,
            lastname: data.lastname,
            isVerify: true,
        },
    });
};

exports.updateUser = async (id, data) => {
    return await prisma.users.update({
        where: {
            id: id,
        },
        data: data,
    });
};