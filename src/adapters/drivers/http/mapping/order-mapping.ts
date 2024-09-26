import { Order } from '@application/domain/orders/entities/order-entity';
import { Product } from '@application/domain/products/entities/product';

export class OrderMapping {
  static toView({
    id,
    products,
    client_id,
    status,
    created_at,
    canceled_at,
    code,
    waitTime,
    total_amount,
  }: Order) {
    const productDatails = (amount: number, product?: Product) => {
      return product
        ? {
            id: product.id.toString(),
            image: product.image,
            name: product.name,
            price: product.price,
            subTotal: amount * product.price,
          }
        : {};
    };
    return {
      id: id.toString(),
      client_id,
      products: products.currentItems.map((product) => ({
        id: product.id.toString(),
        amount: product.amount,
        ...productDatails(product.amount, product.product),
      })),
      total_amount: total_amount,
      status,
      created_at,
      canceled_at,
      code,
      waitTime,
    };
  }
}
