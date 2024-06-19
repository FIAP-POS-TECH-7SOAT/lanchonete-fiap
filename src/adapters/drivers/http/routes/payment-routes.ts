import { Router } from 'express';
import {paymentsController} from '../controllers/payments-controller'





const paymentsRoutes = Router();


paymentsRoutes.post('/', paymentsController.create);


export {
  paymentsRoutes
};
