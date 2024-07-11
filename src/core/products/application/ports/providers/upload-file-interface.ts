export type UploadFileProps={
    filePath:string, 
    fileName:string
}
export interface IUploadFile{
    upload(props:UploadFileProps): Promise<void>
}