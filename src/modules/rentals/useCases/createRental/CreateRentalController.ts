import { container } from "tsyringe";
import { Request, Response } from "express";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

class CreateRentalController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { carId, expectedReturnDate } = request.body;
        const { id } = request.user;

        const createRentalUseCase = container.resolve(CreateRentalUseCase);

        const rental = await createRentalUseCase.execute({
            carId,
            userId: id,
            expectedReturnDate
        });

        return response.status(201).json(rental);
    }
}

export { CreateRentalController };