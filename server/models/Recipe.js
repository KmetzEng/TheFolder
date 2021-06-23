const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    recipeTitle: {
        type: String,
        required: true
    },
    recipeURL: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: false,
    },
    tags: [{
        type: String,
        required: false
    }],
    cuisineType: {
        type: String,
        required: false
    },
    mealType: {
        type: String,
        required: false
    }
});

const Recipe = mongoose.model('Recipe', RecipeSchema)
module.exports = Recipe;