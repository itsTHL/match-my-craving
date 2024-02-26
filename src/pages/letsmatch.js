import { useState } from "react";
import { useRouter } from "next/router";

export default function SLetsMatch() {
  const [roomId, setRoomId] = useState();
  const router = useRouter();
  const { id } = router.query;
  console.log("is this the user id in URL? ", id);

  async function createRoom() {
    // event.preventDefault();

    // const formData = new FormData(event.target);
    // const newRoom = Object.fromEntries(formData);

    const response = await fetch(`/api/matchingsessions/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(null),
    });

    if (response.ok) {
      // event.target.reset();
      console.log("response: ", response);

      router.push(`${response.url}`);

      // router.push(`/room/${roomId}`);
    } else {
      console.error("Matching session not started, try again");
    }
  }

  // async function joinRoom(roomId) {
  //   router.push(`/room/${roomId}`);
  // }

  return (
    <form>
      <input
        type="text"
        name="roomId"
        id="roomId"
        onChange={({ target }) => setRoomId(target.value)}
      />
      <button type="button" onClick={createRoom}>
        Create Room
      </button>
    </form>
  );
}
