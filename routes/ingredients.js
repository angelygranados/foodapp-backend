const express = require("express");
const IngredientsService = require("../services/ingredients.js");

function ingredientsApi(app) {
  const router = express.Router();
  app.use("/api", router);

  const ingredientsService = new IngredientsService();

  router.get("/ingredients/", async function (req, res, next) {
    try {
      const ingredients = await ingredientsService.getIngredients();
      res.status(200).json({
        data: {
          totalRecords: ingredients.length,
          ingredients: ingredients
        },
        message: "Ingredients listed",
      });
    } catch (err) {
      next(err);
    }
  });

  router.get("/ingredients/:ingredientId", async function (req, res, next) {
    const { ingredientId } = req.params;
    try {
      const ingredient = await ingredientsService.getIngredient({ ingredientId });
      if(ingredient=== null) {
        res.status(404).json({
          error: "Not Found Error",
          message: "Ingredient not found"
        })
      } else {
        res.status(200).json({
          data: ingredient,
          message: "Ingredient retrieved",
        });
      }
      
    } catch (err) {
      next(err);
    }
  });

  router.post("/ingredients/", async function (req, res, next) {
    const { body: ingredient } = req;
    try {
      const createIngredientId = await ingredientsService.createIngredient({ ingredient });
      res.status(201).json({
        data: createIngredientId,
        message: "Ingredient created",
      });
    } catch (err) {
      next(err);
    }
  });

  router.put("/ingredients/:ingredientId", async function (req, res, next) {
    const { ingredientId } = req.params;
    const { body: ingredient } = req;
    try {
      const updatedIngredientId = await ingredientsService.updateIngredient({ ingredientId, ingredient });
      res.status(200).json({
        data: updatedIngredientId,
        message: "Ingredient updated",
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete("/ingredients/:ingredientId", async function (req, res, next) {
    const { ingredientId } = req.params;
    try {
      const deletedIngredientId = await ingredientsService.deleteIngredient({ ingredientId });
      res.status(200).json({
        data: deletedIngredientId,
        message: "Ingredient deleted",
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = ingredientsApi;