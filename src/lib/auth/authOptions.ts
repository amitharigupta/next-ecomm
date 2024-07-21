import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY as string,
      async profile(profile, token: any) {
        console.log("profile", profile);
        console.log("tokens", token);

        return { id: profile.id }
      }
    })
  ]
}
