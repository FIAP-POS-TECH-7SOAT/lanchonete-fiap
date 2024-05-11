import { Router } from "express";
import { clientController } from "../controllers/clientController";

const clientRoutes = Router();

clientRoutes.post("/", clientController.create);
clientRoutes.get("/:id", clientController.getByCpf);

export { clientRoutes };
