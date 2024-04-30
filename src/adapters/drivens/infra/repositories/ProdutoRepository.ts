import { IProdutoRepository } from "@application/produtos/application/ports/repositories/IProdutoRepository";
import { CreateProdutoDTO } from "@application/produtos/application/ports/repositories/dtos/create-produto-dto";
import { Produto } from "@application/produtos/domain/produto";


export default class ProdutoRepository implements IProdutoRepository {
  findById(id: string): Promise<Produto | null> {
    throw new Error("Method not implemented.");
  }
  findByCategoria(categoria: Categoria): Promise<Produto |null>{
    throw new Error("Method not implemented.");
  }
  async create({nome, categoria, preco, descricao, imagem}: CreateProdutoDTO): Promise<Produto> {
    const produto = new Produto({
        nome,
        categoria,
        preco,
        descricao,
        imagem,
      })
      await prisma.produto.create({
        data:{
          id:produto.id,
          nome:produto.nome,
          categoria:produto.categoria,
          preco: produto.preco,
          descricao: produto.descricao,
          imagem: produto.imagem
        }
      })
  
      return produto
  }

}
