import "reflect-metadata";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "./ListCarsUseCase";

let carsRepository: ICarsRepository;

let listCarsUseCase: ListCarsUseCase;

describe("List cars", () => {
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        listCarsUseCase = new ListCarsUseCase(carsRepository);
    });

    it("should be able to list all available cars", async () => {
        const car = await carsRepository.create({
            name: "Car Test",
            description: "Car Description Test",
            brand: "Car Brand Test",
            fineAmount: 40,
            dailyRate: 100,
            licensePlate: "ABC1234",
            categoryId: "fake-category-id"
        })

        const cars = await listCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by name", async () => {
        const car = await carsRepository.create({
            name: "Car Test",
            description: "Car Description Test",
            brand: "Car Brand Test",
            fineAmount: 40,
            dailyRate: 100,
            licensePlate: "ABC1234",
            categoryId: "fake-category-id"
        })

        const cars = await listCarsUseCase.execute({
            name: "Car Test"
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by brand", async () => {
        const car = await carsRepository.create({
            name: "Car Test",
            description: "Car Description Test",
            brand: "Car Brand Test",
            fineAmount: 40,
            dailyRate: 100,
            licensePlate: "ABC1234",
            categoryId: "fake-category-id"
        })

        const cars = await listCarsUseCase.execute({
            brand: "Car Brand Test"
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by category id", async () => {
        const car = await carsRepository.create({
            name: "Car Test",
            description: "Car Description Test",
            brand: "Car Brand Test",
            fineAmount: 40,
            dailyRate: 100,
            licensePlate: "ABC1234",
            categoryId: "fake-category-id"
        })

        const cars = await listCarsUseCase.execute({
            categoryId: "fake-category-id"
        });

        expect(cars).toEqual([car]);
    });
});