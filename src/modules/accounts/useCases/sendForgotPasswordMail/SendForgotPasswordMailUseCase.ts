import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { v4 as uuidv4 } from "uuid";
import auth from "../../../../config/auth";

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dayJsDateProvider: IDateProvider
  ) {}

  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User does not exists!");
    }

    const token = uuidv4();

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date: this.dayJsDateProvider.addHours(
        auth.expires_in_forgot_password_mail
      ),
    });
  }
}

export { SendForgotPasswordMailUseCase };
