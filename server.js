const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const handleError = require("./middlewares/error");
const notFound = require("./middlewares/notFound");

const authRouter = require("./routes/auth-route");
const userRouter = require("./routes/user-route");
const paymentRouter = require("./routes/payment-route");
const petRouter = require("./routes/pet-route");
const { authenticate } = require("./middlewares/authenticate");


app.use(morgan("dev"));
app.use(express.json());
// app.use(cors());

app.use(express.static(process.env.STATIC_DIR));
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(bodyParser.json());

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/payment", paymentRouter);
app.use("/pet", petRouter)





app.use(handleError);
app.use('*', notFound);
app.listen(3000, () => console.log("Listening on port 3000"));
