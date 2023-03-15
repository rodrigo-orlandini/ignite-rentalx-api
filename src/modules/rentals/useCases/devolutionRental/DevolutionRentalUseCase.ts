import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

import { AppError } from "@shared/errors/AppError";

import { Rental } from "@modules/rentals/entities/Rental";

interface IRequest {
    id: string;
    userId: string;
}

@injectable()
class DevolutionRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute({ id, userId }: IRequest): Promise<Rental> {
        const rental = await this.rentalsRepository.findById(id);
        const car = await this.carsRepository.findById(rental.carId);
        const minimunDaily = 1;

        if(!rental) {
            throw new AppError("Rental does not exists.");
        }

        let daily = this.dateProvider.compareInDays(
            rental.startDate,
            this.dateProvider.dateNow()
        );

        if(daily <= 0 ) {
            daily = minimunDaily
        }

        const dateNow = this.dateProvider.dateNow();
        const delay = this.dateProvider.compareInDays(
            dateNow,
            rental.expectedReturnDate
        );

        let total = 0;
        if(delay > 0) {
            const calculateFine = delay * car.fineAmount;
            total = calculateFine;
        }

        total += daily * car.dailyRate;

        rental.endDate = this.dateProvider.dateNow();
        rental.total = total;

        await this.rentalsRepository.create(rental);
        await this.carsRepository.updateAvailable(car.id, true);

        return rental;
    }
}

export { DevolutionRentalUseCase };