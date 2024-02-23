import { pusherServer } from "@/lib/pusher";
import dbConnect from "../../../../db/connect";
import Message from "../../../../db/models/Message";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "POST") {
    const { text, roomId } = await request.json();

    pusherServer.trigger(roomId, "incoming-message", text);

    await Message.create({
      data: {
        text,
        chatRoomId: roomId,
      },
    });
  }
}
