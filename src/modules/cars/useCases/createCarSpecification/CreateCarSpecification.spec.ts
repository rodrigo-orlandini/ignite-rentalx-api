import "reflect-metadata";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

import { AppError } from "@shared/errors/AppError";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/inMemory/SpecificationRepositoryInMemory";

let carsRepositoryInMemory: ICarsRepository;
let specificationsRepositoryInMemory: ISpecificationsRepository;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe("Create car specification", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory = new SpecificationRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory, 
            specificationsRepositoryInMemory
        );
    });

    it("should be able to add a new specification to the car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car Test",
            description: "Car Description Test",
            brand: "Car Brand Test",
            fineAmount: 40,
            dailyRate: 100,
            licensePlate: "ABC1234",
            categoryId: "fake-category-id"
        });

        const specification = await specificationsRepositoryInMemory.create({
            description: "test",
            name: "test"
        });

        const specificationsId = [specification.id];
        
        const specificationsCars = await createCarSpecificationUseCase.execute({
            carId: car.id,
            specificationsId
        });

        expect(specificationsCars).toHaveProperty("specifications");
        expect(specificationsCars.specifications.length).toBe(1);             
    });

    it("should not be able to add a new specification to a non-existent car", async () => {
        const carId = "1234";
        const specificationsId = ["4321"];
        
        await expect(createCarSpecificationUseCase.execute({
            carId, 
            specificationsId
        })).rejects.toEqual(new AppError("Car not found."));
    });
});