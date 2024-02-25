import dbConnect from "../../../../db/connect";
import Recipe from "../../../../db/models/Recipe";
import User from "../../../../db/models/User";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;
  console.log("request query: ", request.query);

  if (request.method === "GET") {
    const user = await User.findById(id).populate("recipes");
    console.log("found user is: ", user);

    if (!user) {
      return response.status(404).json({ status: "User not found" });
    }

    response.status(200).json(user);
  } else if (request.method === "POST") {
    console.log("id: ", request.query);
    const recipeData = request.body;
    const newRecipe = await Recipe.create(recipeData);
    console.log("new Recipe: ", newRecipe);

    await User.findByIdAndUpdate(
      id,
      {
        $push: { recipes: newRecipe._id },
      },
      { new: true } // This option indicates that the updated document should be returned. By default, findByIdAndUpdate returns the document as it was before the update. With { new: true }, it ensures that the updated document is returned.
    );
    response.setHeader("Location", `/myrecipes/${newRecipe._id}`);
    response.status(302).end();
    response.status(201).json({ status: "Recipe added!" });
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
