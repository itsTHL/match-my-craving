import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../../db/mongodb";
import dbConnect from "../../../../db/connect";
import User from "../../../../db/models/User";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      id: "google",
      name: "google",
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    // ...add more providers here
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });

      return session;
    },
    async signIn({ profile }) {
      console.log(profile);
      try {
        await dbConnect();

        const userExist = await User.findOne({ email: profile.email });

        console.log("User exist: ", userExist);

        if (!userExist) {
          const user = await User.create({
            email: profile.email,
            username: "",
            password: "",
            recipes: [],
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};

export default NextAuth(authOptions);
