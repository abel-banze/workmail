import Credentials from "next-auth/providers/credentials";
import { db } from "@/actions/config";


import type { NextAuthConfig } from "next-auth"

const login: any = async (credentials: {
  email: string;
  password: string;
}) => {
  try {

    const check = await db.user.findUnique({
      where: {
        email: credentials.email
      }
    });
    
    if(!check) return "The user doesn't exist.";

    return check;
  } catch(err) {
    console.log(err)
    throw Error("Failed to signin.")
  }
}

const nextAuthConfig: NextAuthConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;

        } catch(err) {
          console.log(err)
          return null;
        }
      }
    })
  ]
};

export default nextAuthConfig;