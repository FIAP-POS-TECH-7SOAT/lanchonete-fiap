import { Router } from 'express';
import { produtosController } from '../controllers/products-controller'

const produtosRoutes = Router();

produtosRoutes.post('/', produtosController.create);
produtosRoutes.put('/:id', produtosController.update);
produtosRoutes.get('/:id', produtosController.getById);
produtosRoutes.get('/', produtosController.getManyByCategoria);
produtosRoutes.delete('/:id', produtosController.delete);

export {
  produtosRoutes
};
