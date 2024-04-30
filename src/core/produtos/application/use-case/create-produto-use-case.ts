import { Produto } from '@application/produtos/domain/produto';
import { IProdutoRepository } from '../ports/repositories/IProdutoRepository';

interface IRequest {
    nome: string;
    categoria: Categoria;
    preco: number,
    descricao: string,
    imagem: string
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
    descricao,
    imagem
  }: IRequest): Promise<IResponse> {
    const produto = await this.produtoRepository.create({
      nome,
      categoria,
      preco,
      descricao,
      imagem
    });

    return produto;
  }
}