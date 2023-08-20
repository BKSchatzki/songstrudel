import { connectDB } from "@utils/database";
import Arrangement from "@models/arrangement";

export const POST = async (req, res) => {
  const { userId, title, description, instruments, sections } =
    await req.json();
  try {
    await connectDB();
    const newArrangement = new Arrangement({
      creator: userId,
      title,
      description,
      instruments,
      sections,
    });
    await newArrangement.save();
    console.log(`Successfully saved new arrangement ${title} to the database.`);
    return new Response(JSON.stringify(newArrangement), { status: 201 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to save new arrangement to the database.", {
      status: 500,
    });
  }
};
