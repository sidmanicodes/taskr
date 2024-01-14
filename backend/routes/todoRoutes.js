const genericRoutes = require("./genericRoutes");
const todoController = require("../controllers/todoController");

module.exports = genericRoutes(todoController);
