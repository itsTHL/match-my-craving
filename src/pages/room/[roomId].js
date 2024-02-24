import MessageField from "@/components/MessageField";
import Messages from "@/components/Messages";
import { useRouter } from "next/router";

export default function RoomId() {
  const router = useRouter();
  const { id } = router.query;
  console.log("what is the room id? ", id);

  const initialMessages = [
    { _id: "123", text: "Hello, hello 1" },
    { _id: "456", text: "Hello, hello 2" },
  ];

  // const roomId = "0911";

  return (
    <>
      <h1>Hello, we in the room Id page</h1>
      <Messages initialMessages={initialMessages} roomId={id} />
      <MessageField />
    </>
  );
}
