import { Router } from "express";
import { produtosController } from "../controllers/products-controller";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const produtosRoutes = Router();

produtosRoutes.post("/", produtosController.create);
produtosRoutes.put("/:id", produtosController.update);
produtosRoutes.get("/:id", produtosController.getById);
produtosRoutes.get("/", produtosController.getManyByCategoria);
produtosRoutes.delete("/:id", produtosController.delete);
//prettier-ignore
produtosRoutes.patch('/upload/:id', upload.single("imagem"),produtosController.upload);

export { produtosRoutes };
