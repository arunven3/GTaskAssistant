import GoogleProvider from "next-auth/providers/google";
import { refreshAccessToken } from "@/app/api/auth/[...nextauth]/tokens";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: [
            "openid",
            "email",
            "profile",
            "https://www.googleapis.com/auth/calendar",
            "https://www.googleapis.com/auth/drive",
            "https://www.googleapis.com/auth/gmail.readonly",
          ].join(" "),
          access_type: "offline",
          prompt: "consent",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = Math.floor(Date.now() / 1000) + account.expires_in;
      }

      // Refresh if expired
      if (Date.now() / 1000 >= token.expiresAt) {
        return await refreshAccessToken(token);
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token.user ?? session.user;
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
};
