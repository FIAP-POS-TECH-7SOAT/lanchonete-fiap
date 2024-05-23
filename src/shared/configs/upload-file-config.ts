import multer from "multer";
import { extname, resolve } from "path";


const multerObj = {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..','tmp', 'uploads'),
        filename: (
            req,
            file,
            callback,
        ) => {
            return callback(null ,crypto.randomUUID() + extname(file.originalname));
        },
    }),
}   

export const uploadFileMiddleware = multer( multerObj );

