import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const roomSchema = new Schema({
  messages: { type: [Schema.Types.ObjectId], ref: "Message" },
});

const Room = models.Room || model("Room", roomSchema);

export default Room;
