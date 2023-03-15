import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../entities/Car";

interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<Car>;
    findByLicensePlate(licensePlate: string): Promise<Car>;
    findAvailable(name?: string, brand?: string, categoryId?: string): Promise<Car[]>;
    findById(id: string): Promise<Car>;
    updateAvailable(id: string, available: boolean): Promise<Car>;
}

export { ICarsRepository };