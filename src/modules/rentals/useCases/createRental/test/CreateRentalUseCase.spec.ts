import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "../CreateRentalUseCase";
import dayjs from "dayjs";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
const dayAdd24Hours = dayjs().add(1, "day").toDate();

const rentalDateMock = {
  user_id: "1234245",
  car_id: "1234524 ",
  expected_date: new Date(),
};

const rentalMock = {
  user_id: "1234245",
  car_id: "1234524 ",
  expected_date: dayAdd24Hours,
};

describe("Create rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it("Should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute(rentalMock);

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should not be able to create a new rental if the car is already rent", async () => {
    await createRentalUseCase.execute(rentalMock);

    expect(async () => {
      await createRentalUseCase.execute(rentalMock);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new rental if the user has any rent", async () => {
    expect(async () => {
      await createRentalUseCase.execute(rentalDateMock);
    }).rejects.toBeInstanceOf(AppError);
  });
});
