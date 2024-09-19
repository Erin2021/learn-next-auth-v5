"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { UpdateProfileValues, updateProfileSchema } from "@/lib/validation";
import { revalidatePath } from "next/cache";

// To learn more about server actions, watch my YT tutorial: https://www.youtube.com/watch?v=XD5FpbVpWzk

export async function updateProfile(values: UpdateProfileValues) {
  // TODO: Get the currently authenticated user//settings를 보호하긴했지만, 그래도 다시 유저정보를 가져온다.-만일의 경우대비
  const session = await auth();
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
