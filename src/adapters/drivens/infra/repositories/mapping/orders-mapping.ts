import { Categoria } from "@application/categorias/domain/categoria";
import { Order } from "@application/orders/domain/orderEntity";
import { Produto } from "@application/produtos/domain/produto";
import { Order as OrderPrisma,OrderProduto as OrderProdutoPrisma, Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

type CompleteOrderPrima = OrderPrisma & {
 products:OrderProdutoPrisma[]
}
export class OrderMapping{
    static toDomain({client_id,created_at,id,products,status,canceled_at}:CompleteOrderPrima){
        return new Order({client_id,created_at,products,status,canceled_at:canceled_at}, id);
    }

    static toCreatePrisma(order:Order):Prisma.OrderCreateInput{
        return {
            id:order.id,
            client:{
                connect:{
                    id:order.client_id
                }
            },
            created_at:order.created_at,
            status:order.status,
            canceled_at:order.canceled_at,
            products:{
              create:order.products.map(item=>({
                amount:item.amount,
                produto_id:item.id
              }))
            }
          }
        }
      static toPrisma(order:Order){
        return {
          canceled_at:order.canceled_at,
          created_at:order.created_at,
          status:order.status,
          id:order.id,
          client_id:order.client_id
        }
      }
} 