import { prisma } from "@/lib/db";

export async function getAllCourses() {
  return prisma.course.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getCourseById(id: string) {
  return prisma.course.findUnique({
    where: {
      id,
    },
    include: {
      chapters: {
        orderBy: {
          order: "asc",
        },
        include: {
          lessons: {
            orderBy: {
              order: "asc",
            },
          },
        },
      },
    },
  });
}