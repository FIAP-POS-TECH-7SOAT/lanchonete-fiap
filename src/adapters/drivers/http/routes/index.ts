import { Router } from "express";


import {userRoutes} from './users.routes'
import {paymentsRoutes} from './payment.routes'


const routers = Router();

routers.use('/users',userRoutes);
routers.use('/payments',paymentsRoutes);


export {
  routers
};
