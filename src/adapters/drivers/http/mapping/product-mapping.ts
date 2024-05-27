import { Product } from "@application/products/domain/product";

export class ProductMapping {
  static toView({ id, name, description, category, image, price }: Product) {
    return {
      id,
      name,
      category,
      description,
      price,
      image,
    };
  }
}
