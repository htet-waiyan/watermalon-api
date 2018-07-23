import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class RecipeDto {
    @ApiModelProperty()
    name: string;

    @ApiModelProperty()
    description: string;

    @ApiModelProperty({isArray: true, type: String})
    kitchenwares: string[];

    @ApiModelProperty({isArray: true, type: String})
    ingredients: string[];

    @ApiModelProperty({isArray: true, type: String})
    directions: string[];

    @ApiModelPropertyOptional()
    whenToTry?: string;

    @ApiModelPropertyOptional()
    dateAdded?: string;

    @ApiModelPropertyOptional()
    shoppingList?: string;

    @ApiModelPropertyOptional()
    photo?: string;
}