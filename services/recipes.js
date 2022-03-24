const MongoLib = require("../lib/mongo");

class RecipesService {
  constructor() {
    this.collection = "recipes";
    this.mongoDB = new MongoLib();
  }

  async getRecipes() {
    const recipes = await this.mongoDB.getAll(this.collection);
    recipes.forEach(recipe => {
        recipe.ingredients = recipe.ingredients.length
    });
    return recipes || [];
  }

  async getRecipe({ recipeId }) {
    const recipe = await this.mongoDB.get(this.collection, recipeId);
    return recipe || null;
  }

  async createRecipe({ recipe }) {
    const ingredients = await this.mongoDB.getAll("ingredients");
    const invalidIngredients = [];
    recipe.ingredients.forEach(ingredient => {
      if(!ingredients.some(i=> ingredient.id == i._id)) invalidIngredients.push(ingredient.id)
    })
    if(invalidIngredients.length == 0) {
      const createdRecipeId = await this.mongoDB.create(this.collection, recipe);
      return JSON.stringify(createdRecipeId);
    } else {
      return invalidIngredients;
    }
    
  }

  async updateRecipe({ recipeId, recipe } = {}) {
    const updatedRecipeId = await this.mongoDB.update(
      this.collection,
      recipeId,
      recipe
    );
    return updatedRecipeId;
  }

  async deleteRecipe({ recipeId }) {
    const deletedRecipeId = await this.mongoDB.delete(this.collection, recipeId);
    return deletedRecipeId;
  }

}

module.exports = RecipesService;