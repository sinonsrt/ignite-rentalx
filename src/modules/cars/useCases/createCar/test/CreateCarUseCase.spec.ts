import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "../CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: ICarsRepository;

describe("Create a new car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("Should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Car name",
      description: "Car description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Test Brand",
      category_id: "category",
    });

    expect(car).toHaveProperty("id");
  });

  it("Should not be able to create a car with exists license_plate", async () => {
    await createCarUseCase.execute({
      name: "Car name",
      description: "Car description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Test Brand",
      category_id: "category",
    });

    const createdCar = createCarUseCase.execute({
      name: "Car 2 name",
      description: "Car 2 description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Test Brand",
      category_id: "category",
    });

    await expect(createdCar).rejects.toEqual(
      new AppError("Car already exists")
    );
  });

  it("Should be created a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car available name",
      description: "Car available description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Test available brand",
      category_id: "available category",
    });

    expect(car).toHaveProperty("available");
    expect(car.available).toBe(true);
  });
});
