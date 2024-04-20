import { User } from '@application/user-exemple/domain/user';
import { IUserRepository } from '../ports/repositories/IUserRepository';
import { IHashProvider } from '../ports/providers/IHashProvider';
import { AppError } from '@shared/errors/AppError';



interface IRequest {
  name:string;  
  email:string;
  password:string;
}
interface IResponse extends Omit<User,'password'>{}



export class CreateUserService {
  constructor(

    private userRepository: IUserRepository,

    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
  }: IRequest): Promise<IResponse> {
    const checkUserEmailExists = await this.userRepository.findByEmail(email);


    if (checkUserEmailExists) {
      throw new AppError('Email address alredy exist');
    }
    const passwordHashed = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: passwordHashed,
    });

    // delete user.password;
    return user;
  }
}

