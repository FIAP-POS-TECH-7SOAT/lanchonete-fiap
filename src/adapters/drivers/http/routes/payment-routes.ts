import { Router } from 'express';
import {paymentsController} from '../controllers/payments-controller'





const paymentsRoutes = Router();


paymentsRoutes.post('/', paymentsController.create);
paymentsRoutes.get('/', paymentsController.create);
paymentsRoutes.put('/', paymentsController.create);
paymentsRoutes.patch('/', paymentsController.create);

export {
  paymentsRoutes
};
