import { Router } from 'express';
import { infoController } from '../controllers/info-controller';

const infoRoutes = Router();

infoRoutes.get('/', infoController.getInfo);

export { infoRoutes };
