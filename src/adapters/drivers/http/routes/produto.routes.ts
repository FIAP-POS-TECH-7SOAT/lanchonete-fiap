import { Router } from "express";
import { produtosController } from "../controllers/products-controller";

import { uploadFileMiddleware } from "@shared/configs/upload-file-config";

const produtosRoutes = Router();

produtosRoutes.post("/", produtosController.create);
produtosRoutes.put("/:id", produtosController.update);
produtosRoutes.get("/:id", produtosController.getById);
produtosRoutes.get("/", produtosController.getManyByCategoria);
produtosRoutes.delete("/:id", produtosController.delete);
//prettier-ignore
produtosRoutes.patch('/upload/:id', uploadFileMiddleware.single("imagem"),produtosController.upload);

export { produtosRoutes };
