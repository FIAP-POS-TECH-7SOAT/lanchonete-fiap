import {
  Client,
  CreateClientDTO,
} from "@application/clients/domain/clientEntity";

export interface IClientService {
  findById(id: string): Promise<Client | null>;
  findByEmail(email: string): Promise<Client | null>;
  findByCpf(cpf: string): Promise<Client | null>;
  create(data: CreateClientDTO): Promise<Client>;
}
