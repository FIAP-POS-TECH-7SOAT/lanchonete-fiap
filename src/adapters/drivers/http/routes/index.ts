import { Router } from "express";

import { userRoutes } from "./users.routes";
import { paymentsRoutes } from "./payment.routes";
import { orderRoutes } from "./orderRoutes";
import { clientRoutes } from "./clientRoutes";

const routers = Router();

routers.use("/users", userRoutes);
routers.use("/payments", paymentsRoutes);
routers.use("/orders", orderRoutes);
routers.use("/clients", clientRoutes);

export { routers };
