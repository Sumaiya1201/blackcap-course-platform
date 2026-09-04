import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCourseDetails } from "@/server/services/course.service";
import { isUserEnrolled } from "@/server/services/enrollment.service";
import EnrollmentButton from "@/components/EnrollmentButton";

type CoursePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params;

  const course = await getCourseDetails(id);

  if (!course) {
    notFound();
  }

  const session = await auth();

  const isEnrolled = session?.user?.id
    ? await isUserEnrolled(session.user.id, course.id)
    : false;

  const firstLesson = course.chapters[0]?.lessons[0];

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <nav className="flex items-center justify-between border-b px-8 py-5">
        <div className="text-xl font-bold tracking-tight">
          BlackCap
        </div>

        <div className="flex items-center gap-6">
          <Link href="/courses">Courses</Link>

          {session?.user ? (
            <Link href="/dashboard">Dashboard</Link>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
      </nav>

      {/* Course Header */}
      <section className="border-b bg-zinc-50">
        <div className="mx-auto max-w-6xl px-8 py-16">
          <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
            Course
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            {course.title}
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
            {course.description}
          </p>

          <div className="mt-8 flex items-center gap-6">
            <p className="text-2xl font-semibold">
              ₹{course.price}
            </p>

            {isEnrolled && firstLesson ? (
              <Link href={`/courses/${course.id}/lessons/${firstLesson.id}`}>
                <Button>Continue Learning</Button>
              </Link>
            ) : session?.user ? (
              <EnrollmentButton courseId={course.id} />
            ) : (
              <Link href={`/login?callbackUrl=/courses/${course.id}`}>
                <Button>Enroll Now</Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Chapters */}
      <section className="mx-auto max-w-6xl px-8 py-16">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
            Course Content
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Chapters and Lessons
          </h2>
        </div>

        <div className="mt-10 space-y-6">
          {course.chapters.map((chapter) => (
            <Card key={chapter.id}>
              <CardHeader>
                <CardTitle>
                  {chapter.order}. {chapter.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  {chapter.lessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      href={`/courses/${course.id}/lessons/${lesson.id}`}
                      className="block rounded-lg border p-4 transition-colors hover:bg-zinc-50"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">
                          {lesson.order}. {lesson.title}
                        </span>

                        <span className="text-sm text-zinc-500">
                          View lesson
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}