import { UniqueEntityID } from '@application/common/entities/unique-entity-id';
import { Category } from '@application/domain/categories/entities/category';

import { OrderProduct } from '@application/domain/orders/entities/order-products';
import { Product } from '@application/domain/products/entities/product';

import {
  OrderProduct as OrderProductPrisma,
  Product as ProductPrisma,
  Prisma,
} from '@prisma/client';

export class OrderProductsMapping {
  static toDomain({
    amount,
    id,
    order_id,
    product_id,
    unit_price,
    product,
  }: OrderProductPrisma & { product: ProductPrisma }) {
    return OrderProduct.create(
      {
        amount,
        order_id: new UniqueEntityID(order_id),
        product_id: new UniqueEntityID(product_id),
        unit_price: Number(unit_price),
        product: Product.create(
          {
            name: product.name,
            category: Category[product.category],
            description: product.description,
            price: Number(product.price),
            image: product.image,
          },
          new UniqueEntityID(product.id),
        ),
      },
      new UniqueEntityID(id),
    );
  }

  static toPrismaCreateMany(
    products: OrderProduct[],
  ): Prisma.OrderProductCreateManyArgs {
    const formattedProducts = products.map((item) => ({
      id: item.id.toString(),
      amount: item.amount,
      order_id: item.order_id.toString(),
      product_id: item.product_id.toString(),
      unit_price: item.unit_price,
    }));

    return {
      data: formattedProducts,
    };
  }
}
