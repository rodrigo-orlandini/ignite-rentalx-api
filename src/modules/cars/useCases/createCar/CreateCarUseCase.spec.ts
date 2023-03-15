import "reflect-metadata";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Car Name Test",
            description: "Car Description Test",
            dailyRate: 100,
            licensePlate: "ABC-1234",
            fineAmount: 60,
            brand: "Car Brand Test",
            categoryId: "some-category-id"
        });

        expect(car).toHaveProperty("id");
    });

    it("should not be able to create a car with an existent license plate", async () => {
        await createCarUseCase.execute({
            name: "Car Name Test",
            description: "Car Description Test",
            dailyRate: 100,
            licensePlate: "ABC-1234",
            fineAmount: 60,
            brand: "Car Brand Test",
            categoryId: "some-category-id"
        });

        await expect(createCarUseCase.execute({
            name: "Car Name Test 2",
            description: "Car Description Test 2",
            dailyRate: 100,
            licensePlate: "ABC-1234",
            fineAmount: 60,
            brand: "Car Brand Test 2",
            categoryId: "some-category-id-2"
        })).rejects.toEqual(new AppError("Car with this plate already exists"));
    });

    it("should be able to create a car with available true by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Car Available Test",
            description: "Car Available Description Test",
            dailyRate: 100,
            licensePlate: "ABC-1234",
            fineAmount: 60,
            brand: "Car Available Brand Test",
            categoryId: "some-category-id-available"
        });

        expect(car.available).toBeTruthy();
    })
});