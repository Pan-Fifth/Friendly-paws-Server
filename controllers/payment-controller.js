const createError = require("../utils/createError");
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

        if (!userId || !amount || !paymentMethod) {
            return createError(400, 'Customer ID, amount, and payment method are required');
        }

        // ตรวจสอบว่าผู้ใช้มีอยู่จริง
        const userExists = await prisma.users.findFirst({
            where: { id: userId }
        });

        if (!userExists) {
            return createError(400, 'User not found');
        }

        // สร้าง PaymentIntent ขึ้นอยู่กับประเภทการชำระเงิน
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'thb',
            payment_method_types: paymentMethod === 'CREDIT' ? ['card'] : ['promptpay'],
        });

        // บันทึกคำสั่งซื้อ (donate) ใหม่ลงในฐานข้อมูล
        const donate = await prisma.donates.create({
            data: {
                userId: userId,
                total: amount,
                payment_method: paymentMethod === 'CREDIT' ? 'CREDIT' : 'PROMPTPAY',
                transaction_id: paymentIntent.id, // transaction_id จาก PaymentIntent
                is_recurring: paymentMethod === 'CREDIT',
                receipt_url: paymentMethod === 'PROMPTPAY' ? paymentIntent.next_action.promptpay.receipt_url : null,
                status: paymentMethod === 'CREDIT' ? 'DONE' : 'PENDING',
            },
        });

        // ส่งข้อมูลกลับไปยังฝั่ง frontend
        res.json({
            message: 'Donate created',
            donate,
        });
    } catch (error) {
        console.error('Error creating donate:', error.message);
        next(error);
    }
};
