import dbConnect from "../../../db/connect";
import User from "../../../db/models/User";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const user = await User.findById(id).populate("recipes");
    console.log("found user is: ", user);

    if (!user) {
      return response.status(404).json({ status: "User not found" });
    }

    return response.status(200).json(user);
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
