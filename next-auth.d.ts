import NextAuth, { type DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"


export type ExtendedUser = DefaultSession['user'] & {
    role: 'ADMIN' | 'GUEST' | 'SUPERADMIN' 
};

declare module "next-auth" {
    interface Session {
      user?: ExtendedUser
    }
}

declare module "next-auth/jwt" {
  interface JWT {
      accessToken?: accessToken
  }
}