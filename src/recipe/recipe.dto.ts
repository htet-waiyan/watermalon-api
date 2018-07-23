export class RecipeDto {
    name: string;
    description: string;
    kitchenwares: Array<string>;
    ingredients: Array<string>;
    directions: Array<string>;
    whenToTry?: Date;
    dateAdded?: Date;
    shoppingList?: string;
    photo?: string;
}