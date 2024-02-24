import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const roomSchema = new Schema({
  roomId: { type: String, required: [true, "Please enter room id."] },
  messages: { type: [Schema.Types.ObjectId], ref: "Message" },
});

const Room = models.Room || model("Room", roomSchema);

export default Room;
