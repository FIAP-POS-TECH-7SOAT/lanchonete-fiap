import { Produto } from '@application/produtos/domain/produto';
import { IProdutoRepository } from '../ports/repositories/IProdutoRepository';
import { Categoria } from "@application/categorias/domain/categoria";

interface IRequest {
    nome: string;
    categoria: Categoria;
    preco: number,
    descricao: string
}
interface IResponse extends Produto{}

export class CreateProdutoService {
  constructor(

    private produtoRepository: IProdutoRepository,
  ) {}

  public async execute({
    nome,
    categoria,
    preco,
    descricao
  }: IRequest): Promise<IResponse> {
    const produto = await this.produtoRepository.create({
      nome,
      categoria,
      preco,
      descricao
    });

    return produto;
  }
}