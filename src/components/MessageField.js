import { useState } from "react";

export default function MessageField({ roomId }) {
  const [input, SetInput] = useState();

  async function sendMessage(text) {
    try {
      await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, roomId }),
      });
    } catch (error) {
      // Handle error
      console.error("Error sending message:", error);
    }
  }

  return (
    <div>
      type a new message:
      <input onChange={({ target }) => SetInput(target.value)} type="text" />
      <button onClick={() => sendMessage(input || "")}>send</button>
    </div>
  );
}
