import { ICreateCarSpecificationDTO } from "@modules/cars/dtos/ICreateCarSpecificationDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject } from "tsyringe";

class CreateCarSpecificationUseCase {
  constructor(
    // @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    car_id,
    specifications_id,
  }: ICreateCarSpecificationDTO): Promise<void> {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new AppError("Cars does not exists!");
    }
  }
}

export { CreateCarSpecificationUseCase };
