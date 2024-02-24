import { useState } from "react";
import { useRouter } from "next/router";

export default function PusherTest() {
  const [roomId, setRoomId] = useState();
  const router = useRouter();
  const { id } = router.query;
  console.log("is this the user id in URL? ", id);

  async function createRoom(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const newRoom = Object.fromEntries(formData);

    const response = await fetch(`/api/rooms/${roomId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRoom),
    });

    if (response.ok) {
      event.target.reset();

      router.push(`/room/${roomId}`);
    } else {
      console.error("Room not created, try again");
    }
  }

  // async function joinRoom(roomId) {
  //   router.push(`/room/${roomId}`);
  // }

  return (
    <form onSubmit={createRoom}>
      <input
        type="text"
        name="roomId"
        id="roomId"
        onChange={({ target }) => setRoomId(target.value)}
      />
      <button type="submit">Create Room</button>
    </form>
  );
}
