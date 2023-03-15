import { inject, injectable } from "tsyringe";

import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { Rental } from "@modules/rentals/entities/Rental";

injectable()
class ListRentalsByUserUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository
    ) {}

    async execute(userId: string): Promise<Rental[]> {
        const rentalsByUser = await this.rentalsRepository.findByUser(userId);

        return rentalsByUser;
    }
}

export { ListRentalsByUserUseCase };