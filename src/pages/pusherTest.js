import { useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function PusherTest() {
  const [roomIdInput, setRoomIdInput] = useState();
  const router = useRouter();
  // const { isReady } = router;

  const { data, isLoading, error } = useSWR(`/api/rooms/create`);

  console.log("fetched data on pusherTest: ", data);

  async function joinRoom(roomId) {
    router.push(`/room/${roomId}`);
  }

  // if (!isReady) return <h2>Not ready...</h2>;
  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error!</h2>;

  return (
    <div>
      <div>
        <input
          type="text"
          onChange={({ target }) => setRoomIdInput(target.value)}
        />
      </div>
      <button onClick={() => joinRoom(roomIdInput)}>Join Room</button>
    </div>
  );
}
