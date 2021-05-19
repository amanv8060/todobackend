const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let toDoSchema = new Schema(
  {
    taskName: {
      type: String,
    },
    description: {
      type: String,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    dueDate: {
      type: Date,
    },
  },
  { collection: "TODOS" },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

module.exports = mongoose.model("TODOS",toDoSchema);
