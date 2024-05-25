import { Client } from "@application/clients/domain/client-entity";
import { CreateClientDTO } from "@application/clients/application/ports/repositories/dtos/client-dto";

export interface IClientService {
  findById(id: string): Promise<Client | null>;
  findByEmail(email: string): Promise<Client | null>;
  findByCpf(cpf: string): Promise<Client | null>;
  create(data: CreateClientDTO): Promise<Client>;
}
