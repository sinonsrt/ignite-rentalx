import { AppError } from "../../../../../errors/AppError";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "../AuthenticateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

const user: ICreateUserDTO = {
  driver_license: "T3ST3",
  email: "user@test.com",
  password: "1234",
  name: "Test User",
};

describe("Should be able to authenticate user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("Should be able to get a token", async () => {
    await createUserUseCase.execute(user);

    const auth = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    console.log({ auth });

    expect(auth).toHaveProperty("token");
  });

  it("Should not be able to authenticate a nonexistent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: user.email,
        password: user.password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to authenticate a incorrect password", async () => {
    await createUserUseCase.execute(user);

    expect(async () => {
      await authenticateUserUseCase.execute({
        email: user.email,
        password: "incorrect-password",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
