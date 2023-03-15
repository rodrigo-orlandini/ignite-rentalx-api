import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    carId: string;
    imagesNames: string[];
}

@injectable()
class UploadCarImageUseCase {
    constructor (
        @inject("CarsImagesRepository")
        private carsImagesRepository: ICarsImagesRepository
    ) {}

    async execute({ carId, imagesNames }: IRequest): Promise<void> {
        imagesNames.map(async (image) => {
            await this.carsImagesRepository.create(
                carId, image
            );
        });
    }
}

export { UploadCarImageUseCase };