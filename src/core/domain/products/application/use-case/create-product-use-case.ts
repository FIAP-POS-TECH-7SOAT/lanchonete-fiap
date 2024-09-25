import { Product } from '@application/domain/products/entities/product';
import { ProductRepository } from '../ports/repositories/IProduct-repository';
import { Category } from '@application/domain/categories/entities/category';

interface IRequest {
  name: string;
  category: Category;
  price: number;
  description: string;
}
interface IResponse extends Product {}

export class CreateProductService {
  constructor(private productRepository: ProductRepository) {}

  public async execute({
    name,
    category,
    price,
    description,
  }: IRequest): Promise<IResponse> {
    const product = Product.create({
      name,
      category,
      price,
      description,
    });
    await this.productRepository.create(product);

    return product;
  }
}
