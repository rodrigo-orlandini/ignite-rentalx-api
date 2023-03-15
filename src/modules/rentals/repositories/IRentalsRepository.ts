import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../entities/Rental";

interface IRentalsRepository { 
    findOpenRentalByCar(carId: string): Promise<Rental>;
    findOpenRentalByUser(userId: string): Promise<Rental>;
    findById(id: string): Promise<Rental>;
    findByUser(userId: string): Promise<Rental[]>;
    create({ carId, userId, expectedReturnDate }: ICreateRentalDTO): Promise<Rental>;
}

export { IRentalsRepository };