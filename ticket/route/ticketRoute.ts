import express from "express";
import { ticketController } from "../controller/ticketController";
import { isAuthenticated } from "../../middlewares";

const ticketRouter = express.Router();

ticketRouter.get('/download', ticketController.downloadTicket);
ticketRouter.get('/my-tickets', isAuthenticated, ticketController.getAllTicketsByBuyerId)

export default ticketRouter;