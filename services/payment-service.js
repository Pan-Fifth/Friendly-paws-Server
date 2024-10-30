const prisma = require("../configs/prisma");

exports.createOrderFromCart = async (userId, amount, paymentMethod) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            currency: "thb",
            amount,
            payment_method_types: paymentMethod === 'CREDIT' ? ['card'] : ['promptpay'],
        });

        const donate = await prisma.donates.create({
            data: {
                userId: userId,
                total: amount,
                payment_method: paymentMethod === 'CREDIT' ? 'CREDIT' : 'PROMPTPAY',
                transaction_id: paymentIntent.id,
                is_recurring: paymentMethod === 'CREDIT',
                receipt_url: paymentMethod === 'PROMPTPAY' ? paymentIntent.next_action.promptpay.receipt_url : null,
                status: paymentMethod === 'CREDIT' ? 'DONE' : 'PENDING',
            }
        });

        return donate;
    } catch (error) {
        throw new Error("Error creating donate: " + error.message);
    }
};
