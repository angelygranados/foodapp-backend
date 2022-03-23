const express = require("express");
const RecipesService = require("../services/recipes.js");

function recipesApi(app) {
  const router = express.Router();
  app.use("/api/recipes", router);

  const recipesService = new RecipesService();

  router.get("/", async function (req, res, next) {
    try {
      const recipes = await recipesService.getRecipes();
      res.status(200).json({
        data: recipes,
        message: "recipes listed",
      });
    } catch (err) {
      next(err);
    }
  });
  router.get("/:recipeId", async function (req, res, next) {
    const { recipeId } = req.params;
    try {
      const recipe = await recipesService.getRecipe({ recipeId });
      res.status(200).json({
        data: recipe,
        message: "recipe retrieved",
      });
    } catch (err) {
      next(err);
    }
  });
  router.post("/", async function (req, res, next) {
    const { body: recipe } = req;
    try {
      const createRecipeId = await recipesService.createRecipe({ recipe });
      res.status(201).json({
        data: createRecipeId,
        message: "recipe created",
      });
    } catch (err) {
      next(err);
    }
  });
  router.put("/:recipeId", async function (req, res, next) {
    const { recipeId } = req.params;
    const { body: recipe } = req;
    try {
      const updatedRecipeId = await recipesService.updateRecipe({ recipeId, recipe });
      res.status(200).json({
        data: updatedRecipeId,
        message: "recipe updated",
      });
    } catch (err) {
      next(err);
    }
  });
  router.delete("/:recipeId", async function (req, res, next) {
    const { recipeId } = req.params;
    try {
      const deletedRecipeId = await recipesService.deleteRecipe({ recipeId });
      res.status(200).json({
        data: deletedRecipeId,
        message: "recipe deleted",
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = recipesApi;