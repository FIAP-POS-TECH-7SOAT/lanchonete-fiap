import { Product } from "@application/products/domain/product";
import { IProductRepository } from "../ports/repositories/IProduct-repository";
import { IUploadFile } from "../ports/providers/upload-file-interface";

interface IRequest {
  id: string;
  image: string;
  filePath:string
}
interface IResponse extends Product {}

export class UploadProductImageService {
  constructor(
    private productRepository: IProductRepository,
    private uploadFile:IUploadFile
  ) {}

  public async execute({ id, image,filePath }: IRequest): Promise<IResponse> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw Error("O produto não foi encontrado!");
    }
    await this.uploadFile.upload({
      filePath,
      fileName:image
    })
    await this.productRepository.patchImage({ id, image });

    return product;
  }
}
