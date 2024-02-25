import dbConnect from "../../../../db/connect";
import MatchingSession from "../../../../db/models/MatchingSession";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "POST") {
    try {
      const matchingSessionData = request.body;

      const newMatchingSession = await MatchingSession.create(
        matchingSessionData
      );
      console.log("new matching Session: ", newMatchingSession);

      response.setHeader(
        "Location",
        `/matchingsessions/${newMatchingSession._id}`
      );
      response.status(302).end();
    } catch (error) {
      console.error("Error creating matching session: ", error);
      return response.status(500).json({ error: "Error creating room" });
    }
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
