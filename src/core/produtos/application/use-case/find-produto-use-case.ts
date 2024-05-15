import { Produto } from '@application/produtos/domain/produto';
import { IProdutoRepository } from '../ports/repositories/IProdutoRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
    id: string;
}
interface IResponse extends Produto{}

export class FindProdutoService {
  constructor(

    private produtoRepository: IProdutoRepository,
  ) {}

  public async execute({
    id
  }: IRequest): Promise<IResponse> {
    const produto = await this.produtoRepository.findById(id);

    if (!produto) {
      throw new AppError("Product not find.");
    }

    return produto;
  }
}