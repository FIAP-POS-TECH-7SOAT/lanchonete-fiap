import { UniqueEntityID } from "@application/common/entities/unique-entity-id";

import { OrderProduct } from "@application/domain/orders/entities/order-products";

import { OrderProduct as OrderProductPrisma, Prisma } from "@prisma/client";


export class OrderProductsMapping {
  static toDomain({
    amount,
    id,
    order_id,
    product_id
  }: OrderProductPrisma) {
    return OrderProduct.create(
      { amount, order_id:new UniqueEntityID(order_id), product_id:new UniqueEntityID(product_id) },
      new UniqueEntityID(id)
    );
  }

  static toPrismaCreateMany(
    products: OrderProduct[],
  ): Prisma.OrderProductCreateManyArgs {
 
    const formattedProducts = products.map(item=>({
      id:item.id.toString(),
      amount:item.amount,
      order_id:item.order_id.toString(),
      product_id:item.product_id.toString(),
    }))

    return {

      data: formattedProducts
    }
  }
}
