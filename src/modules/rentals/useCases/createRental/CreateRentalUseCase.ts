import { inject, injectable } from "tsyringe";

import { Rental } from "@modules/rentals/entities/Rental";

import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
    userId: string;
    carId: string;
    expectedReturnDate: Date;
}

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,

        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}

    async execute({ userId, carId, expectedReturnDate }: IRequest): Promise<Rental> {
        const minimumCompareHours = 24;

        const rentalOpenToCar = await this.rentalsRepository.findOpenRentalByCar(carId);
        
        if(rentalOpenToCar) {
            throw new AppError("Car is unavailable.");
        }

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(userId);

        if(rentalOpenToUser) {
            throw new AppError("There's a rental in progress for this user.");
        }

        const dateNow = this.dateProvider.dateNow();
        const compare = this.dateProvider.compareInHours(dateNow, expectedReturnDate);

        if(compare < minimumCompareHours) {
            throw new AppError("Invalid return time!")
        }

        const rental = await this.rentalsRepository.create({
            carId,
            userId,
            expectedReturnDate
        });

        await this.carsRepository.updateAvailable(carId, false);

        return rental;
    }
}

export { CreateRentalUseCase };