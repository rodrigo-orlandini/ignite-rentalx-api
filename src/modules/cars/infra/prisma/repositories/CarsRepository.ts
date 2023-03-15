import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import { Car } from "@modules/cars/entities/Car";

import { prisma } from "@shared/infra/prisma";

class CarsRepository implements ICarsRepository {
    async create({ 
        name, description, dailyRate, licensePlate, brand, categoryId, fineAmount, specifications
    }: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            name,
            description,
            dailyRate,
            licensePlate,
            brand,
            fineAmount,
            categoryId
        });

        specifications.map(async (spec) => {
            await prisma.specificationsCars.create({
                data: {
                    car: {
                        connectOrCreate: {
                            create: car,
                            where: { licensePlate }
                        }
                    },
                    specification: {
                        connectOrCreate: {
                            create: spec,
                            where: { id: spec.id }
                        }
                    }
                }
            });
        });

        return car;
    }

    async findByLicensePlate(licensePlate: string): Promise<Car> {
        const car = await prisma.cars.findUnique({
            where: { licensePlate }
        });

        return car;
    }

    async findAvailable(name?: string, brand?: string, categoryId?: string): Promise<Car[]> {
        // TODO implement a query builder
        
        const cars = await prisma.cars.findMany({
            where: {
                OR: [{
                    available: true,
                    name,
                    brand,
                    categoryId
                }]
            }
        });

        return cars;
    }

    async findById(id: string): Promise<Car> {
        const car = await prisma.cars.findUnique({
            where: { id }
        });

        return car;
    }

    async updateAvailable(id: string, available: boolean): Promise<Car> {
        const car = await prisma.cars.update({
            where: { id },
            data: { available }
        });

        return car;
    }
}

export { CarsRepository };