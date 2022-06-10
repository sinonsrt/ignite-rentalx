import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    car_id,
    expected_date,
    user_id,
  }: ICreateRentalDTO): Promise<Rental> {
    // Should not be able to create a new rent if the car is already rent
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );
    if (carUnavailable) {
      throw new AppError("Car is unavailable!");
    }

    // Should not be able to create a new rent if the user has any rent
    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for user!");
    }

    // Rent should need to have a min duration of 24 hours
    const dateNow = this.dateProvider.dateNow();
    const compare = this.dateProvider.compareInHours(dateNow, expected_date);
    const hasMin24Hours = compare < 24;

    if (hasMin24Hours) {
      throw new AppError("Invalid return time!");
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_date,
    });

    await this.carsRepository.updateAvailable(car_id, false);

    return rental;
  }
}

export { CreateRentalUseCase };
