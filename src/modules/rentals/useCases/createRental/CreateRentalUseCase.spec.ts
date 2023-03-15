import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create rental", () => {
    const dayAdd24hours = dayjs().add(1, "day").toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory);
    });

    it("should be able to create a new rental", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Test",
            description: "Car test",
            dailyRate: 100,
            licensePlate: "TEST123",
            brand: "test",
            categoryId: "test",
            fineAmount: 40
        });

        const rental = await createRentalUseCase.execute({
            userId: "some-user-id",
            carId: car.id,
            expectedReturnDate: dayAdd24hours
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("startDate");
    });

    it("should not be able to create a new rental if there is another open to the same user", async () => {
        await rentalsRepositoryInMemory.create({
            userId: "some-user-id",
            carId: "some-car-id-1",
            expectedReturnDate: dayAdd24hours
        });
        
        await expect(createRentalUseCase.execute({
            userId: "some-user-id",
            carId: "some-car-id-2",
            expectedReturnDate: dayAdd24hours
        })).rejects.toEqual(new AppError("Car is unavailable."));
    });

    it("should not be able to create a new rental if there is another open to the same car", async () => {
        await rentalsRepositoryInMemory.create({
            userId: "some-user-id-1",
            carId: "some-car-id",
            expectedReturnDate: dayAdd24hours
        });
        
        await expect(createRentalUseCase.execute({
            userId: "some-user-id-2",
            carId: "some-car-id",
            expectedReturnDate: dayAdd24hours
        })).rejects.toEqual(new AppError("There's a rental in progress for this user."));
    });
});