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
    const { participants } = matchingSession;
    const combinedRecipes = [];

    participants.map((participant) => {
      participant.recipes.map((recipe) => {
        combinedRecipes.push(recipe);
      });
    });

    if (!matchingSession) {
      return response
        .status(404)
        .json({ status: "Matching session not found" });
    }
    response.status(200).json(matchingSession);
  } else if (request.method === "PATCH") {
    const participantId = request.body.id;

    await MatchingSession.findByIdAndUpdate(
      id,
      {
        $push: { participants: participantId },
      },
      { new: true } // This option indicates that the updated document should be returned. By default, findByIdAndUpdate returns the document as it was before the update. With { new: true }, it ensures that the updated document is returned.
    );

    response.status(200).json({ message: "Participant added to session!" });
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
