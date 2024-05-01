import { Client } from "../../../domain/client";
import { CreateClientDTO } from "./dtos/create-client-dto";

export interface IClientRepository {
  findById(id: string): Promise<Client | null>;
  findByEmail(email: string): Promise<Client | null>;
  findByCpf(cpf: string): Promise<Client | null>;
  create(data: CreateClientDTO): Promise<Client>;
}
