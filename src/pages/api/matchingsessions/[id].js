import MatchingSession from "../../../../db/models/MatchingSession";
import User from "../../../../db/models/User";
import dbConnect from "../../../../db/connect";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const matchingSession = await MatchingSession.findById(id).populate(
      "participants"
    );
    console.log("found matching session is: ", matchingSession);

    if (!matchingSession) {
      return response
        .status(404)
        .json({ status: "Matching session not found" });
    }
    response.status(200).json(matchingSession);
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
