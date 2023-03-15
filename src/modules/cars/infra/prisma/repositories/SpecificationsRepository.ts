import { prisma } from "@shared/infra/prisma";

import { Specification } from "@modules/cars/entities/Specification";

import { ICreateSpecificationDTO, ISpecificationsRepository } from "../../../repositories/ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
    async create({ description, name }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description
        });

        await prisma.specifications.create({
            data: specification
        });

        return specification;
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await prisma.specifications.findUnique({
            where: { name }
        });

        return specification;
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = await prisma.specifications.findMany({
            where: {
                id: {
                    in: ids
                }
            }
        });

        return specifications;
    }
}

export { SpecificationsRepository };