import { Product } from '@application/domain/products/entities/product';

export class ProductMapping {
  static toView(product: Product) {
    return {
      id: product.id.toString(),
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      image: product.image,
    };
  }
}
