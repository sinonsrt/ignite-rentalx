import { ICreateCarImageDTO } from "@modules/cars/dtos/ICreateCarImageDTO";
import { ICarsImageRepository } from "@modules/cars/repositories/ICarsImageRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImageRepository")
    private carsImageRepository: ICarsImageRepository
  ) {}

  async execute({ car_id, images_name }: ICreateCarImageDTO): Promise<void> {
    images_name.map(async (image) => {
      await this.carsImageRepository.create(car_id, image);
    });
  }
}

export { UploadCarImagesUseCase };
