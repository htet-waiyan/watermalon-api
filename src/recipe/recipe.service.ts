import { Model } from 'mongoose';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RecipeModel } from './recipe.model';
import { RecipeDto } from './recipe.dto';
import { IRecipePojo } from './recipe.interface';

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

    public async create(recipe: RecipeDto): Promise<RecipeModel> {
        this.validateRecipe(recipe);

        const recipePojo = {} as IRecipePojo;
        Object.keys(recipe).map((key, index) => {
            recipePojo[key] = recipe [key];
        });

        logger.info('Creating new recipe', recipePojo);
        return await this.recipeModel.create(recipePojo);
    }
}
