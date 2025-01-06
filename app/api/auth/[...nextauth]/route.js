import NextAuth from "next-auth";

export const authOptions= {
  providers: [
    {
      id: "descope",
      name: "Descope",
      type: "oauth",
      wellKnown: "https://api.descope.com/P2oROrVmVthEcURoSWQ5zzsYGLjj/.well-known/openid-configuration",
      authorization: { params: { scope: "openid email profile" } },
      idToken: true,
      clientId: "P2oROrVmVthEcURoSWQ5zzsYGLjj",  // Replace with your actual Descope Client ID
      clientSecret: "<Descope Access Key>",  // Replace with your actual Descope Access Key
      checks: ["pkce", "state"],
      profile(profile) {
        // Map the profile from Descope to your NextAuth user object
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    },
  ],

  callbacks: {
    // The JWT callback is used to handle token refresh logic
    async jwt({ token, account, profile }) {
      if (account) {
        // On initial sign-in, store access token, refresh token, and expiration time
        return {
          ...token,
          access_token: account.access_token,
          expires_at: Math.floor(Date.now() / 1000 + account.expires_in),  // Set token expiry
          refresh_token: account.refresh_token,
          profile: {
            name: profile?.name,
            email: profile?.email,
            image: profile?.picture,
          },
        };
      } else if (Date.now() < token.expires_at * 1000) {
        // If the token is still valid, return the current token
        return token;
      } else {
        try {
          // If the token is expired, attempt to refresh it
          const response = await fetch("https://api.descope.com/oauth2/v1/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              client_id: "P2oROrVmVthEcURoSWQ5zzsYGLjj",  // Your Descope client ID
              client_secret: "<Descope Access Key>",  // Replace with your Descope Access Key
              grant_type: "refresh_token",
              refresh_token: token.refresh_token,
            }),
          });

          const tokens = await response.json();

          if (!response.ok) throw tokens;

          return {
            ...token,
            access_token: tokens.access_token,
            expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
            refresh_token: tokens.refresh_token ?? token.refresh_token,
          };
        } catch (error) {
          console.error("Error refreshing access token", error);
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }
    },

    // The session callback will be used to pass the JWT information to the session
    async session({ session, token }) {
      if (token.profile) {
        session.user = token.profile;  // Add user profile to session
      }
      session.accessToken = token.access_token;  // Pass the access token to session
      session.error = token.error;  // Add error to session if present
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
