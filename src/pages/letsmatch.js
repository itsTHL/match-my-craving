import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function LetsMatch() {
  const [roomId, setRoomId] = useState();
  const { data: session, status } = useSession();
  console.log("session in lets match is: ", session);

  const router = useRouter();

  if (status === "loading") {
    return null;
  }

  async function createMatchingSession() {
    const creatorId = session?.user?.id;
    console.log("Creator? ", creatorId);
    // event.preventDefault();

    // const formData = new FormData(event.target);
    // const newRoom = Object.fromEntries(formData);

    const response = await fetch(`/api/matchingsessions/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        creator: creatorId,
        participants: [creatorId],
      }),
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

  async function joinMatchingSession(roomId) {
    const id = session?.user?.id;
    const response = await fetch(`/api/matchingsessions/${roomId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });

    if (response.ok) {
      console.log("response: ", response);

      router.push(`/matchingsessions/${roomId}`);
    } else {
      console.error(
        "Matching session could not be found, do you have the correct id?"
      );
    }
  }

  return (
    <form>
      <input
        type="text"
        name="roomId"
        id="roomId"
        onChange={({ target }) => setRoomId(target.value)}
      />
      <button type="button" onClick={() => joinMatchingSession(roomId)}>
        Join Matching Session
      </button>
      <button type="button" onClick={createMatchingSession}>
        Start Matching Session
      </button>
    </form>
  );
}
