import { Controller, Post, Body } from '@nestjs/common';
import { RecipeDto } from './recipe.dto';
import { RecipeService } from './recipe.service';
import { RecipeModel } from './recipe.model';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('recipe')
export class RecipeController {
    constructor(
        private readonly recipeService: RecipeService,
    ){}

    @Post()
    @ApiOperation({
        title: 'Create Recipe',
        description: `Create Recipe`,
    })
    @ApiResponse({ status: 201, description: `Recipe created successfully.`})
    @ApiResponse({ status: 401, description: `Unauthorized access.`})
    @ApiResponse({ status: 400, description: `Recipe data not provided.`})
    public async createNewRecipe(@Body() body: RecipeDto): Promise<RecipeModel> {
        return this.recipeService.create(body);
    }
}
