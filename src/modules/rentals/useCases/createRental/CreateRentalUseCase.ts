import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}

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
    const expectedReturnDateFormat = dayjs(expected_date)
      .utc()
      .local()
      .format();
    const dateNow = dayjs().utc().local().format();
    const compare = dayjs(expectedReturnDateFormat).diff(dateNow, "hours");
    const hasMin24Hours = compare < 24;

    console.log({ dateNow, expectedReturnDateFormat, compare, hasMin24Hours });
    if (hasMin24Hours) {
      throw new AppError("Invalid return time!");
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
