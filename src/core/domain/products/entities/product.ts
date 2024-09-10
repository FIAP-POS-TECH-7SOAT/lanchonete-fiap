import { Category } from "@application/domain/categories/entities/category";
import { Entity } from "@application/common/entities/entity";
import { env } from "@shared/env";
import { UniqueEntityID } from "@application/common/entities/unique-entity-id";
import { Optional } from "@application/common/entities/optional";

export interface ProductProps {
  name: string;
  category: Category;
  price: number;
  description: string;
  image: string;
  deleted: boolean;
}

export class Product extends Entity<ProductProps> {
  constructor(props: ProductProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(
    props: Optional<ProductProps,'deleted'|'image'>,
    id?: UniqueEntityID,
  ) {
    const product = new Product(
      {
        ...props,
        deleted:false,
        image:''
      },
      id,
    )
    return product
  }
  public get name(): string {
    return this.props.name;
  }
  public get category(): Category {
    return this.props.category;
  }

  public get price(): number {
    return this.props.price;
  }

  public get description(): string {
    return this.props.description;
  }

  public get image(): string {
    return this.props.image? env.APP_URL + "/" + this.props.image:"";
  }

  public get deleted(): boolean {
    return this.props.deleted;
  }

  //setters
  public set name(name: string) {
    this.props.name = name;
  }

  public set category(category: Category) {
    this.props.category = category;
  }

  public set price(price: number) {
    this.props.price = price;
  }

  public set description(description: string) {
    this.props.description = description;
  }

  public set image(image: string) {
    this.props.image = image;
  }

  public set deleted(deleted: boolean) {
    this.props.deleted = deleted;
  }
}
