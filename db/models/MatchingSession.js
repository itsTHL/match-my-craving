import mongoose from "mongoose";
import User from "./User";
import Recipe from "./Recipe";

const { Schema, models, model } = mongoose;

const matchingSessionSchema = new Schema({
  // messages: { type: [Schema.Types.ObjectId], ref: "Message" },
  creator: { type: String },
  participants: { type: [Schema.Types.ObjectId], ref: "User" },
});

const MatchingSession =
  models.MatchingSession || model("MatchingSession", matchingSessionSchema);

export default MatchingSession;
