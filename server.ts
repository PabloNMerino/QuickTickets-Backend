
import express from "express";
import { config } from "dotenv";
import dbConnection from "./db/dbConnection";
import cors from "cors";
import authRouter from "./authentication/route/authRoute";

config();

const PORT = Number(process.env.PORT) ?? 3000;
const HOST = process.env.HOST!;


const app = express();

app.use(express.json());

app.use(cors({
    origin: `http://${HOST}:${PORT}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/auth', authRouter);


dbConnection();


app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
})


