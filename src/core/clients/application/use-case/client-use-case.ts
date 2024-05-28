import { Client } from "@application/clients/domain/client-entity";
import { CreateClientDTO } from "@application/clients/application/ports/repositories/dtos/client-dto";
import { IClientRepository } from "../ports/repositories/client-repository";
import { IClientService } from "@application/clients/application/use-case/Iclient-use-case";
import { AppError } from "@shared/errors/AppError";
import { isValidCPF } from "@brazilian-utils/brazilian-utils";

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
    if(!isValidCPF(data.cpf)){
      throw new AppError('CPF invalido')
    }
    return await this.clientRepository.create(data);
  }
}
