import dbConnect from "../../../db/connect";

export default function handler(req, res) {
  dbConnect();

  res.status(200).json({ name: "John Doe" });
}
