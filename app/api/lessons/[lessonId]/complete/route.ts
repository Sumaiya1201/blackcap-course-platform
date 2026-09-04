import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { getLessonById } from "@/server/repositories/lesson.repository";
import { isUserEnrolled } from "@/server/services/enrollment.service";
import { completeLesson } from "@/server/services/completion.service";

type CompleteLessonRouteProps = {
  params: Promise<{
    lessonId: string;
  }>;
};

export async function POST(
  request: Request,
  { params }: CompleteLessonRouteProps
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { lessonId } = await params;

  const lesson = await getLessonById(lessonId);

  if (!lesson) {
    return NextResponse.json(
      { error: "Lesson not found" },
      { status: 404 }
    );
  }

  const courseId = lesson.chapter.course.id;

  const enrolled = await isUserEnrolled(
    session.user.id,
    courseId
  );

  if (!enrolled) {
    return NextResponse.json(
      { error: "You are not enrolled in this course" },
      { status: 403 }
    );
  }

  try {
    const completion = await completeLesson(
      session.user.id,
      lessonId
    );

    return NextResponse.json(completion, { status: 201 });
  } catch (error) {
    console.error("Failed to complete lesson:", error);

    return NextResponse.json(
      { error: "Failed to complete lesson" },
      { status: 500 }
    );
  }
}