import React from "react";

const TestEventPage = () => {
  const triggerTestEvent = async () => {
    // Send a POST request to the API route with test event data
    const response = await fetch("/api/test-event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "Test message" }),
    });

    // Log the response from the server
    console.log("Server response:", response);
  };

  return (
    <div>
      <h1>Test Event Page</h1>
      <button onClick={triggerTestEvent}>Trigger Test Event</button>
    </div>
  );
};

export default TestEventPage;
