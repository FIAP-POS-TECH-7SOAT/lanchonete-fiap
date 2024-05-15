import { Router } from "express";
import { orderController } from "../controllers/orderController";

const orderRoutes = Router();

orderRoutes.post("/", orderController.create);
orderRoutes.get("/:id", orderController.get);
orderRoutes.get("/", orderController.getAll);
orderRoutes.put("/", orderController.update);

export { orderRoutes };
