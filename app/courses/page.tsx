import CourseCard from "@/components/CourseCard";
import { listCourses } from "@/server/services/course.service";

export default async function CoursesPage() {
  const courses = await listCourses();

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <nav className="flex items-center justify-between border-b px-8 py-5">
        <div className="text-xl font-bold tracking-tight">
          BlackCap
        </div>

        <div className="flex items-center gap-6">
          <a href="/courses">Courses</a>
          <a href="/login">Login</a>
        </div>
      </nav>

      {/* Course Catalogue */}
      <section className="mx-auto max-w-6xl px-8 py-16">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
            BlackCap Learning
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            Explore Courses
          </h1>

          <p className="mt-3 max-w-2xl text-zinc-600">
            Learn practical skills through courses designed to help you
            build real-world projects and grow your career.
          </p>
        </div>

        {courses.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed p-12 text-center">
            <h2 className="text-xl font-semibold">
              No courses available
            </h2>

            <p className="mt-2 text-zinc-600">
              There are no courses available right now. Please check
              back later.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                description={course.description}
                price={course.price}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}