import { Specification } from "../entities/Specification";

interface ICreateCarDTO {
    name: string;
    description: string;
    dailyRate: number;
    licensePlate: string;
    fineAmount: number;
    brand: string;
    categoryId: string;
    specifications?: Specification[];
}

export { ICreateCarDTO };