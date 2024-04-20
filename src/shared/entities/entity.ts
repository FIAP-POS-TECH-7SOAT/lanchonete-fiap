import { randomUUID } from "crypto";

type Replace<T, R> = Omit<T, keyof R> & R;

interface IEntity {
  createdAt:Date;
  updatedAt:Date;
}
export class Entity<T> {
  protected _id: string;
  protected props: IEntity & T

  constructor(
    props: Omit<Replace<T, { createdAt?: Date }>, 'updatedAt'>,
    id?: string,
  ) {

    this._id = id ?? randomUUID();

    this.props = {
      ...props,
      createdAt: id ? props.createdAt : new Date(),
      updatedAt: new Date(),
    } as IEntity & T

  }
}
