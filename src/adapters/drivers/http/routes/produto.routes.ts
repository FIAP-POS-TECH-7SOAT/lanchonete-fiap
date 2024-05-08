import { Router } from 'express';
import { produtosController } from '../controllers/produtos-controller'

const produtosRoutes = Router();

produtosRoutes.post('/', produtosController.create);

export {
  produtosRoutes
};
