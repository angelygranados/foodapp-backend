const express = require("express");
const cors = require("cors");
const app = express();

const { config } = require("./config/index");
const recipesApi = require("./routes/recipes.js");
//const usersApi = require("./routes/users.js");
//const usersTasksApi = require("./routes/user_tasks.js");

//bodyparser
app.use(express.json());
app.use(cors());
recipesApi(app);
//usersApi(app);
//usersTasksApi(app);

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});