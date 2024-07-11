import multer from "multer";
import { extname, resolve } from "path";
import { env } from "@shared/env";

const destination = resolve(__dirname,'..','..','shared','tmp', 'uploads');
const multerObj = {
    local: multer.diskStorage({
        destination,
        filename: (
            req,
            file,
            callback,
        ) => {
            return callback(null ,crypto.randomUUID() + extname(file.originalname));
        },
    })
}   

export const uploadFileMiddleware = multer({
    dest:destination,
    storage:multerObj.local,
    limits: {
        fileSize: env.APP_STORAGE_MAX_SIZE,
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
          "image/jpeg",
          "image/pjpeg",
          "image/png",
          "image/gif",
        ];
    
        if (allowedMimes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error("Invalid file type."));
        }
      },
});

