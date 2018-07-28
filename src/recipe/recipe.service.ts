import { Model, Types } from 'mongoose';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RecipeModel } from './recipe.model';
import { RecipeDto } from './recipe.dto';
import { IRecipePojo, IRecipe } from './recipe.interface';

@Injectable()
export class RecipeService {
    constructor(
        @InjectModel('Recipe') private readonly recipeModel: Model<RecipeModel>,
    ){}

    private validateRecipe(recipe: RecipeDto) {
        if (!recipe) throw new HttpException('No recipe data was provided', 400);

        if (!recipe.name) throw new HttpException('Recipe name is required', 400);
        if (recipe.description.length > 150)
          throw new HttpException('Recipe description cannot be exceeded more than 150 characters', 400);
    }

    public async create(userId: string, recipe: RecipeDto): Promise<RecipeModel> {
        this.validateRecipe(recipe);

        const recipePojo = {} as IRecipePojo;
        Object.keys(recipe).map((key, index) => {
            recipePojo[key] = recipe [key];
        });
        recipePojo.createdBy = Types.ObjectId(userId);

        logger.info('Creating new recipe', recipePojo);
        return await this.recipeModel.create(recipePojo);
    }

    public async update(id: string, userId: string, recipe: RecipeDto): Promise<RecipeModel> {
        this.validateRecipe(recipe);

        const recipePojo = {} as IRecipePojo;
        Object.keys(recipe).map((key, index) => {
            recipePojo[key] = recipe[key];
        });
        recipePojo.createdBy = Types.ObjectId(userId);

        const updatedRecipe = await this.recipeModel.findByIdAndUpdate(id, recipePojo, {new: true});

        logger.info('Recipe has been updated %o', updatedRecipe);
        return updatedRecipe;
    }

    public async findbyUserId(userId: string): Promise<RecipeModel[]> {
        logger.info('Finding recipes for ' + userId);

        const foundRecipes: IRecipe[] = await this.recipeModel.find(
            {createdBy: userId},
        );

        return foundRecipes;
    }
}
