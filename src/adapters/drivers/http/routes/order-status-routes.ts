import { Router } from "express";
import { orderStatusController } from "../controllers/order-status-controller";

const orderStatusRoutes = Router();


orderStatusRoutes.patch("/:id", orderStatusController.update);



export { orderStatusRoutes };
