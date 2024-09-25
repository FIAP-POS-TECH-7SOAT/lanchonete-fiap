import { Router } from 'express';
import { orderController } from '../controllers/order-controller';

const orderRoutes = Router();

orderRoutes.post('/', orderController.create);
orderRoutes.get('/:id', orderController.get);
orderRoutes.get('/', orderController.getAll);
orderRoutes.put('/:id', orderController.update);
orderRoutes.patch('/cancel/:id', orderController.cancelOrder);

export { orderRoutes };
