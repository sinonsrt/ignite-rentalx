import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { AuthenticateUserUseCase } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let userTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let dateProvider: DayjsDateProvider;

const user: ICreateUserDTO = {
  driver_license: "T3ST3",
  email: "user@test.com",
  password: "1234",
  name: "Test User",
};

describe("Should be able to authenticate user", () => {
  beforeEach(() => {
    userTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      userTokensRepositoryInMemory,
      dateProvider
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("Should be able to get a token", async () => {
    await createUserUseCase.execute(user);

    const auth = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(auth).toHaveProperty("token");
  });

  it("Should not be able to authenticate a nonexistent user", async () => {
    const authUser = authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    await expect(authUser).rejects.toEqual(
      new AppError("Email or password incorrect!")
    );
  });

  it("Should not be able to authenticate a incorrect password", async () => {
    await createUserUseCase.execute(user);

    const authUser = authenticateUserUseCase.execute({
      email: user.email,
      password: "incorrect-password",
    });

    await expect(authUser).rejects.toEqual(
      new AppError("Email or password incorrect!")
    );
  });
});
