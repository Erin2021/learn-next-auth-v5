import { DefaultSession } from "next-auth";

declare module "next-auth" {//모듈확장
  //modify User types
  interface Session{//Session user 속성확장+기존user속성유지
    user : User & DefaultSession["user"];
  }

  interface User {
    role?: String | null;
  }
}
