import { Router } from 'express';
import { paymentsController } from '../controllers/payments-controller';

const paymentsRoutes = Router();

paymentsRoutes.post('/', paymentsController.create);
paymentsRoutes.post('/confirm', paymentsController.process);
paymentsRoutes.get('/:id', paymentsController.findPaymentById);

export { paymentsRoutes };
