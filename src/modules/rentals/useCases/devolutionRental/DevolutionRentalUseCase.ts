import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IDevolutionRentalDTO } from "@modules/rentals/dtos/IDevolutionRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({ id, user_id }: IDevolutionRentalDTO): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(id);
    const minimumDaily = 1;

    if (!rental) {
      throw new AppError("Rental doesn't exists!");
    }

    const dateNow = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareInDays(rental.start_date, dateNow);
    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_date
    );

    if (daily <= 0) {
      daily = minimumDaily;
    }

    let total = 0;

    if (delay > 0) {
      const calculate_fine = delay * car.fine_amount;

      total = calculate_fine;
    }

    total += daily * car.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };
