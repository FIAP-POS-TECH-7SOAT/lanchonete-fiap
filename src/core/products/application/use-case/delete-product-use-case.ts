import { Product } from "@application/products/domain/product";
import { IProductRepository } from "../ports/repositories/IProduct-repository";

interface IRequest {
  id: string;
}
interface IResponse extends Product {}

export class DeleteProductService {
  constructor(private productRepository: IProductRepository) {}

  public async execute({ id }: IRequest): Promise<IResponse> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw Error("O produto não foi encontrado!");
    }

    product.deleted = true;

    await this.productRepository.update(product);

    return product;
  }
}
