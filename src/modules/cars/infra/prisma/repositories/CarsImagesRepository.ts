import { CarImage } from "@modules/cars/entities/CarImage";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";

import { prisma } from "@shared/infra/prisma";

class CarsImagesRepository implements ICarsImagesRepository {
    async create(carId: string, imageName: string): Promise<CarImage> {
        const carImage = new CarImage();

        Object.assign(carImage, {
            carId,
            imageName
        });

        await prisma.carsImages.create({
            data: carImage
        });

        return carImage;
    }
}

export { CarsImagesRepository };