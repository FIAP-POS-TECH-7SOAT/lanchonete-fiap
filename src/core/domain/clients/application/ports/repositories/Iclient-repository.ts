import { Client } from "@application/domain/clients/entities/client-entity";


export interface IClientRepository {
  findById(id: string): Promise<Client | null>;
  findByCpf(cpf: string): Promise<Client | null>;
  create(data: Client): Promise<Client>;
}
