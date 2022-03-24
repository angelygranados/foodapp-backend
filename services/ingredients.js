const MongoLib = require("../lib/mongo");

class IngredientsService {
  constructor() {
    this.collection = "ingredients";
    this.mongoDB = new MongoLib();
  }

  async getIngredients() {
    const ingredients = await this.mongoDB.getAll(this.collection);
    return ingredients || [];
  }

  async getIngredient({ ingredientId }) {
    const ingredient = await this.mongoDB.get(this.collection, ingredientId);
    return ingredient || null;
  }

  async createIngredient({ ingredient }) {
    const createdIngredientId = await this.mongoDB.create(this.collection, ingredient);
    return createdIngredientId;
  }

  async updateIngredient({ ingredientId, ingredient } = {}) {
    const updatedIngredientId = await this.mongoDB.update(
      this.collection,
      ingredientId,
      ingredient
    );
    return updatedIngredientId;
  }

  async deleteIngredient({ ingredientId }) {
    const deletedIngredientId = await this.mongoDB.delete(this.collection, ingredientId);
    return deletedIngredientId;
  }

}

module.exports = IngredientsService;