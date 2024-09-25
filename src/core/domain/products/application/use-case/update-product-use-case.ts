import { Product } from "@application/domain/products/entities/product";
import { ProductRepository } from "../ports/repositories/IProduct-repository";
import { Category } from "@application/domain/categories/entities/category";

interface IRequest {
  id: string;
  name: string;
  category: Category;
  price: number;
  description: string;  
}
interface IResponse extends Product {}

export class UpdateProductService {
  constructor(private productRepository: ProductRepository) {}

  public async execute({
    id,
    name,
    category,
    price,
    description
  }: IRequest): Promise<IResponse> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw Error("O produto não foi encontrado!");
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;

    await this.productRepository.update(product);

    return product;
  }
}
