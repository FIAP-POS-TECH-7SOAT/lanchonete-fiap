import { Router } from 'express';

import { paymentsRoutes } from './payment-routes';
import { productsRoutes } from './product-routes';
import { orderRoutes } from './order-routes';
import { orderStatusRoutes } from './order-status-routes';
import { authMiddleware } from '../middlewares/auth-middleware';
import { infoRoutes } from './info-routes';

const routers = Router();

routers.use('/info', infoRoutes);
routers.use(authMiddleware); // Todas rotas passarão pelo middleware para validar JWT

routers.use('/payments', paymentsRoutes);
routers.use('/products', productsRoutes);
routers.use('/orders', orderRoutes);
routers.use('/orders/status', orderStatusRoutes);

export { routers };
