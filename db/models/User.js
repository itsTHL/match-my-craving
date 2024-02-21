import mongoose from "mongoose";
import Recipe from "./Recipe";

const { Schema, models, model } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  name: { type: String },
  recipes: { type: [Schema.Types.ObjectId], ref: "Recipe" },
});

const User = models.User || model("User", userSchema);

export default User;
