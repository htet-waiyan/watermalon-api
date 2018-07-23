import { Controller, Post, Body } from '@nestjs/common';
import { RecipeDto } from './recipe.dto';
import { RecipeService } from './recipe.service';
import { RecipeModel } from './recipe.model';

@Controller('recipe')
export class RecipeController {
    constructor(
        private readonly recipeService: RecipeService,
    ){}

    @Post()
    public async createNewRecipe(@Body() body: RecipeDto): Promise<RecipeModel> {
        return this.recipeService.create(body);
    }
}
