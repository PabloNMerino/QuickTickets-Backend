import express from "express";
import { config } from "dotenv";
import dbConnection from "./db/dbConnection";
import cors from "cors";
import authRouter from "./authentication/route/authRoute";
import userRouter from "./users/route/userRoute";
import categoryRouter from "./categories/route/categoryRoute";
import eventRouter from "./events/route/eventRoute";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swaggerConfiguration/config";
import cloudinaryRouter from "./cloudinary/route/cloudinaryRoute";
import orderRouter from "./orders/route/orderRoute";
import paymentRouter from "./payment/route/paymentRoute";
import ticketRouter from "./ticket/route/ticketRoute";
config();

const PORT = Number(process.env.PORT) ?? 3000;
const HOST = process.env.HOST!;

const app = express();

app.use(express.json());

app.use(cors({
    origin: `http://${HOST}:3000`,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token']
}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/auth', authRouter);
app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/event", eventRouter);
app.use("/image", cloudinaryRouter);
app.use("/order", orderRouter);
app.use("/pay", paymentRouter);
app.use("/ticket", ticketRouter);

dbConnection();

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
    console.log(`Documentación disponible en http://${HOST}:${PORT}/api-docs`);
})
