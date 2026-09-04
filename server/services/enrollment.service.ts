import {
  createEnrollment,
  getEnrollment,
  getUserCompletedLessons,
  getUserEnrollments,
} from "@/server/repositories/enrollment.repository";

export async function isUserEnrolled(
  userId: string,
  courseId: string
) {
  const enrollment = await getEnrollment(userId, courseId);

  return !!enrollment;
}

export async function enrollUser(
  userId: string,
  courseId: string
) {
  const existingEnrollment = await getEnrollment(userId, courseId);

  if (existingEnrollment) {
    return existingEnrollment;
  }

  return createEnrollment(userId, courseId);
}

export async function getUserLearningDashboard(userId: string) {
  const enrollments = await getUserEnrollments(userId);
  const completedLessons = await getUserCompletedLessons(userId);

  const completedLessonIds = new Set(
    completedLessons.map((completion) => completion.lessonId)
  );

  return enrollments.map((enrollment) => {
    const course = enrollment.course;

    const lessons = course.chapters.flatMap(
      (chapter) => chapter.lessons
    );

    const totalLessons = lessons.length;

    const completed = lessons.filter((lesson) =>
      completedLessonIds.has(lesson.id)
    ).length;

    const progress =
      totalLessons === 0
        ? 0
        : Math.round((completed / totalLessons) * 100);

    const firstLesson = lessons[0];

    return {
      id: course.id,
      title: course.title,
      completed,
      total: totalLessons,
      progress,
      firstLessonId: firstLesson?.id ?? null,
    };
  });
}