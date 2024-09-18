import { Client } from "../../../domain/client-entity";
import { CreateClientDTO } from "@application/clients/application/ports/repositories/dtos/client-dto";

export interface IClientRepository {
  findById(id: string): Promise<Client | null>;
  findByCpf(cpf: string): Promise<Client | null>;
  create(data: CreateClientDTO): Promise<Client>;
}
