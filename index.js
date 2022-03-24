const express = require("express");
const cors = require("cors");
const app = express();

const { config } = require("./config/index");
const recipesApi = require("./routes/recipes.js");
const ingredientsApi = require("./routes/ingredients.js");

//bodyparser
app.use(express.json());
app.use(cors());
recipesApi(app);
ingredientsApi(app);

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});