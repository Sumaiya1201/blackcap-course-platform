import "dotenv/config";
import { prisma } from "@/lib/db";

async function main() {
  await prisma.course.deleteMany();

  const fullStackCourse = await prisma.course.create({
    data: {
      title: "Full-Stack Web Development",
      description:
        "Learn to build modern web applications from frontend to backend.",
      price: 999,
      chapters: {
        create: [
          {
            title: "Introduction to Web Development",
            order: 1,
            lessons: {
              create: [
                {
                  title: "What is Web Development?",
                  content:
                    "Web development is the process of building and maintaining websites and web applications.",
                  order: 1,
                },
                {
                  title: "How the Web Works",
                  content:
                    "Learn how browsers, servers, HTTP, and APIs work together.",
                  order: 2,
                },
                {
                  title: "Frontend vs Backend",
                  content:
                    "Understand the difference between frontend interfaces and backend services.",
                  order: 3,
                },
              ],
            },
          },
          {
            title: "HTML & CSS",
            order: 2,
            lessons: {
              create: [
                {
                  title: "HTML Fundamentals",
                  content:
                    "Learn the structure and semantics of modern HTML.",
                  order: 1,
                },
                {
                  title: "CSS Fundamentals",
                  content:
                    "Learn how to style and layout web pages with CSS.",
                  order: 2,
                },
              ],
            },
          },
          {
            title: "JavaScript",
            order: 3,
            lessons: {
              create: [
                {
                  title: "Variables and Functions",
                  content:
                    "Learn JavaScript variables, functions, and basic programming concepts.",
                  order: 1,
                },
                {
                  title: "DOM Manipulation",
                  content:
                    "Learn how JavaScript interacts with HTML through the DOM.",
                  order: 2,
                },
              ],
            },
          },
        ],
      },
    },
  });

  await prisma.course.create({
    data: {
      title: "AI & Machine Learning",
      description:
        "Understand the fundamentals of artificial intelligence and machine learning.",
      price: 1499,
      chapters: {
        create: [
          {
            title: "Introduction to AI",
            order: 1,
            lessons: {
              create: [
                {
                  title: "What is Artificial Intelligence?",
                  content:
                    "An introduction to artificial intelligence and its real-world applications.",
                  order: 1,
                },
                {
                  title: "Machine Learning Basics",
                  content:
                    "Understand the basic concepts behind machine learning.",
                  order: 2,
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log(`Created course: ${fullStackCourse.title}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });