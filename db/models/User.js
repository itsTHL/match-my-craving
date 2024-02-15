import mongoose from "mongoose";
import Recipe from "./Recipe";

const { Schema } = mongoose;

const userSchema = new Schema({
  user: { type: String, required: true },
  password: { type: String, required: true },
  recipes: { type: [Schema.Types.ObjectId], ref: "Recipe" },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
