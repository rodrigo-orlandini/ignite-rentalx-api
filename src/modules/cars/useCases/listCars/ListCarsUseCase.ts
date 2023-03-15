import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

interface IRequest {
    categoryId?: string;
    name?: string;
    brand?: string;
}

@injectable()
class ListCarsUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}

    async execute({ categoryId, name, brand }: IRequest): Promise<Car[]> {
        const cars = await this.carsRepository.findAvailable(name, brand, categoryId);

        return cars;
    }
}

export { ListCarsUseCase };