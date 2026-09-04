import {
  createCompletion,
  getCompletion,
} from "@/server/repositories/completion.repository";

export async function isLessonCompleted(
  userId: string,
  lessonId: string
) {
  const completion = await getCompletion(userId, lessonId);

  return !!completion;
}

export async function completeLesson(
  userId: string,
  lessonId: string
) {
  const existingCompletion = await getCompletion(userId, lessonId);

  if (existingCompletion) {
    return existingCompletion;
  }

  return createCompletion(userId, lessonId);
}