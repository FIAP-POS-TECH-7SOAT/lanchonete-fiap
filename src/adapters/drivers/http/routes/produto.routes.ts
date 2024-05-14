import { Router } from 'express';
import { produtosController } from '../controllers/produtos-controller'

const produtosRoutes = Router();

produtosRoutes.post('/', produtosController.create);
produtosRoutes.patch('/id', produtosController.update);
produtosRoutes.get('/id', produtosController.getById);

export {
  produtosRoutes
};
