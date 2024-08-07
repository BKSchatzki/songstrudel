import NextAuth from 'next-auth/next';
import DiscordProvider from 'next-auth/providers/discord';

import User from '@/models/user';
import { connectDB } from '@utils/database';

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
        await connectDB();
        const sessionUser = await User.findOne({
          username: session.user.name,
        });
        if (!sessionUser) {
          console.log(`No user found for ${session.user.name}`);
          return session; // or return {}
        }
        console.log(`Session resumed for user ${session.user.name}.`);
        session.user.id = sessionUser._id.toString();
        return session;
      } catch (err) {
        console.log(err);
        return session; // or return {}
      }
    },
    async signIn({ profile }) {
      try {
        await connectDB();
        const userExists = await User.findOne({ id: profile.id });
        if (!userExists) {
          await User.create({
            id: profile.id,
            username: profile.username.replace(' ', '').toLowerCase(),
          });
          console.log(`New user ${profile.username.replace(' ', '').toLowerCase()} created.`);
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
