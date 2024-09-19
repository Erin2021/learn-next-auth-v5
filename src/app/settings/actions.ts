"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { UpdateProfileValues, updateProfileSchema } from "@/lib/validation";
import { revalidatePath } from "next/cache";

// To learn more about server actions, watch my YT tutorial: https://www.youtube.com/watch?v=XD5FpbVpWzk

export async function updateProfile(values: UpdateProfileValues) {
  // TODO: Get the currently authenticated user//settings를 보호하긴했지만, 그래도 다시 유저정보를 가져온다.-만일의 경우대비
  const session = await auth();//여기서는 import getSession from "@/lib/getSession"; 사용안함-서버액션에서 안함:열면 자동으로 서버req보내니까 그리고 버튼 누를때 작동되는 코드니까 chached버전 사용하고 싶지 않아.//getSessioin은 페이지가 열릴때만 사용하고 싶어
  const userId = session?.user?.id;

  if (!userId){
    throw Error("Unauthorized");
  }

  const { name } = updateProfileSchema.parse(values);

  // TODO: Update user
  await prisma.user.update({
    where:{
      id:userId
    },
    data:{
      name,
    }
  })

  revalidatePath("/"); //서버측 : 경로"/" 캐시 데이터를 무효화. 최신데이터를 보여준다.페이지 이동 X-데이터갱신용
}
