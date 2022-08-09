import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { SendForgotPasswordMailUseCase } from "../SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepository: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepository,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("Should be able to send a forgot mail", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepository.create({
      driver_license: "366586",
      email: "jenuh@rinukmov.ki",
      name: "Dorothy Watts",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("jenuh@rinukmov.ki");

    expect(sendMail).toHaveBeenCalledTimes(1);
  });

  it("Should not be able to send mail with user doesn't exists", async () => {
    const sendForgotMail =
      sendForgotPasswordMailUseCase.execute("jenuh@rinukmov.ki");

    expect(sendForgotMail).rejects.toThrowError(AppError);
  });

  it("Should be able to create an users token", async () => {
    const generateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      "create"
    );

    await usersRepository.create({
      driver_license: "46586",
      email: "test@rinukmov.ki",
      name: "Dorothy Watts",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("test@rinukmov.ki");

    expect(generateTokenMail).toBeCalledTimes(1);
  });
});
