import { Router } from "express";

import {paymentsRoutes} from './payment.routes'
import { produtosRoutes } from "./produto.routes";
import { orderRoutes } from "./orderRoutes";
import { orderStatusRoutes } from "./order-status-routes";
import { clientRoutes } from "./clientRoutes";

const routers = Router();


routers.use('/payments',paymentsRoutes);
routers.use('/produtos',produtosRoutes);
routers.use("/orders", orderRoutes);
routers.use("/orders/status", orderStatusRoutes);
routers.use("/clients", clientRoutes);

export { routers };
