import { Entity } from "@application/common/entities/entity";
import { UniqueEntityID } from "@application/common/entities/unique-entity-id";

export interface IClient {
  name: string;
  email: string;
  cpf: string;
  status: boolean;
  created_at: Date;
}

export class Client extends Entity<IClient> {
  constructor(props: IClient, id?: UniqueEntityID) {
    super(props, id);
  }

  public get name(): string {
    return this.props.name;
  }
  public get email(): string {
    return this.props.email;
  }

  public get cpf(): string {
    return this.props.cpf;
  }

  public get status(): boolean {
    return this.props.status;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }
}
