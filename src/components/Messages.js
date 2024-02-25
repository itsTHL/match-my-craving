import { pusherClient } from "@/lib/pusher";
import { useEffect, useState } from "react";

export default function Messages({ existingMessages, roomId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    pusherClient.subscribe(roomId);

    pusherClient.bind("incoming-message", (text) => {
      setMessages((prev) => [...prev, text]);
    });

    return () => {
      pusherClient.unsubscribe(roomId);
    };
  }, [roomId]);

  return (
    <div>
      {existingMessages.length !== 0
        ? existingMessages.map((message) => (
            <p key={message._id}>{message.text}</p>
          ))
        : null}
      {messages.map((text, i) => (
        <p key={i}>{text}</p>
      ))}
    </div>
  );
}
