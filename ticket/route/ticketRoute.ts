import express from "express";
import { ticketController } from "../controller/ticketController";

const ticketRouter = express.Router();

ticketRouter.get('/download', ticketController.downloadTicket);
ticketRouter.get('/my-tickets',ticketController.getAllTicketsByBuyerId)

export default ticketRouter;