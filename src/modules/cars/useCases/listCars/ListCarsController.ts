import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCarsUseCase } from "./ListCarsUseCase";

class ListCarsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, brand, categoryId } = request.query;

        const listCarsUseCase = container.resolve(ListCarsUseCase);

        const cars = await listCarsUseCase.execute({
            brand: brand as string,
            name: name as string,
            categoryId: categoryId as string
        });

        return response.json(cars);
    }
}

export { ListCarsController };