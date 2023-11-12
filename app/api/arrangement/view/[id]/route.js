import { connectDB } from "@utils/database";
import Arrangement from "@models/arrangement";

export const GET = async (req, res) => {
  console.log("GET request to /api/arrangement/view/[id]");
  const { id } = req.query;
  try {
    await connectDB();
    const arrangement = await Arrangement.findOne({ _id: id }).populate(
      "creator",
    );
    if (!arrangement) {
      return res.status(404).json({ message: "Arrangement not found" });
    }
    return res.status(200).json(arrangement);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch arrangement" });
  }
};
