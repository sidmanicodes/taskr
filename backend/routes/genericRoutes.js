const express = require("express");
const router = express.Router();

const genericRoute = (controller) => {
  // Get all items
  router.get("/", controller.getAll);

  // Create new item
  router.post("/", controller.create);

  // Update item
  router.put("/:id", controller.update);

  // Delete item
  router.delete("/:id", controller.delete);

  return router;
};

module.exports = genericRoute;
