import { Router } from "express";
import { produtosController } from "../controllers/products-controller";
import multer from "multer";
import { resolve, extname } from "path";
import crypto from "crypto";

const storage = multer.memoryStorage();

const multerObj = {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', '..', '..', 'shared', 'tmp', 'uploads'),
        filename: (req, file, cb) => {
            return cb(null ,crypto.randomUUID() + extname(file.originalname));
        },
    }),
}

const upload = multer( multerObj );

const produtosRoutes = Router();

produtosRoutes.post("/", produtosController.create);
produtosRoutes.put("/:id", produtosController.update);
produtosRoutes.get("/:id", produtosController.getById);
produtosRoutes.get("/", produtosController.getManyByCategoria);
produtosRoutes.delete("/:id", produtosController.delete);
//prettier-ignore
produtosRoutes.patch('/upload/:id', upload.single("imagem"),produtosController.upload);

export { produtosRoutes };
