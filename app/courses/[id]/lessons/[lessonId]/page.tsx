import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { auth } from "@/auth";
import MarkCompleteButton from "@/components/MarkCompleteButton";
import { getLessonById } from "@/server/repositories/lesson.repository";
import { isUserEnrolled } from "@/server/services/enrollment.service";
import { isLessonCompleted } from "@/server/services/completion.service";

type LessonPageProps = {
  params: Promise<{
    id: string;
    lessonId: string;
  }>;
};

export default async function LessonPage({ params }: LessonPageProps) {
  const { id, lessonId } = await params;

  const lesson = await getLessonById(lessonId);

  if (!lesson || lesson.chapter.course.id !== id) {
    notFound();
  }

  const session = await auth();

  // User must be logged in to access lessons
  if (!session?.user?.id) {
    redirect(`/login?callbackUrl=/courses/${id}/lessons/${lessonId}`);
  }

  // User must be enrolled in the course
  const enrolled = await isUserEnrolled(session.user.id, id);

  if (!enrolled) {
    redirect(`/courses/${id}`);
  }

  // Check whether this lesson has already been completed
  const completed = await isLessonCompleted(
    session.user.id,
    lessonId
  );

  return (
    <main className="min-h-screen bg-white text-black">
      <nav className="flex items-center justify-between border-b px-8 py-5">
        <div className="text-xl font-bold tracking-tight">
          BlackCap
        </div>

        <div className="flex items-center gap-6">
          <Link href="/courses">Courses</Link>
          <Link href="/dashboard">Dashboard</Link>
        </div>
      </nav>

      <section className="mx-auto max-w-4xl px-8 py-16">
        <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
          {lesson.chapter.course.title}
        </p>

        <p className="mt-6 text-sm text-zinc-500">
          {lesson.chapter.title} · Lesson {lesson.order}
        </p>

        <h1 className="mt-2 text-4xl font-bold tracking-tight">
          {lesson.title}
        </h1>

        <div className="mt-8 rounded-xl border p-6">
          <p className="leading-8 text-zinc-700">
            {lesson.content}
          </p>
        </div>

        <div className="mt-8">
          <MarkCompleteButton
            lessonId={lesson.id}
            initialCompleted={completed}
          />
        </div>
      </section>
    </main>
  );
}