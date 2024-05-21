import { Produto } from '@application/produtos/domain/produto';
import { IProdutoRepository } from '../ports/repositories/IProdutoRepository';

interface IRequest {
  id: string,
  imagem: string
}
interface IResponse extends Produto{}

export class UploadProdutoImagemService {
  constructor(

    private produtoRepository: IProdutoRepository,
  ) {}

  public async execute({
    id,
    imagem
  }: IRequest): Promise<IResponse> {
    const produto = await this.produtoRepository.findById(id);
    
    if (!produto){
        throw Error("O produto não foi encontrado!");
    }
    await this.produtoRepository.patchImagem({id, imagem});

    return produto;
  }
}