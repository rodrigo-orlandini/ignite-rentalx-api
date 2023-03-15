import { Rental } from "@modules/rentals/entities/Rental";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

import { prisma } from "@shared/infra/prisma";

class RentalsRepository implements IRentalsRepository {

    async create({ carId, userId, expectedReturnDate, id, endDate, total }: ICreateRentalDTO): Promise<Rental> {
        const rental = await prisma.rentals.create({
            data: {
                carId,
                userId,
                expectedReturnDate,
                id,
                endDate,
                total
            }
        });

        return rental;
    }

    async findOpenRentalByCar(carId: string): Promise<Rental> {
        const rental = await prisma.rentals.findUnique({
            where: { carId, endDate: null }
        });

        return rental;
    }

    async findOpenRentalByUser(userId: string): Promise<Rental> {
        const rental = await prisma.rentals.findUnique({
            where: { userId, endDate: null }
        });

        return rental;
    }

    findById(id: string): Promise<Rental> {
        const rental = await prisma.rentals.findUnique({
            where: { id }
        });

        return rental;
    }

    findByUser(userId: string): Promise<Rental[]> {
        const rental = await prisma.rentals.findMany({
            where: { userId }
        });

        return rental;
    }
}

export { RentalsRepository };