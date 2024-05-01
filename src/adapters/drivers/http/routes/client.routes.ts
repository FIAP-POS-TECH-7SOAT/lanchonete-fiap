import { Router } from "express";
import { clientController } from "../controllers/client-controller";

const userRoutes = Router();

userRoutes.post("/", clientController.create);
userRoutes.get("/", clientController.get);

export { userRoutes };
