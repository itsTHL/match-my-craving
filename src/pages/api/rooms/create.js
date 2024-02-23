import React from "react";
import dbConnect from "../../../../db/connect";

export default async function CreateRoom(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const room = await Room.create();
  }
  response.status(201).json({ status: "Room created!" });
  return <div>CreateRoom</div>;
}
