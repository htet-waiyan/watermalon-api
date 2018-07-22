import * as mongoose from 'mongoose';

export const ShoppingList = new mongoose.Schema({
    shoppingItem: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ShoppingListItem' }],
    created: Date,
});
export const ShoppingListItem = new mongoose.Schema({
    description: String,
    quantity: { type: String, default: 1 },
    completed: Boolean,
});