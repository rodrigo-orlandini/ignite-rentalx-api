import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
    private rentals: Rental[] = [];

    async create({ carId, userId, expectedReturnDate }: ICreateRentalDTO): Promise<Rental> {
        const rental = new Rental();

        Object.assign(rental, {
            carId,
            userId,
            expectedReturnDate,
            startDate: new Date()
        });

        this.rentals.push(rental);

        return rental;
    }

    async findOpenRentalByCar(carId: string): Promise<Rental> {
        const rental = this.rentals.find(rental => rental.carId === carId && !rental.endDate);
        
        return rental;
    }

    async findOpenRentalByUser(userId: string): Promise<Rental> {
        const rental = this.rentals.find(rental => rental.userId === userId && !rental.endDate);
        
        return rental;
    }

    async findById(id: string): Promise<Rental> {
        const rental = this.rentals.find(rental => rental.id === id);

        return rental;
    }

    async findByUser(userId: string): Promise<Rental[]> {
        const rental = this.rentals.filter(rental => rental.userId === userId);

        return rental;
    }
}

export { RentalsRepositoryInMemory };