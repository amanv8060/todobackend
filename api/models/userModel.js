const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let UserSchema = new Schema(
  { 
    
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
      default:
        "https://cdn.jsdelivr.net/gh/park-e/cdn@latest/Icons/profile.svg",
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
