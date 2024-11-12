import express from "express";
import { ticketController } from "../controller/ticketController";

const ticketRouter = express.Router();

ticketRouter.get('/download', ticketController.downloadTicket);

export default ticketRouter;