
const createError = require("../utils/createError")
const jwt = require("jsonwebtoken")

exports.authenticate = (req, res, next) => {

    try {

        const authHeader = req.headers.authorization

        if (!authHeader) {

            return createError(401, "Token missing")
        }

        const token = authHeader.split(" ")[1]

        console.log(authHeader)


        jwt.verify(token, process.env.JWT_SECRET, (err, code) => {

            if (err) {

                return createError(401, "Token invalid")
            }

            req.user = code
            next()
        })
    } catch (err) {

        next(err)
    }
}