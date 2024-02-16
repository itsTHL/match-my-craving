import mongoose from "mongoose";
import Recipe from "./Recipe";

const { Schema, models, model } = mongoose;

const userSchema = new Schema({
  user: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  recipes: { type: [Schema.Types.ObjectId], ref: "Recipe" },
});

const User = models.User || model("User", userSchema);

export default User;
