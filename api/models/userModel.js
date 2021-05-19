const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
    },
    avtarUrl: {
      type: String,
    },
    todos: [
      {
        type: Schema.Types.ObjectId,
        ref: "TODOS",
      },
    ],
  },
  { collection: "USERS" },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

module.exports = mongoose.model("USERS", UserSchema);
