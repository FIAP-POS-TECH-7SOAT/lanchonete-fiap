import { Product } from "@application/products/domain/product";

export class ProductMapping {
  static toView(product: Product) {
    return {
      id:product.id,
      name:product.name,
      category:product.category,
      description:product.description,
      price:product.price,
      image:product.image,
    };
  }
}
