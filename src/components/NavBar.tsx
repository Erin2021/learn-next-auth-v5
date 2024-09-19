import { auth, signIn } from "@/auth";
import Link from "next/link";
import { Button } from "./ui/button";
import UserButton from "./UserButton";

export default async function NavBar() {
  //서버컴포넌트 async사용가능-데이타패칭
  // TODO: Show the currently logged-in user
  const session = await auth(); //로그인유저정보가져올 수 있음
  const user = session?.user; //유저유무판별

  return (
    <header className="sticky top-0 bg-background px-3 shadow-sm">
      <nav className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-3">
        <Link href="/" className="font-bold">
          Next-Auth v5 Tutorial
        </Link>
        {user ? <UserButton user={user} /> : <SignInButton />}
      </nav>
    </header>
  );
}

function SignInButton() {
  ///onClick은 js요청하기때문에 서버에서 사용불가. 대신 form을 사용대체할 수 있다.-submit누르면 form에 trigger하는 방식
  return (
    <form
      action={async () => {
        //이 방식 singIn 좋은점1.커스텀로그인페이지일때,URL변경시 자동으로 URL변경됨 2.hover시에 linkpreview를 안보여줌
        "use server";
        await signIn();
      }}
    >
      <Button type="submit">Sign in</Button>
    </form>
  );
}
