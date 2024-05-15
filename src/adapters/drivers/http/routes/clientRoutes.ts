import { Router } from "express";
import { clientController } from "../controllers/clientController";

const clientRoutes = Router();

clientRoutes.post("/", clientController.create);
clientRoutes.get("/bycpf/:cpf", clientController.getByCpf);

export { clientRoutes };
