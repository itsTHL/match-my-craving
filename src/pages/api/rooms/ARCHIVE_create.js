import dbConnect from "../../../../db/connect";
import Room from "../../../../db/models/Room";

export default async function CreateRoom(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const room = await Room.create();
    response.status(201).json({ status: "Room created!" });
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
