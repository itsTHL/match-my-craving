import Messages from "@/components/Messages";
import MessageField from "@/components/MessageField";
import { useRouter } from "next/router";
import useSWR from "swr";

export default async function RoomPage() {
  const router = useRouter();
  const { id: roomId } = router.query;

  const { data: existingMessages } = useSWR(`/api/rooms/${roomId}`);

  console.log("fetched data inside room: ", data);

  // const existingMessages = await Message.findMany({
  //   where: {
  //     chatRoomId: roomId,
  //   },
  // });

  const serializedMessages = existingMessages.map((message) => ({
    text: message.text,
    id: message.id,
  }));

  return (
    <div>
      <h1>hello</h1>
      <p>messages:</p>
      <Messages roomId={roomId} initialMessages={serializedMessages} />
      <MessageField roomId={roomId} />
    </div>
  );
}
