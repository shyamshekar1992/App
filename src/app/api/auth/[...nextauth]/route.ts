import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { NextAuthOptions } from "next-auth";

// Directly use values instead of environment variables
const clientId = "Ov23liC3lX6ifFj5Z4ki";
const clientSecret = "933582c2eb64fa0798f1afdd69411a344a88a56d";
const secret = "f2e4a1d8c6f04b2a85c7e1d6c7e4b5a8f1d2c3e4f5a7c9e0d1b6f4e3c2a5d8b2";

// Define NextAuth configuration options
const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId,
      clientSecret,
    }),
  ],
  secret, // Secret key for signing JWT
  session: {
    strategy: "jwt", // Use JWT-based session
    maxAge: 24 * 60 * 60, // 1 day
  },
  debug: process.env.NODE_ENV === "development", // Enable debug mode in development
};

// Define handler for GET and POST requests
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
