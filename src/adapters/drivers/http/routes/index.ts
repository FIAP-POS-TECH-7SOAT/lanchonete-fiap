import { Router } from "express";


import {userRoutes} from './users.routes'


const routers = Router();

routers.use('/users',userRoutes);


export {
  routers
};
