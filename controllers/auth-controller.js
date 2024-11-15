const prisma = require("../configs/prisma")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const axios = require('axios');


const createError = require("../utils/createError")
const { getUserByEmail, createNewUser, findUserByGoogleId, createGoogleUser, updateUser } = require("../services/auth-service")


const verifyFacebookToken = async (accessToken, userID) => {
    const url = `https://graph.facebook.com/v8.0/${userID}?fields=id,name,email&access_token=${accessToken}`;
    const response = await axios.get(url);
    return response.data;
};

exports.facebookLogin = async (req, res, next) => {
    const { tokenFacebook, facebookId } = req.body;

    try {
        const facebookData = await verifyFacebookToken(tokenFacebook, facebookId);

        if (!facebookData || facebookData.id !== facebookId) {
            return next(createError(401, 'Invalid Facebook token'));
        }
        console.log(facebookData, "facebookData")
        let user = await prisma.users.findFirst({
            where: { facebookId: facebookData.id },
        });

        if (!user) {
            user = await prisma.users.create({
                data: {
                    facebookId: facebookData.id,
                    tokenFacebook,
                    email: facebookData.email,
                    firstname: facebookData.name,
                    isVerify: true,
                },
            });
            console.log(user, "user")
        } else {
            user = await prisma.users.update({
                where: { id: user.id },
                data: {
                    tokenFacebook,
                },
            });
        }

        const jwtToken = jwt.sign(
            { user: { id: user.id, email: user.email } },
            process.env.JWT_SECRET, { expiresIn: '1d' }
        );

        res.json({ token: jwtToken, user });
    } catch (error) {
        console.error('Error in facebookLogin:', error);
        next(error);
    }
};

exports.register = async (req, res, next) => {

    try {

        const { email, password } = req.body


        const checkEmail = await getUserByEmail(email)

        if (checkEmail) {

            return createError(400, "Email already exist!!")
        }

        const hashPassword = await bcryptjs.hash(password, 10);

        const newUser = await createNewUser(hashPassword, email)

        const token = jwt.sign({ user: newUser.id }, process.env.JWT_SECRET, { expiresIn: "7d" })
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ADMIN,
                pass: process.env.EMAIL_PASS
            }
        })
        const verificationLink = `${process.env.BASE_URL}/auth/verification/${token}`

        await transporter.sendMail({
            to: email,
            subject: "Email Verification by Friendly Paws",
            // text: "Please verify your email by clicking on this link: ",
            html: `<p>Please verify by clicking the following link : </p> <a href=${verificationLink} target="_blank" rel="noopener noreferrer">Click this link</a>`,
        });
        res.json({ message: "verification email has been sent to your email!!", newUser })

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
        if (user.isVerify === false) {
            const token = jwt.sign({ user: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" })
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_ADMIN,
                    pass: process.env.EMAIL_PASS
                }
            })
            const verificationLink = `${process.env.BASE_URL}/auth/verification/${token}`

            await transporter.sendMail({
                to: email,
                subject: "Email Verification by Friendly Paws",
                // text: "Please verify your email by clicking on this link: ",
                html: `
                <img src="https://res.cloudinary.com/dqlfh6fxi/image/upload/v1731583303/v6myb7blzmbxqmf6fg2a.png" style="max-width: 200px;" alt="logo"/>
                <p>Please verify by clicking the following link : </p> <a href=${verificationLink} target="_blank" rel="noopener noreferrer">Click this link</a>`,
            });
            return createError(400, "Please verify your email first!!")

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
        const lastname = payloadFromGoogle.family_name
        console.log('payloadFromGoogle :>> ', payloadFromGoogle);
        let user = await getUserByEmail(email);

        if (!user) {
            // ถ้าไม่มีผู้ใช้ ให้สร้างใหม่ด้วย Google ID, อีเมล, และชื่อ
            user = await createGoogleUser({
                googleId,
                email,
                firstname,
                lastname,
            });
        } else if (!user.googleId || !user.firstname) {
            // ถ้ามีผู้ใช้แล้ว แต่ไม่มี googleId หรือ firstname ให้ทำการอัปเดต
            const dataToUpdate = {
                googleId: user.googleId || googleId,
                firstname: user.firstname || firstname,
                lastname: user.lastname || lastname
            };
            console.log(dataToUpdate, "dataToUpdate")
            await updateUser(user.id, dataToUpdate);
            user = await getUserByEmail(email); // รีเฟรชข้อมูลผู้ใช้หลังการอัปเดต
        }

        const userPayload = {
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                firstname: user.firstname,
                lastname: user.lastname,
                googleId: user.googleId,
            }
        };

        const genToken = jwt.sign(userPayload, process.env.JWT_SECRET, { expiresIn: "1d" });


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


const sendResetEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.EMAIL_ADMIN,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_ADMIN,
        to: email,
        subject: 'Reset Your Password',
        text: `Click this link to reset your password.: http://localhost:5173/reset-password/${token}`,
    };

    await transporter.sendMail(mailOptions);
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
        res.status(200).json({ success: true, message: 'Password reset link sent.' });
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

exports.verification = async (req, res, next) => {
    try {
        const { token } = req.params
        const headers = jwt.verify(token, process.env.JWT_SECRET)
        if (!headers) {
            return createError(404, "token missing")
        }
        const user = await prisma.users.findFirst({
            where: { id: headers.user }
        })
        console.log(user)
        if (!user) {
            return createError(404, "user not existed")
        }
        const verify = await prisma.users.update({
            where: {
                id: headers.user
            },
            data: {
                isVerify: true
            }
        })
        // res.json({message:"account has been verified",redirectUrl:"https://localhost:5173/login" })
        res.redirect('http://localhost:5173/login')
    } catch (err) {
        next(err)
    }
}