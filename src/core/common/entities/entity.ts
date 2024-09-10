import { randomUUID } from "crypto";

type Replace<T, R> = Omit<T, keyof R> & R;

interface IEntity {
  created_at:Date;
  updatedAt:Date;
}
export class Entity<T> {
  protected _id: string;
  protected props: IEntity & T

  constructor(
    props: Omit<Replace<T, { created_at?: Date }>, 'updatedAt'>,
    id?: string,
  ) {

    this._id = id ?? randomUUID();

    this.props = {
      ...props,
      created_at: id ? props.created_at : new Date(),
      updatedAt: new Date(),
    } as IEntity & T

  }
  public get created_at():Date{
    return this.created_at
  }
}
