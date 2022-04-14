import { ICreateCarSpecificationDTO } from "@modules/cars/dtos/ICreateCarSpecificationDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";
// import { inject, injectable } from "tsyringe";

// @injectable()
class CreateCarSpecificationUseCase {
  constructor(
    // @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    private specificationsRepository: ISpecificationRepository
  ) {}

  async execute({
    car_id,
    specifications_ids,
  }: ICreateCarSpecificationDTO): Promise<void> {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new AppError("Cars does not exists!");
    }

    const specifications = await this.specificationsRepository.findByIds(
      specifications_ids
    );

    carExists.specifications = specifications;

    await this.carsRepository.create(carExists);

    console.log(carExists);
  }
}

export { CreateCarSpecificationUseCase };
