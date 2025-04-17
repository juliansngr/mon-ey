import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/db/mongodb";
import { ObjectId } from "mongodb";

export const authOptions = {
  callbacks: {
    async session({ session, token, user }) {
      session.user.id = user.id;
      return session;
    },
  },
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    process.env.VERCEL_ENV === "preview"
      ? CredentialsProvider({
          name: "credentials",
          credentials: {
            username: {
              label: "Username",
              type: "text",
              placeholder: "username",
            },
            password: { label: "Password", type: "password" },
          },
          async authorize(credentials) {
            console.log("authorize called with", credentials);
            const db = (await clientPromise).db("auth");
            const users = db.collection("users");

            // Check if dummy user already exists
            const existingUser = await users.findOne({
              email: "test@example.com",
            });

            if (existingUser) {
              return existingUser;
            }

            // Insert dummy user with unique _id
            const newUser = {
              _id: new ObjectId(), // <- muss unique sein!
              name: "Neuer Fisch",
              email: "test@example.com",
              emailVerified: null,
            };

            await users.insertOne(newUser);
            return newUser;
          },
        })
      : GithubProvider({
          clientId: process.env.GITHUB_ID,
          clientSecret: process.env.GITHUB_SECRET,
        }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
