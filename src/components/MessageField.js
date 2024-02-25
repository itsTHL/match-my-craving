import { useState } from "react";

export default function MessageField({ roomId }) {
  const [input, setInput] = useState();

  async function sendMessage(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const newMessage = Object.fromEntries(formData);

    const response = await fetch(`/api/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMessage),
    });

    if (response.ok) {
      event.target.reset();
      console.log("event target: ", event.target);
    } else {
      console.error("Message not sent, try again");
    }
  }

  return (
    <form onSubmit={() => sendMessage(input)}>
      <h5>type a new message: </h5>
      <input
        onChange={({ target }) => setInput(target.value)}
        type="text"
        name="text"
        id="text"
      />
      <button type="submit">send</button>
    </form>
  );
}
