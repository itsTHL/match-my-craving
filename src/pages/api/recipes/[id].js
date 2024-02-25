import dbConnect from "../../../../db/connect";
import Recipe from "../../../../db/models/Recipe";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;

  console.log("id in api-recipe-id: ", id);

  if (request.method === "GET") {
    const recipe = await Recipe.findById(id);
    console.log("found recipe is: ", recipe);

    if (!recipe) {
      return response.status(404).json({ status: "Recipe not found" });
    }

    response.status(200).json(recipe);
  } else if (request.method === "PUT") {
    await Recipe.findByIdAndUpdate(id, {
      $set: request.body,
    });
    return response
      .status(200)
      .json({ status: "Product successfully updated." });
  }
}
