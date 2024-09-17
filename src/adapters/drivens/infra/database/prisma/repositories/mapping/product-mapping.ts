import { UniqueEntityID } from "@application/common/entities/unique-entity-id";
import { Category } from "@application/domain/categories/entities/category";
import { Product } from "@application/domain/products/entities/product";
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
    
    
    return Product.create(
      {
        name,
        category: Category[category],
        description,
        price: Number(price),
        image,
        deleted,
      },
      new UniqueEntityID(id)
    );
  }

  static toPrisma(product: Product) {
    return {
      id: product.id.toString(),
      name: product.name,
      category: product.category.toString().toUpperCase() as CategoryPrisma,
      description: product.description,
      price: new Decimal(product.price),
      image: product.image,
      deleted: product.deleted,
    };
  }
}
