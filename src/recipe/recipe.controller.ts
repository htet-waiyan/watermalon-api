import { Controller, Post, Get, Body, Param, Put, Req, Delete, HttpException } from '@nestjs/common';
import { RecipeDto } from './recipe.dto';
import { RecipeService } from './recipe.service';
import { RecipeModel } from './recipe.model';
import { ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { IRecipe } from './recipe.interface';

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
    @ApiBearerAuth()
    public async createNewRecipe(@Req() req, @Body() body: RecipeDto): Promise<RecipeModel> {
        return this.recipeService.create(req.userInfo.id, body);
    }

    @Put(':id')
    @ApiOperation({
        title: 'Update Recipe',
        description: 'Update Recipe',
    })
    @ApiResponse({ status: 201, description: `Recipe updated successfully.`})
    @ApiResponse({ status: 401, description: `Unauthorized access.`})
    @ApiResponse({ status: 400, description: `Recipe data not provided.`})
    @ApiBearerAuth()
    public async updateRecipe(@Param('id') id: string, @Req() req, @Body() recipe: RecipeDto): Promise<RecipeModel> {
        return this.recipeService.update(id, req.userInfo.id, recipe);
    }

    @Get()
    @ApiOperation({
        title: 'Find Recipe',
        description: 'Find Recipe by logged in userid',
    })
    @ApiResponse({ status: 200, description: `Recipes found for this user`})
    @ApiResponse({ status: 404, description: `No recipes found for this user`})
    @ApiBearerAuth()
    public async getAllRecipesByUser(@Req() req): Promise<RecipeModel[]> {
        return await this.recipeService.findbyUserId(req.userInfo.id);
    }

    @Get(':id')
    @ApiOperation({
        title: 'Find Recipe',
        description: 'Find Recipe by ID',
    })
    @ApiResponse({ status: 200, description: `Recipes found for this ID`})
    @ApiResponse({ status: 404, description: `No recipes not found`})
    @ApiBearerAuth()
    public async getRecipeById(@Param('id') id): Promise<RecipeModel[]> {
        const foundRecipe: IRecipe[] = await this.recipeService.findbyId(id);
        if (foundRecipe && foundRecipe.length === 0) throw new HttpException('Recipe Not Found', 404);

        return foundRecipe;
    }

    @Delete(':id')
    @ApiOperation({
        title: 'Delete Recipe',
        description: 'Delete Recipe by ID',
    })
    @ApiResponse({ status: 201, description: `Recipe has been deleted`})
    @ApiResponse({ status: 404, description: `No recipes found for this user`})
    @ApiBearerAuth()
    public async deleteRecipeById(@Param('id') id): Promise<any> {
        return this.recipeService.deleteById(id);
    }
}
