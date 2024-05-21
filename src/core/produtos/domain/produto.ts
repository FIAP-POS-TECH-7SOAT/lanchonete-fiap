import { Categoria } from "@application/categorias/domain/categoria"
import { Entity } from "@shared/entities/entity"
import { env } from "@shared/env"

export interface IProduto {
    nome: string,
    categoria:Categoria,
    preco: number,
    descricao: string,
    imagem: string,
    deleted: boolean
  }

export class Produto extends Entity<IProduto>{
    constructor(
        props: IProduto,
        id?: string,
    ) {
        super(props, id)
    }

    //getters
    public get id(): string {
        return this._id
    };

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
        return env.APP_URL + "/files/" + this.props.imagem
    };

    public get deleted(): boolean {
        return this.props.deleted
    };

    //setters
    public set nome(nome: string) {
        this.props.nome = nome
    };

    public set categoria(categoria: Categoria){
        this.props.categoria = categoria
    };

    public set preco(preco: number) {
        this.props.preco = preco
    }

    public set descricao(descricao: string){
        this.props.descricao = descricao
    }

    public set imagem(imagem: string){
        this.props.imagem = imagem
    }

    public set deleted(deleted: boolean){
        this.props.deleted = deleted
    }
}