import { useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function PusherTest() {
  const [roomIdInput, setRoomIdInput] = useState();
  const router = useRouter();
  const { isReady } = router;

  const { data, isLoading, error } = useSWR(`/api/rooms/create`);

  console.log("fetched data on pusherTest: ", data);

  if (!isReady) return <h2>Not ready...</h2>;
  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error!</h2>;

  return (
    <div>
      <button>Join Room</button>
      <div>
        <input type="text" />
      </div>
    </div>
  );
}
