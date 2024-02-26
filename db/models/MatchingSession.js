import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const matchingSessionSchema = new Schema({
  messages: { type: [Schema.Types.ObjectId], ref: "Message" },
});

const MatchingSession =
  models.MatchingSession || model("MatchingSession", matchingSessionSchema);

export default MatchingSession;
