import { prisma } from "@/lib/db";

export async function getCompletion(
  userId: string,
  lessonId: string
) {
  return prisma.lessonCompletion.findUnique({
    where: {
      userId_lessonId: {
        userId,
        lessonId,
      },
    },
  });
}

export async function createCompletion(
  userId: string,
  lessonId: string
) {
  return prisma.lessonCompletion.create({
    data: {
      userId,
      lessonId,
    },
  });
}