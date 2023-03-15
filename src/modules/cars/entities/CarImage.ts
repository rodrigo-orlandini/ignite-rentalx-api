import { v4 as uuid } from "uuid";

class CarImage {
    id?: string;
    carId: string;
    imageName: string;
    createdAt: Date;

    constructor() {
        if(!this.id) {
            this.id = uuid();
            this.createdAt = new Date();
        }
    }
}

export { CarImage };