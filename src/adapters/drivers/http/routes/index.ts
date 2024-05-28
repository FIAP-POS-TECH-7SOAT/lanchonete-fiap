import { Router } from "express";

import { paymentsRoutes } from "./payment-routes";
import { productsRoutes } from "./product-routes";
import { orderRoutes } from "./order-routes";
import { orderStatusRoutes } from "./order-status-routes";
import { clientRoutes } from "./client-routes";

const routers = Router();

routers.use("/payments", paymentsRoutes);
routers.use("/products", productsRoutes);
routers.use("/orders", orderRoutes);
routers.use("/orders/status", orderStatusRoutes);
routers.use("/clients", clientRoutes);

export { routers };
