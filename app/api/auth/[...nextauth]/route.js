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
      await User.findOne({
        username: session.user.name,
      });
      console.log(`Session resumed for user ${session.user.name}.`);
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
          });
          console.log(
            `New user ${profile.username
              .replace(" ", "")
              .toLowerCase()} created.`,
          );
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
