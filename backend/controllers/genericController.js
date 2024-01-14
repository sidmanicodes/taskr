const mongoose = require("mongoose");

const genericController = (model) => {
  return {
    // Get all items
    getAll: async (req, res) => {
      try {
        const allItems = await model.find().sort({ createdAt: -1 });
        res.status(200).send(allItems);
      } catch (error) {
        res.status(400).send(error.message);
      }
    },

    // Create new item
    create: async (req, res) => {
      // Validate request
      if (!req.body) {
        return res
          .status(404)
          .send({ message: "Please fill all required fields" });
      }

      // Create new item
      const itemData = req.body;
      console.log(req.body);
      const newItem = new model(itemData);

      // Save item in database
      newItem
        .save()
        .then((data) => res.status(200).send(data))
        .catch((err) =>
          res.status(500).send({
            message:
              err.message || "Something went wrong while creating new item",
          })
        );
    },

    // Update existing item
    update: async (req, res) => {
      // Validate req
      if (!req) {
        return res
          .status(404)
          .set({ message: "Please fill all required fields" });
      }

      // Get item id from req
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
          .status(404)
          .send(`There already exists an item with the id ${id}`);
      }

      // Created updated item
      const updatedItemData = req.body;

      // Save item in database
      model
        .findOneAndUpdate({ _id: id }, updatedItemData, { new: true })
        .then((data) => res.status(200).send(data))
        .catch((err) =>
          res.status(500).send({
            message:
              err.message || "Something went wrong while creating new item",
          })
        );
    },

    // Delete existing item
    delete: async (req, res) => {
      // Validate req
      if (!req) {
        return res
          .status(404)
          .set({ message: "Please fill all required fields" });
      }

      // Get item id from req
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`${id} is an invalid ID`);
      }

      // Save item in database
      model
        .findOneAndDelete({ _id: id })
        .then((data) => res.status(200).send(data))
        .catch((err) =>
          res.status(500).send({
            message:
              err.message ||
              `Something went wrong while deleting item with ID ${id}`,
          })
        );
    },
  };
};

module.exports = genericController;
