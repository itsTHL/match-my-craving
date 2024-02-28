// pages/api/test-event.js

export default function handler(req, res) {
  if (req.method === "POST") {
    const eventData = req.body;

    // Handle the test event data
    console.log("Received test event:", eventData);

    // Respond with a success message
    res.status(200).json({ message: "Test event received successfully" });
  } else {
    // Respond with a method not allowed error
    res.status(405).json({ message: "Method not allowed" });
  }
}
