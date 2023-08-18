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
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        sessionId: session.user.id,
      });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectDB();
        const userExists = await User.findOne({ id: profile.id });
        if (!userExists) {
          await User.create({
            id: profile.id,
            username: profile.username.replace(" ", "").toLowerCase(),
            image: profile.image,
          });
        }
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
