import { pusherServer } from "@/lib/pusher";
import dbConnect from "../../../db/connect";
import Message from "../../../db/models/Message";
import MatchingSession from "../../../db/models/MatchingSession";
import useSWR from "swr";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "POST") {
    const messageData = request.body;
    const newMessage = await Message.create(messageData);
    console.log("new Message: ", newMessage);

    const matchingSessionId = newMessage.matchingSessionId;
    console.log("ms id: ", matchingSessionId);

    pusherServer.trigger(
      matchingSessionId,
      "incoming-message",
      newMessage.text
    );

    await MatchingSession.findByIdAndUpdate(
      matchingSessionId,
      {
        $push: { messages: newMessage._id },
      },
      { new: true }
    );
    response.status(201).json({ status: "Message added" });
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
