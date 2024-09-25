import { Product } from "@application/domain/products/entities/product";
import { ProductRepository } from "../ports/repositories/IProduct-repository";
import { AppError } from "@shared/errors/AppError";
import { Category } from "@application/domain/categories/entities/category";

interface IRequest {
  category: Category;
}
interface IResponse extends Array<Product> {}

export class FindProductsByCategoryService {
  constructor(private productRepository: ProductRepository) {}

  public async execute({ category }: IRequest): Promise<IResponse> {
    const product = await this.productRepository.findManyByCategory(category);

    return product;
  }
}
