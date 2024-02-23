import { pusherClient } from "@/lib/pusher";
import { useEffect, useState } from "react";

export default function Messages({ initialMessages, roomId }) {
  const [incomingMessages, setIncomingMessages] = useState([]);

  useEffect(() => {
    pusherClient.subscribe(roomId);

    pusherClient.bind("incoming-message", (text) => {
      setIncomingMessages((prev) => [...prev, text]);
    });

    return () => {
      pusherClient.unsubscribe(roomId);
    };
  }, [roomId]);

  return (
    <div>
      {initialMessages.map((message) => (
        <p key={message.id}>{message.text}</p>
      ))}
      {incomingMessages.map((text, i) => (
        <p key={i}>{text}</p>
      ))}
    </div>
  );
}
