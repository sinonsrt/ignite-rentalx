import { inject, injectable } from "tsyringe";

import { IRequest } from "../../dtos/IUpdateUserAvatarDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    user.avatar = avatar_file;

    await this.usersRepository.create(user);
  }
}
export { UpdateUserAvatarUseCase };
