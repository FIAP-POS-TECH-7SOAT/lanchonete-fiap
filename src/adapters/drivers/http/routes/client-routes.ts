import { Router } from "express";
import { clientController } from "../controllers/client-controller";

const clientRoutes = Router();

clientRoutes.post("/", clientController.create);
clientRoutes.get("/bycpf/:cpf", clientController.getByCpf);

export { clientRoutes };
