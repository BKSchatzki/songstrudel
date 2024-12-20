import Arrangement from '@models/arrangement';
import { connectDB } from '@utils/database';

export const GET = async (req) => {
  const {
    search,
    page = 1,
    limit = 12,
  } = req.url
    .split('?')[1]
    .split('&')
    .reduce((acc, param) => {
      const [key, value] = param.split('=');
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {});

  const searchRegex = search ? new RegExp(search, 'i') : null;

  try {
    await connectDB();

    let arrangements = [];
    if (searchRegex) {
      arrangements = await Arrangement.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'creator',
            foreignField: '_id',
            as: 'creator',
          },
        },
        {
          $unwind: { path: '$creator', preserveNullAndEmptyArrays: true },
        },
        {
          $match: {
            $or: [
              { title: searchRegex },
              { 'creator.username': searchRegex },
              { instruments: { $elemMatch: { $regex: searchRegex } } },
            ],
          },
        },
        {
          $sort: { updatedAt: -1 },
        },
        {
          $skip: (page - 1) * limit,
        },
        {
          $limit: parseInt(limit),
        },
      ]);
    } else {
      arrangements = await Arrangement.find({})
        .populate('creator')
        .sort({ updatedAt: 'desc' })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
    }

    return new Response(JSON.stringify(arrangements), { status: 200 });
  } catch (err) {
    return new Response('Failed to fetch all arrangements.', { status: 500 });
  }
};

export const revalidate = 0;
