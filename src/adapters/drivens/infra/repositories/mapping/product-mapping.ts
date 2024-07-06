import { Category } from "@application/categories/domain/category";
import { Product } from "@application/products/domain/product";
//prettier-ignore
import { Product as ProductPrisma, Category as CategoryPrisma, Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export class ProductMapping {
  static toDomain({
    id,
    name,
    description,
    category,
    image,
    price,
    deleted,
  }: ProductPrisma) {
    
    
    return new Product(
      {
        name,
        category: Category[category],
        description,
        price: Number(price),
        image,
        deleted,
      },
      id
    );
  }

  static toPrisma(product: Product) {
    return {
      id: product.id,
      name: product.name,
      category: product.category.toString().toUpperCase() as CategoryPrisma,
      description: product.description,
      price: new Decimal(product.price),
      image: product.image,
      deleted: product.deleted,
    };
  }
}
