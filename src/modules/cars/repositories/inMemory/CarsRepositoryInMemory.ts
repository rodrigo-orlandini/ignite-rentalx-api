import { Car } from "@modules/cars/entities/Car";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];

    async create(props: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, props);

        this.cars.push(car);

        return car;
    }

    async findByLicensePlate(licensePlate: string): Promise<Car> {
        const car = this.cars.find((car) => car.licensePlate === licensePlate);

        return car;
    }

    async findAvailable(name?: string, brand?: string, categoryId?: string): Promise<Car[]> {
        const availableCars = this.cars
            .filter((car) => {
                if(
                    car.available ||
                    (name && car.name === name) ||
                    (brand && car.brand === brand) ||
                    (categoryId && car.categoryId === categoryId)
                ) {
                    return car;
                }
                
                return null;
            });

        return availableCars;
    }

    async findById(id: string): Promise<Car> {
        const car = this.cars.find((car) => car.id === id);

        return car;
    }

    async updateAvailable(id: string, available: boolean): Promise<Car> {
        const car = this.cars.find((car) => car.id === id);

        car.available = available;

        return car;
    }
}

export { CarsRepositoryInMemory };