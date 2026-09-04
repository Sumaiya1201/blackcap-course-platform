import CourseCard from "@/components/CourseCard";
import { listCourses } from "@/server/services/course.service";

export default async function Home() {
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

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-8 py-24">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest">
            BlackCap Learning
          </p>

          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            Master skills.
            <br />
            Build your future.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-zinc-600">
            Practical courses designed to help you build
            real-world skills and move forward with confidence.
          </p>

          <div className="mt-8">
            <a
              href="/courses"
              className="inline-flex rounded-lg bg-black px-6 py-3 font-medium text-white hover:bg-zinc-800"
            >
              Explore Courses
            </a>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="border-t bg-zinc-50 px-8 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium uppercase tracking-widest">
            Learn with BlackCap
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Featured courses
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {courses.slice(0, 3).map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                description={course.description}
                price={course.price}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}