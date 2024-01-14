const Todo = require("../models/todoSchema");
const genericController = require("./genericController");

module.exports = genericController(Todo);
