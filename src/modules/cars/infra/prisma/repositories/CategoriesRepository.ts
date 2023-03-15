import { prisma } from "../../../../../shared/infra/prisma";

import { Category } from "@modules/cars/entities/Category";

import { ICategoriesRepository, ICreateCategoryDTO } from "../../../repositories/ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = new Category();

        Object.assign(category, {
            name, 
            description
        });

        await prisma.categories.create({
            data: category
        });
    }

    async list(): Promise<Category[]> {
        const categories = await prisma.categories.findMany();
        
        return categories;
    }

    async findByName(name: string): Promise<Category> {
        const category = await prisma.categories.findUnique({
            where: { name }
        });

        return category;
    }
}

export { CategoriesRepository };