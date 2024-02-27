import MessageField from "@/components/MessageField";
import Messages from "@/components/Messages";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function MatchingSession() {
  const router = useRouter();
  const { isReady } = router;

  const { id } = router.query;
  console.log("what is the room id? ", id);

  const {
    data: matchingSession,
    isLoading,
    error,
  } = useSWR(`/api/matchingsessions/${id}`);

  if (!isReady) return <h2>Not ready...</h2>;
  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Errorrrrrr!</h2>;

  const { participants: participants } = matchingSession;
  console.log("Do we have participants? ", participants);

  return (
    <>
      <h1>Welcome to the matching session!</h1>
      {/* <Messages existingMessages={existingMessages} roomId={id} />
      <MessageField roomId={id} /> */}
    </>
  );
}
