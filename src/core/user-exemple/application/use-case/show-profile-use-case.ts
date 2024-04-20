import {AppError} from "@shared/errors/AppError";
import { User } from "@application/user-exemple/domain/user";
import {IUserRepository} from "../ports/repositories/IUserRepository";





interface IRequest {
  user_id: string;
}
export class ShowProfileService {
  constructor(
    private userRepository: IUserRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found');
    }

    return user;
  }
}

