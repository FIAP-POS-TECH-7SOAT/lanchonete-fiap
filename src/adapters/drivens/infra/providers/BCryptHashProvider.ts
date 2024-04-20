import {IHashProvider} from '@application/user-exemple/application/ports/providers/IHashProvider';
import { hash, compare } from 'bcrypt';


export class BCryptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}


