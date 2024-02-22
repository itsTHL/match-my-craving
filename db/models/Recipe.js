import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const recipeSchema = new Schema({
  title: {
    type: String,
    required: [true, "What's this delicious dish called?"],
  },
  comment: { type: String },
  image: { type: String },
  foodPref: { type: String },
});

const Recipe = models.Recipe || model("Recipe", recipeSchema);

export default Recipe;
