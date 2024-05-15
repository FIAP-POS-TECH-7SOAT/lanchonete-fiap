import { Produto } from '@application/produtos/domain/produto';
import { IProdutoRepository } from '../ports/repositories/IProdutoRepository';
import { Categoria } from "@application/categorias/domain/categoria";

interface IRequest {
    id: string;
}
interface IResponse extends Produto{}

export class DeleteProdutoService {
  constructor(

    private produtoRepository: IProdutoRepository,
  ) {}

  public async execute({
    id
  }: IRequest): Promise<IResponse> {
    const produto = await this.produtoRepository.findById(id);
    
    if (!produto){
        throw Error("O produto não foi encontrado!");
    }

    produto.deleted = true;

    await this.produtoRepository.update(produto);

    return produto;
  }
}