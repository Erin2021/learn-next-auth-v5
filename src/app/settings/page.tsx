import { Metadata } from "next";
import SettingsPage from "./SettingsPage";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import getSession from "@/lib/getSession";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function Page() {
  // TODO: Protect this page via authentication-option1
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect("/api/auth/signin?callbackUrl=/settings");//signin하면 바로 settings화면으로 올수있게 하는 라우트(callbackUrl)
  }
  return <SettingsPage user={user}/>;
}
