import { container } from "tsyringe";
import { Request, Response } from "express";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

class CreateCarSpecificationController {
    async handler(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { specificationsId } = request.body;

        const createCarSpecificationUseCase = container.resolve(CreateCarSpecificationUseCase);

        const cars = await createCarSpecificationUseCase.execute({
            carId: id,
            specificationsId
        });

        return response.json({ cars });
    }
}

export { CreateCarSpecificationController };