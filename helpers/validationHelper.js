class ValidationHelper {
  validateIngredients(ingredients, recipe) {
    const invalidIngredients = [];
    recipe.ingredients.forEach(ingredient => {
      if(!ingredients.some(i=> ingredient.id == i._id)) invalidIngredients.push(ingredient.id);
    });
    return invalidIngredients;
  }
}

module.exports = ValidationHelper