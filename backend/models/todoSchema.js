const mongoose = require("mongoose");
const labelSchema = require("./labelSchema");

const todoSchema = new mongoose.Schema(
  {
    label: [{ type: mongoose.Schema.Types.ObjectId, ref: "Label" }],
    task: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, required: true },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
