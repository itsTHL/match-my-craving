import dbConnect from "../../../db/connect";
import Message from "../../../../db/models/Message";

export default async function handler(request, response) {
  await dbConnect();
  // const { id } = request.query;

  if (request.method === "GET") {
    const message = await Message.find();

    if (!message) {
      return response.status(404).json({ status: "No Messages found" });
    }

    response.status(200).json(message);
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
