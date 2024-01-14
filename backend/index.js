const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const labelRoutes = require("./routes/labelRoutes");
const todoRoutes = require("./routes/todoRoutes");

// Configure environment
dotenv.config();

// Get CRUD functions from todo controller
// const {
//   getTodos,
//   createTodo,
//   updateTodo,
//   deleteTodo,
// } = require("./controllers/todoController");

// Get CRUD functions from label controller
// const {
//   getLabels,
//   createLabel,
//   updateLabel,
//   deleteLabel,
// } = require("./controllers/labelController");

// Create Express app
const app = express();

const port = process.env.PORT || 8000;
const connectionURL = process.env.MONGO_URI;

// Mount middlewares
app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB config
mongoose
  .connect(connectionURL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });

// Mount routes as middleware
app.use("/api/todos", todoRoutes);
app.use("/api/labels", labelRoutes);

// // Label API endpoints
// const labelsEndpoint = "/labels";

// // Get
// app.get(labelsEndpoint, getLabels);

// // Create
// app.post(labelsEndpoint, createLabel);

// // Update
// app.patch(labelsEndpoint + "/:id", updateLabel);

// // Delete
// app.delete(labelsEndpoint + "/:id", deleteLabel);

// // -------------------------------

// // Todo API endpoints
// const todosEndpoint = "/todos";

// // Get
// app.get(todosEndpoint, getTodos);

// // Create
// app.post(todosEndpoint, createTodo);

// // Update
// app.patch(todosEndpoint + "/:id", updateTodo);

// // Delete
// app.delete(todosEndpoint + "/:id", deleteTodo);
