import NextAuth from "next-auth/next";
import DiscordProvider from "next-auth/providers/discord";
import { connectDB } from "@utils/database";
import User from "@/models/user";
import { userAgent } from "next/server";

const handler = NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  async session({ session }) {
    const sessionUser = await User.findOne({
      discordId: session.user.discordId,
    });
    session.user.id = sessionUser._id.toString();
    return session;
  },
  async signIn({ profile }) {
    try {
      await connectDB();
      const userExists = await User.findOne({ discordId: profile.discordId });
      if (!userExists) {
        await User.create({
          discordId: profile.discordId,
          discordUsername: profile.discordUsername
            .replace(" ", "")
            .toLowerCase(),
          discordAvatar: profile.discordAvatar,
        });
      }
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
});

export { handler as GET, handler as POST };
