import dbConnect from "../../../../db/connect";
import Recipe from "../../../../db/models/Recipe";
import User from "../../../../db/models/User";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;

  if (request.method === "GET") {
    const recipe = await Recipe.findById(id);

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
  } else if (request.method === "DELETE") {
    await Recipe.findByIdAndDelete(id);

    response.status(260).json("Recipe deleted");
    return response.status(200).json(products);
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
