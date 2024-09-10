import { Product } from "@application/domain/products/entities/product";
import { IProductRepository } from "../ports/repositories/IProduct-repository";
import { AppError } from "@shared/errors/AppError";
import { Category } from "@application/domain/categories/entities/category";

interface IRequest {
  category: Category;
}
interface IResponse extends Array<Product> {}

export class FindProductsByCategoryService {
  constructor(private productRepository: IProductRepository) {}

  public async execute({ category }: IRequest): Promise<IResponse> {
    const product = await this.productRepository.findManyByCategory(category);

    if (!product || !product.length) {
      throw new AppError(
        "Products not find by Category: " + category.toString()
      );
    }

    return product;
  }
}
