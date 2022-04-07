import { IListCarDTO } from "@modules/cars/dtos/IListCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

class ListCarsUseCase {
  constructor(private carsRepository: ICarsRepository) {}

  async execute({ brand, category_id, name }: IListCarDTO): Promise<Car[]> {
    const cars = await this.carsRepository.listAvailable(
      brand,
      category_id,
      name
    );

    return cars;
  }
}

export { ListCarsUseCase };
