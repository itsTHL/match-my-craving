import { pusherServer } from "@/lib/pusher";
import dbConnect from "../../../db/connect";
import Message from "../../../db/models/Message";
import Room from "../../../db/models/Room";
import useSWR from "swr";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;
  console.log("is this the room id? ", request.query);

  if (request.method === "POST") {
    const messageData = request.body;
    const newMessage = await Message.create(messageData);
    console.log("new Message: ", newMessage);

    const messageId = newMessage._id;
    console.log("msg id: ", messageId);

    pusherServer.trigger(id, "incoming-message", newMessage.text);
    // this id needs to be the channel-name = roomId

    await Room.findByIdAndUpdate(
      id,
      {
        $push: { message: newMessage._id },
      },
      { new: true }
    );
    response.status(201).json({ status: "Message added" });
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
