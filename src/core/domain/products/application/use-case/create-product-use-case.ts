import { Product } from "@application/domain/products/entities/product";
import { IProductRepository } from "../ports/repositories/IProduct-repository";
import { Category } from "@application/domain/categories/entities/category";

interface IRequest {
  name: string;
  category: Category;
  price: number;
  description: string;
}
interface IResponse extends Product {}

export class CreateProductService {
  constructor(private productRepository: IProductRepository) {}

  public async execute({
    name,
    category,
    price,
    description,
  }: IRequest): Promise<IResponse> {
    const product = await this.productRepository.create({
      name,
      category,
      price,
      description,
    });

    return product;
  }
}
