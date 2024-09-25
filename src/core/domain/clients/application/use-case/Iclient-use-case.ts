import { Client } from '../../entities/client-entity';

export interface IClientService {
  findById(id: string): Promise<Client | null>;
  findByCpf(cpf: string): Promise<Client | null>;
}
