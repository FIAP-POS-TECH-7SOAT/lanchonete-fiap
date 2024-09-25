import { IClientService } from '@application/domain/clients/application/use-case/Iclient-use-case';

import { IClientRepository } from '../ports/repositories/Iclient-repository';
import { Client } from '../../entities/client-entity';

export class ClientServiceImpl implements IClientService {
  constructor(private clientRepository: IClientRepository) {}

  async findById(id: string): Promise<Client | null> {
    return await this.clientRepository.findById(id);
  }
  async findByCpf(cpf: string): Promise<Client | null> {
    return await this.clientRepository.findByCpf(cpf);
  }
}
