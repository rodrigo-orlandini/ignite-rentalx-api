import { injectable, inject } from "tsyringe";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";
import { Car } from "@modules/cars/entities/Car";

@injectable()
class CreateCarUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}

    async execute({ 
        name, description, dailyRate, licensePlate, fineAmount, brand, categoryId 
    }: ICreateCarDTO): Promise<Car> {
        const carPlateAlreadyExists = await this.carsRepository.findByLicensePlate(licensePlate);

        if(carPlateAlreadyExists) {
            throw new AppError("Car with this plate already exists");
        }

        const car = await this.carsRepository.create({
            name,
            description,
            dailyRate,
            licensePlate,
            fineAmount,
            brand,
            categoryId
        });

        return car;
    }
}

export { CreateCarUseCase };