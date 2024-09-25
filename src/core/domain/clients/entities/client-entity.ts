import { Entity } from '@application/common/entities/entity';
import { Optional } from '@application/common/entities/optional';
import { UniqueEntityID } from '@application/common/entities/unique-entity-id';

export interface ClientProps {
  name: string;
  email: string;
  cpf: string;
  status: boolean;
  created_at: Date;
}

export class Client extends Entity<ClientProps> {
  static create(
    props: Optional<ClientProps, 'created_at'>,
    id?: UniqueEntityID,
  ) {
    const client = new Client(
      {
        ...props,
        created_at: props.created_at ?? new Date(),
      },
      id,
    );
    return client;
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
