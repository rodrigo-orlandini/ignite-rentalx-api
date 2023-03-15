import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { Car } from "@modules/cars/entities/Car";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
    carId: string;
    specificationsId: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,

        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository
    ) {}

    async execute({ carId, specificationsId }: IRequest): Promise<Car> {
        const car = await this.carsRepository.findById(carId);

        if(!car) {
            throw new AppError("Car not found.");
        }

        const specifications = await this.specificationsRepository.findByIds(specificationsId);

        car.specifications = specifications;

        await this.carsRepository.create(car);

        return car;
    }
}

export { CreateCarSpecificationUseCase };