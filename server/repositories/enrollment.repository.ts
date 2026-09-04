import { prisma } from "@/lib/db";

export async function getEnrollment(
  userId: string,
  courseId: string
) {
  return prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
  });
}

export async function createEnrollment(
  userId: string,
  courseId: string
) {
  return prisma.enrollment.create({
    data: {
      userId,
      courseId,
    },
  });
}

export async function getUserEnrollments(userId: string) {
  return prisma.enrollment.findMany({
    where: {
      userId,
    },
    orderBy: {
      enrolledAt: "desc",
    },
    include: {
      course: {
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
      },
    },
  });
}

export async function getUserCompletedLessons(userId: string) {
  return prisma.lessonCompletion.findMany({
    where: {
      userId,
    },
    select: {
      lessonId: true,
    },
  });
}