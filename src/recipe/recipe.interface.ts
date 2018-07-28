import * as mongoose from 'mongoose';

export interface IRecipe {
    readonly name: string;
    readonly description: string;
    readonly kitchenwares: Array<string>;
    readonly ingredients: Array<string>;
    readonly directions: Array<string>;
    readonly whenToTry?: Date;
    readonly dateAdded?: Date;
    readonly shoppingList?: mongoose.Types.ObjectId;
    readonly photo?: string;
}

export interface IRecipePojo {
    name: string;
    description: string;
    kitchenwares: Array<string>;
    ingredients: Array<string>;
    directions: Array<string>;
    createdBy: mongoose.Types.ObjectId;
    whenToTry?: Date;
    dateAdded?: Date;
    shoppingList?: mongoose.Types.ObjectId;
    photo?: string;
}