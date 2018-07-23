import { Document } from 'mongoose';
import { IRecipe } from './recipe.interface';

export type RecipeModel = Document & IRecipe;