import { Order } from '@application/domain/orders/entities/order-entity';
import { OrderRepository } from '../ports/repositories/order-repository';
import { AppError } from '@shared/errors/AppError';
import { OrderProductRepository } from '../ports/repositories/order-product-repository';
import { OrderProductList } from '../../entities/order-products-list';
import { OrderProduct } from '../../entities/order-products';
import { UniqueEntityID } from '@application/common/entities/unique-entity-id';
import { ProductRepository } from '@application/domain/products/application/ports/repositories/IProduct-repository';
import { Product } from '@application/domain/products/entities/product';

interface IRequest {
  id: string;
  products: {
    id: string;
    amount: number;
  }[];
}
interface IResponse {
  order: Order;
}
export class UpdateOrderById {
  constructor(
    private orderRepository: OrderRepository,
    private orderProductRepository: OrderProductRepository,
    private productRepository: ProductRepository,
  ) {}
  async execute({ id, products }: IRequest): Promise<IResponse> {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new AppError('Pedido não existe');
    }

    const allProducts = await this.productRepository.findByIds(
      products.map((item) => item.id),
    );

    if (allProducts.length !== products.length) {
      throw new AppError('Algum produtos invalido, favor refazer a compra');
    }
    const allProductsObj = allProducts.reduce(
      (acc, item) => {
        acc.products[item.id.toString()] = item;
        const product = products.find((prod) => item.id.toString() === prod.id);
        acc.total_amount = product ? item.price * product.amount : 0;

        return acc;
      },
      {} as { products: { [key: string]: Product }; total_amount: number },
    );

    const currentOrderProducts =
      await this.orderProductRepository.findManyByOrderId(id);
    const orderProductList = new OrderProductList(currentOrderProducts);
    const orderProducts = products.map((item) =>
      OrderProduct.create({
        order_id: new UniqueEntityID(id),
        amount: item.amount,
        product_id: new UniqueEntityID(item.id),
        unit_price: allProductsObj.products[item.id].price,
      }),
    );

    orderProductList.update(orderProducts);
    order.products = orderProductList;

    await this.orderRepository.update(order);
    return { order };
  }
}
