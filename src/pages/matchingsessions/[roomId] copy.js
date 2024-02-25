import Messages from "@/components/Messages";
import MessageField from "@/components/MessageField";
import { useRouter } from "next/router";
import useSWR from "swr";

// export default async function RoomPage() {
//   const router = useRouter();
//   const { id: roomId } = router.query;

//   const {
//     data: existingMessages,
//     isLoading,
//     error,
//   } = useSWR(`/api/rooms/${roomId}`);

//   if (error) return <h2>Error loading messages</h2>;
//   if (isLoading) return <h2>Loading...</h2>;

//   console.log("fetched data inside room: ", existingMessages);
//   console.log("error:", error);

//   // const existingMessages = await Message.findMany({
//   //   where: {
//   //     chatRoomId: roomId,
//   //   },
//   // });

//   const serializedMessages = Array.isArray(existingMessages)
//     ? existingMessages.map((message) => ({
//         text: message.text,
//         id: message._id,
//       }))
//     : [];

//   return (
//     <div>
//       <h1>hello</h1>
//       <p>messages:</p>
//       <Messages roomId={roomId} initialMessages={serializedMessages} />
//       <MessageField roomId={roomId} />
//     </div>
//   );
// }

export default async function RoomPage() {
  // const router = useRouter();
  // console.log(router);
  // const { id: roomId } = router.query;
  // console.log("roomId is: ", roomId);

  // const { data, isLoading, error } = useSWR(`/api/rooms/${roomId}`);

  // if (error) return <h2>Error loading messages</h2>;
  // if (isLoading) return <h2>Loading...</h2>;

  // console.log("fetched data inside room: ", data);
  // console.log("error:", error);

  // const existingMessages = await Message.findMany({
  //   where: {
  //     chatRoomId: roomId,
  //   },
  // });

  // const serializedMessages = Array.isArray(existingMessages)
  //   ? existingMessages.map((message) => ({
  //       text: message.text,
  //       id: message._id,
  //     }))
  //   : [];

  return (
    <div>
      <h1>hello</h1>
      <p>messages:</p>
      {/* <Messages roomId={roomId} initialMessages={serializedMessages} />
      <MessageField roomId={roomId} /> */}
    </div>
  );
}
