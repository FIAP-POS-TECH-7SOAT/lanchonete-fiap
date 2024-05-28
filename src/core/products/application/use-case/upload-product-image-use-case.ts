import { Product } from "@application/products/domain/product";
import { IProductRepository } from "../ports/repositories/IProduct-repository";

interface IRequest {
  id: string;
  image: string;
}
interface IResponse extends Product {}

export class UploadProductImageService {
  constructor(private productRepository: IProductRepository) {}

  public async execute({ id, image }: IRequest): Promise<IResponse> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw Error("O produto não foi encontrado!");
    }
    await this.productRepository.patchImage({ id, image });

    return product;
  }
}
