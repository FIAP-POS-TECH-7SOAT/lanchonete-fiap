import { Client } from "src/core/clients/domain/client-entity";

export class ClientMapping {
  static toView({ id, name, email, cpf }: Client) {
    return {
      id,
      name,
      email,
      cpf,
    };
  }
}
