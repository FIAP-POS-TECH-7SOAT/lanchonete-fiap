import { Produto } from '@application/produtos/domain/produto';
import { IProdutoRepository } from '../ports/repositories/IProdutoRepository';
import { AppError } from '@shared/errors/AppError';
import { Categoria } from "@application/categorias/domain/categoria";

interface IRequest {
    categoria: Categoria;
}
interface IResponse extends Array<Produto>{}

export class FindProdutosByCategoriaService {
  constructor(

    private produtoRepository: IProdutoRepository,
  ) {}

  public async execute({
    categoria
  }: IRequest): Promise<IResponse> {
    const produtos = await this.produtoRepository.findManyByCategoria(categoria);

    if (!produtos) {
      throw new AppError("Products not find by Categoria: " + categoria.toString());
    }

    

    return produtos;
  }
}