import dbConnect from "../../../../db/connect";
import Room from "../../../../db/models/Room";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "POST") {
    const roomData = request.body;
    const newRoom = await Room.create(roomData);
    console.log("new Room: ", newRoom);

    response.status(200).json(newRoom);
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
