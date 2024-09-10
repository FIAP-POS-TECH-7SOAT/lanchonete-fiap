import { Storage,Bucket } from '@google-cloud/storage'
import fs from 'fs'

import { IUploadFile, UploadFileProps } from "@application/domain/products/application/ports/providers/upload-file-interface";
import { env } from '@shared/env';
import path from 'path';

export class GCPUploadFile implements IUploadFile{
    bucket: Bucket;

    constructor(){
        const storage = new Storage({
            projectId:env.CGP_PROJECT_ID,
            keyFilename:env.GCP_KEY_FILENAME
        });
        this.bucket = storage.bucket(env.GCP_BUCKET_NAME);
    }
    async upload({filePath,fileName}:UploadFileProps): Promise<void> {
        
        const newFilePath = path.format({
            base:fileName,
            dir:filePath
        })
        await this.bucket.upload(newFilePath,{
            destination:`${env.GCP_BUCKET_DESTINATION}/${fileName}`,
            
        })
        fs.unlinkSync(newFilePath);
    }
    
}
