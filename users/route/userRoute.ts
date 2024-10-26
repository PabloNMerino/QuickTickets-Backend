import express, { Request, Response } from "express";
import { userController } from "../controller/userController";
import { isAuthenticated, isAdmin } from "../../middlewares";

const usersRouter = express.Router();

usersRouter.put("/update", isAuthenticated, userController.updateUser);
usersRouter.patch("/delete", isAuthenticated, userController.softDeleteUser);
usersRouter.get("/information", isAuthenticated, userController.getUserInformation);
usersRouter.delete("/full-delete/:id", isAdmin, userController.fullDeleteUser);

export default usersRouter;