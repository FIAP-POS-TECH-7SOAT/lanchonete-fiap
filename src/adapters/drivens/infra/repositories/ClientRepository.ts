import { IClientRepository } from "@application/user-exemple/application/ports/repositories/IClientRepository";
import { CreateClientDTO } from "@application/user-exemple/application/ports/repositories/dtos/create-client-dto";
import { Client } from "@application/user-exemple/domain/client";

export default class ClientRepository implements IClientRepository {
  findById(id: string): Promise<Client | null> {
    throw new Error("Method not implemented.");
  }
  findByEmail(email: string): Promise<Client | null> {
    throw new Error("Method not implemented.");
  }
  findByCpf(cpf: string): Promise<Client | null> {
    throw new Error("Method not implemented.");
  }
  create(data: CreateClientDTO): Promise<Client> {
    throw new Error("Method not implemented.");
  }
}
