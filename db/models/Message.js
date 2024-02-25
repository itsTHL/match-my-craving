import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const messageSchema = new Schema({
  text: { type: String },
  matchingSessionId: { type: String },
});

const Message = models.Message || model("Message", messageSchema);

export default Message;
