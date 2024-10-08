import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { Adapter } from "next-auth/adapters";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost:true,
  theme: {
    logo: "/logo.png",
  },
  adapter: PrismaAdapter(prisma) as Adapter, //db가 연결되었다.
  callbacks:{
    session({session,user}){//session에 확장데이터 적용
      session.user.role = user.role;
      return session
    },
  },
  providers: [Google, GitHub], //로그인 제3자 제공자
});

//http://localhost:3000/api/auth/signin 에서 예시로그인 보는것-네가 커스텀해서 따로 만들수있음 이건 기본제공임
