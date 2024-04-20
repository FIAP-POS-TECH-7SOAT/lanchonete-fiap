import { Entity } from "@shared/entities/entity"

export interface IUser {
  name: string,
  email:string,
  password:string
}

export class User extends Entity<IUser>{
  constructor(
    props: IUser,
    id?: string,
  ) {
    super(props, id)
  }

  public get id(): string {
    return this._id
  };


  public get name(): string {
    return this.props.name
  };
  public get email(): string {
    return this.props.email
  };

  public get password(): string {
    return this.props.password
  };

}







