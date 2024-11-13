const createError = require("../utils/createError");
const sendEmailByNodemailer = require("../utils/send-email");
const prisma = require("../configs/prisma")



const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-08-01",
});


exports.getConfig = (req, res, next) => {
    res.send({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
}


exports.createPayment = async (req, res, next) => {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
        return createError(400, "Invalid amount");
    }

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            currency: "thb",
            amount: amount,
            automatic_payment_methods: { enabled: true },
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (err) {

        next(err);
    }
};

exports.confirmPayment = async (req, res, next) => {
    try {
        const { userId, amount, paymentMethod } = req.body;
        console.log(req.body)

        const amountInSatang = Math.round(Number(amount) * 100);

        if (amountInSatang < 1000) {
            return next(createError(400, 'Amount must be at least ฿10.00 THB'));
        }

        if (!amount || !paymentMethod) {
            return next(createError(400, 'Amount and payment method are required'));
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountInSatang,
            currency: 'thb',
            payment_method_types: paymentMethod === 'CREDIT' ? ['card'] : ['promptpay'],
        });

        // Single donation creation
        // Send email only if user exists
        const donate = await prisma.donates.create({
            data: {
                userId: parseInt(userId),
                total: Number(amount),
                payment_method: paymentMethod === 'CREDIT' ? 'CREDIT' : 'PROMPTPAY',
                transaction_id: paymentIntent.id,
                is_recurring: paymentMethod === 'CREDIT',
                receipt_url: paymentMethod === 'PROMPTPAY' ? paymentIntent.next_action.promptpay.receipt_url : null,
                status: paymentMethod === 'CREDIT' ? 'DONE' : 'PENDING',
            },
            include: userId ? { user: true } : undefined
        });
        if (userId && donate.user?.email) {

            const emailSubject = 'Thank You for Your Donation!';
            const emailMessage = `
                Thank you for your generous donation of ฿${amount} THB!
                
                Donation Details:
                - Amount: ฿${amount} THB
                - Payment Method: ${paymentMethod}
                - Transaction ID: ${paymentIntent.id}
                
                Your support helps us continue our mission to help animals in need.
            `;

            await sendEmailByNodemailer(
                donate.user.email,
                emailSubject,
                emailMessage,
                donate.user.googleId
            );
            console.log('Email sent successfully', donate.user.email, emailSubject, emailMessage, donate.user.googleId);
            res.json({
                message: 'Donate created',
                donate,
            });
        } else {
            const donate = await prisma.donates.create({
                data: {
                    total: Number(amount),
                    payment_method: paymentMethod === 'CREDIT' ? 'CREDIT' : 'PROMPTPAY',
                    transaction_id: paymentIntent.id,
                    is_recurring: paymentMethod === 'CREDIT',
                    receipt_url: paymentMethod === 'PROMPTPAY' ? paymentIntent.next_action.promptpay.receipt_url : null,
                    status: paymentMethod === 'CREDIT' ? 'DONE' : 'PENDING',
                },
            })

            res.json({
                message: 'Donate created',
                donate,
            });
        }


    } catch (error) {
        console.error('Error creating donate:', error.message);
        next(error);
    }
};
