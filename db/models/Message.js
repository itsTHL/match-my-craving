import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const messageSchema = new Schema({
  text: { type: String },
  Room: { type: [Schema.Types.ObjectId], ref: "Room" },
  RoomId: { type: String },
});

const Message = models.Message || model("Message", messageSchema);

export default Message;
