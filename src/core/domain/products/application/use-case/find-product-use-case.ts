import { Product } from '@application/domain/products/entities/product';
import { ProductRepository } from '../ports/repositories/IProduct-repository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id: string;
}
interface IResponse extends Product {}

export class FindProductService {
  constructor(private productRepository: ProductRepository) {}

  public async execute({ id }: IRequest): Promise<IResponse> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError('Product not find.');
    }

    return product;
  }
}
