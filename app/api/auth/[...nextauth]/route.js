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
      try {
        const sessionUser = await User.findOne({
          username: session.user.name,
        });
        if (!sessionUser) {
          console.log(`No user found for ${session.user.name}`);
          return session; // or return an empty session object
        }
        console.log(`Session resumed for user ${session.user.name}.`);
        session.user.id = sessionUser._id.toString();
        return session;
      } catch (err) {
        console.log(err);
        return session; // or return an empty session object
      }
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
