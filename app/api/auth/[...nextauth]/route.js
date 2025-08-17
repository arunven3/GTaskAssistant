import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { redirect } from "next/navigation";

async function refreshAccessToken(token) {
  try {
    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      }),
    });

    const refreshedTokens = await res.json();

    if (!res.ok) throw refreshedTokens;

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      expiresAt: Math.floor(Date.now() / 1000) + refreshedTokens.expires_in,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // keep old refresh token if none returned
    };
  } catch (error) {
    console.error("Error refreshing access token", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/calendar.readonly",
          access_type: "offline",
          prompt: "consent",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // redirect("/page/chat");
      return true; // Allow login
    },
    async jwt({ token, account }) {
      if (account) {
        return {
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          expiresAt: Math.floor(Date.now() / 1000) + account.expires_in,
          user: token.user,
        };
      }

      if (Date.now() / 1000 < token.expiresAt) {
        return token;
      }

      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user = token.user ?? session.user;
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
