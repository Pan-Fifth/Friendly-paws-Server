

const prisma = require("../configs/prisma")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const createError = require("../utils/createError")
const { getUserByEmail, createNewUser, findUserByGoogleId, createGoogleUser, updateUser } = require("../services/auth-service")


exports.register = async (req, res, next) => {

    try {
      
        const { email, password } = req.body


        const checkEmail = await getUserByEmail(email)
        
        if (checkEmail) {

            return createError(400, "Email already exist!!")
        }

        const hashPassword = await bcryptjs.hash(password, 10);

        const newUser = await createNewUser(hashPassword, email)

        res.json({ newUser })

    } catch (err) {

        next(err)
    }
}

exports.login = async (req, res, next) => {

    try {
        
        const { email, password } = req.body


        const user = await getUserByEmail(email)
        if (!user) {

            return createError(400, "User not found!!")
        }

        const checkPassword = await bcryptjs.compare(password, user.password)

        if (!checkPassword) {

            return createError(400, "Wrong password!!")
        }

        const firstname = user?.firstname || "";
        //create payload
        const payLoad = {
            user: {
                id: user.id,
                firstname: firstname,
                email: user.email,
                role: user.role,
            }
        }
        console.log(payLoad, "payload")

        //create token
        const genToken = jwt.sign(payLoad, process.env.JWT_SECRET, { expiresIn: "1d" })


        //send to frontend

        res.json({
            user: payLoad,
            token: genToken
        })



    } catch (err) {

        next(err)
    }
}

exports.loginGoogle = async (req, res, next) => {
    const { token } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payloadFromGoogle = ticket.getPayload();
        const googleId = payloadFromGoogle['sub'];
        const email = payloadFromGoogle['email'];
        const firstname = payloadFromGoogle.given_name || payloadFromGoogle.name.split(' ')[0];

        let user = await getUserByEmail(email);

        if (!user) {
            // ถ้าไม่มีผู้ใช้ ให้สร้างใหม่ด้วย Google ID, อีเมล, และชื่อ
            user = await createGoogleUser({
                googleId,
                email,
                firstname,
            });
        } else if (!user.googleId || !user.firstname) {
            // ถ้ามีผู้ใช้แล้ว แต่ไม่มี googleId หรือ firstname ให้ทำการอัปเดต
            const dataToUpdate = {
                googleId: user.googleId || googleId,
                firstname: user.firstname || firstname,
            };
            await updateUser(user.id, dataToUpdate);
            user = await getUserByEmail(email); // รีเฟรชข้อมูลผู้ใช้หลังการอัปเดต
        }

        const userPayload = {
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                firstname: user.firstname,
                googleId: user.googleId,
            }
        };

        const genToken = jwt.sign(userPayload, process.env.JWT_SECRET, { expiresIn: "1d" });
        console.log("Payload sent to frontend:", userPayload);

        res.status(200).json({
            message: 'Login successful',
            user: userPayload,
            token: genToken,
        });

    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
};




exports.forgetPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await getUserByEmail(email)
        if (!user) {
            return createError(404, 'email not found');
        }

        const token = crypto.randomBytes(20).toString('hex');
        const expiry = new Date(Date.now() + 3600000);

        await prisma.users.update({
            where: { email },
            data: {
                resettoken: token,
                resettokenExpire: expiry,
            },
        });

        await sendResetEmail(email, token);

        res.json({ message: 'The password reset link has been sent to your email.', tokenEmail: token });
    } catch (error) {
        next(error);
    }
};

exports.resetPassword = async (req, res, next) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await prisma.users.findFirst({
            where: {
                resettoken: token,
                resettokenExpire: {
                    gt: new Date(),
                },
            },
        });

        if (!user) {
            return createError(404, 'Invalid token');
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        await prisma.users.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resettoken: null,
                resettokenExpire: null,
            },
        });

        res.json({ message: 'Your password has been successfully reset.' });
    } catch (error) {
        next(error);
    }
};

exports.getPrivacyPolicy = (req, res) => {
    res.send(`
        <h1>Privacy Policy</h1>
        <p>This is our Privacy Policy. Here, we explain how we collect, use, and protect your information.</p>
        <h2>Information Collection</h2>
        <p>Details on how we collect and use data.</p>
        <h2>Security</h2>
        <p>Information on our security measures.</p>
    `);
};

exports.getTermsOfService = (req, res) => {
    res.send(`
        <h1>Terms of Service</h1>
        <p>These are the Terms of Service. By using our service, you agree to these terms.</p>
        <h2>User Responsibilities</h2>
        <p>Details on what users should adhere to.</p>
        <h2>Liability</h2>
        <p>Information on our liability and legal limitations.</p>
    `);
};