import Arrangement from '@models/arrangement';
// import { unstable_noStore as noStore } from "next/cache";
import { connectDB } from '@utils/database';

export const GET = async (req) => {
  try {
    await connectDB();
    const arrangements = await Arrangement.find({}).populate("creator");
    return new Response(JSON.stringify(arrangements), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch all arrangements.", { status: 500 });
  }
};

export const revalidate = 0;
