import 'reflect-metadata';

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/inMemory/CategoriesRepositoryInMemory";

import { AppError } from '@shared/errors/AppError';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {

    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    });

    it("should be able to create a new category", async () => {
        const category = {
            name: "Category Test",
            description: "Category Description Test"
        }

        await createCategoryUseCase.execute(category);

        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);

        expect(categoryCreated).toHaveProperty("id");
    });

    it("should not be able to create a new category with an existent name", async () => {
        const category = {
            name: "Category Test",
            description: "Category Description Test"
        }

        await createCategoryUseCase.execute(category);

        await expect(createCategoryUseCase.execute(
            category
        )).rejects.toEqual(new AppError("Category already exists."));
    });
});