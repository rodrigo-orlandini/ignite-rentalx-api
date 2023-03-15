import { v4 as uuid } from "uuid";
import { Specification } from "./Specification";

class Car {
    id?: string;
    name: string;
    description: string;
    dailyRate: number;
    available: boolean;
    licensePlate: string;
    fineAmount: number;
    brand: string;
    createdAt: Date;
    categoryId: string;
    specifications?: Specification[];

    constructor() {
        if(!this.id) {
            this.id = uuid();
            this.available = true;
            this.createdAt = new Date();
        }
    }
}

export { Car };