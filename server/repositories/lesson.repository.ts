import { prisma } from "@/lib/db";

export async function getLessonById(id: string) {
  return prisma.lesson.findUnique({
    where: { id },
    include: {
      chapter: {
        include: {
          course: true,
        },
      },
    },
  });
}