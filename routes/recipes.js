const express = require("express");
const RecipesService = require("../services/recipes.js");
const IngredientsService = require("../services/ingredients.js");

function recipesApi(app) {
  const router = express.Router();
  app.use("/api", router);

  const recipesService = new RecipesService();
  //const ingredientsService = new IngredientsService();

  router.get("/recipes/", async function (req, res, next) {
    try {
      const recipes = await recipesService.getRecipes();
      res.status(200).json({
        data: {
          totalRecords: recipes.length,
          recipes: recipes
        },
        message: "Recipes listed",
      });
    } catch (err) {
      next(err);
    }
  });

  router.get("/recipes/:recipeId", async function (req, res, next) {
    const { recipeId } = req.params;
    try {
      const recipe = await recipesService.getRecipe({ recipeId });
      if(recipe === null) {
        res.status(404).json({
          error: "Not Found Error",
          message: "Recipe not found"
        })
      } else {
        res.status(200).json({
          data: recipe,
          message: "Recipe retrieved",
        });
      }
      
    } catch (err) {
      next(err);
    }
  });

  router.post("/recipes/", async function (req, res, next) {
    const { body: recipe } = req;
    try {
      const createRecipeId = await recipesService.createRecipe({ recipe });
      res.status(201).json({
        data: createRecipeId,
        message: "Recipe created",
      });
    } catch (err) {
      next(err);
    }
  });

  router.put("/recipes/:recipeId", async function (req, res, next) {
    const { recipeId } = req.params;
    const { body: recipe } = req;
    try {
      const updatedRecipeId = await recipesService.updateRecipe({ recipeId, recipe });
      res.status(200).json({
        data: updatedRecipeId,
        message: "Recipe updated",
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete("/recipes/:recipeId", async function (req, res, next) {
    const { recipeId } = req.params;
    try {
      const deletedRecipeId = await recipesService.deleteRecipe({ recipeId });
      res.status(200).json({
        data: deletedRecipeId,
        message: "Recipe deleted",
      });
    } catch (err) {
      next(err);
    }
  });

}

module.exports = recipesApi;