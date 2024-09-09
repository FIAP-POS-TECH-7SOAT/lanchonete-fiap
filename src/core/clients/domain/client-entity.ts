import { Entity } from "@shared/entities/entity";

export interface IClient {
  id: string;
  name: string;
  email: string;
  cpf: string;
  status: boolean;
  created_at: Date;
}

export class Client extends Entity<IClient> {
  constructor(props: IClient, id?: string) {
    super(props, id);
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string{
    return this.props.name;
  }
  public get email(): string{
    return this.props.email;
  }

  public get cpf(): string{
    return this.props.cpf;
  }

  public get status(): boolean {
    return this.props.status;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }
}
