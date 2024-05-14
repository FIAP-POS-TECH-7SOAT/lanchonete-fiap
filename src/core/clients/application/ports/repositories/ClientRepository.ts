import { Client } from "../../../domain/clientEntity";
import { CreateClientDTO } from "@application/clients/application/ports/repositories/dtos/clientDTO";

export interface IClientRepository {
  findById(id: string): Promise<Client | null>;
  findByEmail(email: string): Promise<Client | null>;
  findByCpf(cpf: string): Promise<Client | null>;
  create(data: CreateClientDTO): Promise<Client>;
}
