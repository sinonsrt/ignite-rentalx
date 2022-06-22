import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "../CreateRentalUseCase";
import dayjs from "dayjs";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

const dayAdd24Hours = dayjs().add(1, "day").toDate();

const rentalDateMock = {
  user_id: "1234245",
  car_id: "1234524 ",
  expected_date: new Date(),
};

describe("Create rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      dayjsDateProvider,
      rentalsRepositoryInMemory,
      carsRepositoryInMemory
    );
  });

  it("Should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car Test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should not be able to create a new rental if the car is already rent", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car Test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand",
    });

    await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_date: dayAdd24Hours,
    });

    const alreadyRentCar = createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_date: dayjs().toDate(),
    });

    await expect(alreadyRentCar).rejects.toEqual(
      new AppError("Car is unavailable!")
    );
  });

  it("Should not be able to create a new rental if the user has any rent", async () => {
    const createRental = createRentalUseCase.execute(rentalDateMock);

    await expect(createRental).rejects.toEqual(
      new AppError("Invalid return time!")
    );
  });
});
