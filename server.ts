import express from "express";
import { config } from "dotenv";
import dbConnect from "./db/dbConnect";

config();

const PORT = Number(process.env.PORT) ?? 3000;
const HOST = process.env.HOST!;

const app = express();

app.use(express.json());

dbConnect();

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
})