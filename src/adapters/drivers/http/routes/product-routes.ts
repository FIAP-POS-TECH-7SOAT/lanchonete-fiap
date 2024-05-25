import { Router } from "express";
import { productController } from "../controllers/products-controller";

import { uploadFileMiddleware } from "@shared/configs/upload-file-config";

const productsRoutes = Router();

productsRoutes.post("/", productController.create);
productsRoutes.put("/:id", productController.update);
productsRoutes.get("/:id", productController.getById);
productsRoutes.get("/", productController.getManyByCategory);
productsRoutes.delete("/:id", productController.delete);
//prettier-ignore
productsRoutes.patch('/upload/:id', uploadFileMiddleware.single("imagem"),productController.upload);

export { productsRoutes };
