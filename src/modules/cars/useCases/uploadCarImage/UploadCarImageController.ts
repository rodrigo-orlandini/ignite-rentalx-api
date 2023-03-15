import { Response, Request } from "express";
import { container } from "tsyringe";
import { UploadCarImageUseCase } from "./UploadCarImageUseCase";

interface IFiles {
    filename: string;
}

class UploadCarImageController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const images = request.files as IFiles[];

        const imagesNames = images.map(file => file.filename);
        
        const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase);

        await uploadCarImageUseCase.execute({
            carId: id,
            imagesNames
        });

        return response.status(201).send();
    }
}

export { UploadCarImageController };