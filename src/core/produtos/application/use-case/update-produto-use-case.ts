import { Produto } from '@application/produtos/domain/produto';
import { IProdutoRepository } from '../ports/repositories/IProdutoRepository';
import { Categoria } from "@application/categorias/domain/categoria";

interface IRequest {
    id: string;
    nome: string;
    categoria: Categoria;
    preco: number,
    descricao: string,
    imagem: string
}
interface IResponse extends Produto{}

export class UpdateProdutoService {
  constructor(

    private produtoRepository: IProdutoRepository,
  ) {}

  public async execute({
    id,
    nome,
    categoria,
    preco,
    descricao,
    imagem,
  }: IRequest): Promise<IResponse> {
    const produto = await this.produtoRepository.findById(id);
    
    if (!produto){
        throw Error("O produto não foi encontrado!");
    }

    produto.nome = nome || produto.nome;
    produto.descricao = descricao || produto.descricao;
    produto.preco = preco || produto.preco;
    produto.categoria = categoria || produto.categoria;
    produto.imagem = imagem || produto.imagem;
    
    await this.produtoRepository.update(produto);

    return produto;
  }
}