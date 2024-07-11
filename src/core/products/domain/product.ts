import { Category } from "@application/categories/domain/category";
import { Entity } from "@shared/entities/entity";
import { env } from "@shared/env";

export interface IProduct {
  name: string;
  category: Category;
  price: number;
  description: string;
  image: string;
  deleted: boolean;
}

export class Product extends Entity<IProduct> {
  constructor(props: IProduct, id?: string) {
    super(props, id);
  }

  //getters
  public get id(): string {
    return this._id;
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
