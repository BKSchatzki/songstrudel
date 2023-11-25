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

export const PUT = async (req, { params }) => {
  try {
    const updatedArrangement = await req.json();
    await connectDB();
    const res = await Arrangement.findByIdAndUpdate(
      params.id,
      updatedArrangement,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!res) return new Response("Arrangement not found.", { status: 404 });
    return new Response(JSON.stringify(res), { status: 200 });
  } catch (err) {
    return new Response("Failed to update arrangement.", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectDB();
    const deletedArrangement = await Arrangement.findByIdAndDelete(params.id);
    if (!deletedArrangement)
      return new Response("Arrangement not found.", { status: 404 });
    return new Response(JSON.stringify(deletedArrangement), { status: 200 });
  } catch (err) {
    return new Response("Failed to delete arrangement.", { status: 500 });
  }
};
