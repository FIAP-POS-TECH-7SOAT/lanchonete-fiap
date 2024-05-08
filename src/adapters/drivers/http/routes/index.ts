import { Router } from "express";


import {userRoutes} from './users.routes'
import {paymentsRoutes} from './payment.routes'
import { produtosRoutes } from "./produto.routes";


const routers = Router();

routers.use('/users',userRoutes);
routers.use('/payments',paymentsRoutes);
routers.use('/produtos',produtosRoutes);


export {
  routers
};
