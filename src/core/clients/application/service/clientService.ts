import {
  Client,
  CreateClientDTO,
} from "@application/clients/domain/clientEntity";
import { IClientRepository } from "../ports/repositories/ClientRepository";
import { IClientService } from "@application/clients/application/service/IclientService";

export class ClientServiceImpl implements IClientService {
  constructor(private clientRepository: IClientRepository) {}

  async findById(id: string): Promise<Client | null> {
    return await this.clientRepository.findById(id);
  }
  async findByEmail(email: string): Promise<Client | null> {
    return await this.clientRepository.findByEmail(email);
  }
  async findByCpf(cpf: string): Promise<Client | null> {
    return await this.clientRepository.findByCpf(cpf);
  }
  async create(data: CreateClientDTO): Promise<Client> {
    return await this.clientRepository.create(data);
  }
}
