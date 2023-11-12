import { connectDB } from "@utils/database";
import Arrangement from "@models/arrangement";

export const GET = async (req, { params }) => {
  try {
    await connectDB();
    const arrangement = await Arrangement.findById(params.id).populate(
      "creator",
    );
    if (!arrangement)
      return new Response("Arrangement not found.", { status: 404 });
    return new Response(JSON.stringify(arrangement), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch arrangement.", { status: 500 });
  }
};
