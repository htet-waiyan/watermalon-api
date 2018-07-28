import * as mongoose from 'mongoose';

export const RecipeSchema = new mongoose.Schema({
    name: String,
    description: { type: String, maxlength: 150 },
    kitchenwares: [String],
    ingredients: [String], // temporary
    directions: [String], // temporary
    whenToTry: Date,
    dateAdded: Date,
    shoppingList: { type: mongoose.Schema.Types.ObjectId , ref: 'ShoppingList' },
    photos: [String],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});