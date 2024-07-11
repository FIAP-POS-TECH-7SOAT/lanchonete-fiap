import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import fs from 'fs'

import { IUploadFile, UploadFileProps } from "@application/products/application/ports/providers/upload-file-interface";
import { env } from '@shared/env';
import path, { extname } from 'path';

export class AWSUploadFile implements IUploadFile{

    async upload({filePath,fileName}:UploadFileProps): Promise<void> {
        
        const storage = new S3Client({
            region:env.AWS_REGION,
            credentials:{
                sessionToken:env.AWS_SESSION_TOKEN,
                accessKeyId:env.AWS_ACCESS_KEY_ID,
                secretAccessKey:env.AWS_SECRET_ACCESS_KEY
            }
        });

        const newFilePath = path.format({
            base:fileName,
            dir:filePath
        })
        
        const command =  new PutObjectCommand({
            Bucket: env.AWS_BUCKET_NAME,
            Key: env.AWS_BUCKET_DESTINATION +'/'+fileName,
            Body:fs.createReadStream(newFilePath),
            ContentType:extname(fileName),
            ACL:'public-read'
            
          });
        await storage.send(command)
        
        
        fs.unlinkSync(newFilePath);
    }
    
}
