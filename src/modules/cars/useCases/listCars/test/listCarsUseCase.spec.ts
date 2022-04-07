import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "../listCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it("Should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 1",
      description: "Car description",
      daily_rate: 100,
      license_plate: "FFR-0800",
      fine_amount: 100,
      brand: "Car brand",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({});

    expect(typeof cars).toBe("object");
    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 2",
      description: "Car description",
      daily_rate: 100,
      license_plate: "FFR-0800",
      fine_amount: 100,
      brand: "Car_brand_test",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({ brand: "Car_brand_test" });

    console.log(cars);

    expect(typeof cars).toBe("object");
    expect(cars).toEqual([car]);
  });
});
