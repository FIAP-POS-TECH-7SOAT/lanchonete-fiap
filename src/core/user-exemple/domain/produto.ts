import { Decimal } from "@prisma/client/runtime/library"
import { Entity } from "@shared/entities/entity"

export class Pedido extends Entity<Pedido>{
  constructor(
    props: Pedido,
    id?: string,
  ) {
    super(props, id)
  }

  public get id(): string {
    return this._id
  };

//   (nome, categoria, preço, descrição e imagens)
  public get nome(): string {
    return this.props.nome
  };
  public get categoria(): Categoria {
    return this.props.categoria
  };

  public get preco(): number {
    return this.props.preco
  };

  public get descricao(): string {
    return this.props.descricao
  };

  public get imagem(): string {
    return this.props.imagem
  };
}







