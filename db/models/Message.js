import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const messageSchema = new Schema({
  text: { type: String },
  room: { type: String },
  roomId: { type: String },
});

const Message = models.Message || model("Message", messageSchema);

export default Message;
