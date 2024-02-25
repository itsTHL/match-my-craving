import MessageField from "@/components/MessageField";
import Messages from "@/components/Messages";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function MatchingSession() {
  const router = useRouter();
  const { id } = router.query;
  console.log("what is the room id? ", id);

  const {
    data: matchingSession,
    isLoading,
    error,
  } = useSWR(`/api/matchingsessions/${id}`);

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error!</h2>;

  const { messages: existingMessages } = matchingSession;
  console.log("Do we have messages? ", existingMessages);

  return (
    <>
      <h1>Hello, we in the room Id page</h1>
      <Messages existingMessages={existingMessages} roomId={id} />
      <MessageField roomId={id} />
    </>
  );
}
