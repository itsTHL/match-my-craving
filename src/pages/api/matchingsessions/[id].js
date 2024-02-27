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

    const { participants } = matchingSession;
    console.log("participants here?", participants);

    const combinedRecipes = [];

    participants.map((participant) => {
      participant.recipes.map((recipe) => {
        combinedRecipes.push(recipe);
      });
    });

    console.log("combined recipes: ", combinedRecipes);

    if (!matchingSession) {
      return response
        .status(404)
        .json({ status: "Matching session not found" });
    }
    response.status(200).json(matchingSession);
  }
  if (request.method === "PATCH") {
    console.log("req body: ", request.body);
    const participantData = request.body;
    const { id: newParticipantId } = participantData;
    console.log(newParticipantId);

    await MatchingSession.findByIdAndUpdate(id, {
      $push: { participants: newParticipantId },
    });
    //   { new: true } // This option indicates that the updated document should be returned. By default, findByIdAndUpdate returns the document as it was before the update. With { new: true }, it ensures that the updated document is returned.
    // );
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
