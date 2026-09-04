import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";
import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getUserLearningDashboard } from "@/server/services/enrollment.service";

export default async function DashboardPage() {
  const session = await auth();

  const enrolledCourses = session?.user?.id
    ? await getUserLearningDashboard(session.user.id)
    : [];

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Header */}
      <nav className="flex items-center justify-between border-b px-4 py-5 sm:px-8">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight"
        >
          BlackCap
        </Link>

        <div className="flex items-center gap-4 text-sm sm:gap-6 sm:text-base">
          <Link
            href="/courses"
            className="transition-colors hover:text-zinc-600"
          >
            Courses
          </Link>

          <LogoutButton />
        </div>
      </nav>

      {/* Dashboard */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-8 sm:py-16">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
            Dashboard
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            My Learning
          </h1>

          <p className="mt-3 text-zinc-600">
            Continue learning where you left off.
          </p>
        </div>

        {/* Courses */}
        {enrolledCourses.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed p-8 text-center sm:p-10">
            <h2 className="text-xl font-semibold">
              No enrolled courses yet
            </h2>

            <p className="mt-2 text-zinc-600">
              Browse our courses and start learning today.
            </p>

            <Link href="/courses">
              <Button className="mt-6">
                Browse Courses
              </Button>
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {enrolledCourses.map((course) => (
              <Card key={course.id}>
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
                    <span>Progress</span>

                    <span className="text-zinc-600">
                      {course.completed} of {course.total} lessons
                    </span>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-200">
                    <div
                      className="h-2 rounded-full bg-black transition-all"
                      style={{
                        width: `${course.progress}%`,
                      }}
                    />
                  </div>

                  <p className="mt-2 text-sm text-zinc-500">
                    {course.progress}% complete
                  </p>

                  {course.firstLessonId && (
                    <Link
                      href={`/courses/${course.id}/lessons/${course.firstLessonId}`}
                    >
                      <Button className="mt-6 w-full sm:w-auto">
                        Continue Learning
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}