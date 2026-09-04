# BlackCap — Course Platform

BlackCap is a production-style course learning platform built with Next.js, TypeScript, Prisma, PostgreSQL, and Auth.js.

The platform allows users to browse courses, sign in with GitHub, enroll in courses, access lessons, mark lessons as completed, and track their learning progress.

## Features

- Course catalogue
- Course details with chapters and lessons
- GitHub OAuth authentication
- Protected dashboard
- Course enrollment
- Protected lesson access
- Lesson completion tracking
- Persistent learning progress
- Responsive UI
- Loading and error states
- Empty states
- PostgreSQL database
- Prisma ORM
- Repository and service architecture

## Tech Stack

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Auth.js / NextAuth
- GitHub OAuth
- PostgreSQL
- Neon
- Prisma
- Node.js
- Vercel

## Architecture

The application follows a layered architecture:

```text
Browser / Frontend
        ↓
Next.js Pages & Components
        ↓
API Route Handlers
        ↓
Services
        ↓
Repositories
        ↓
Prisma
        ↓
PostgreSQL / Neon

Business logic is kept inside the service layer, while database access is isolated inside repository modules.

Database Structure

The application uses PostgreSQL with Prisma.

Main models:

User
Account
Session
Course
Chapter
Lesson
Enrollment
LessonCompletion

The course hierarchy is:

Course
 └── Chapter
      └── Lesson

Users can enroll in courses and their lesson completions are stored persistently in the database.

Authentication

Authentication is implemented using Auth.js with GitHub OAuth.

Authenticated users can:

Access the dashboard
Enroll in courses
Access lessons for courses they are enrolled in
Mark lessons as completed
Track their course progress
Log out securely

The dashboard is protected so unauthenticated users cannot access it.

Lessons are also protected and require the user to be enrolled in the corresponding course.

Learning Progress

Lesson completion is stored in PostgreSQL.

Course progress is calculated using:

completed lessons / total lessons × 100

For example:

2 completed lessons
2 total lessons

= 100% complete

Progress remains available when the user leaves and returns to the application.

API Routes
Get all courses
GET /api/courses

Returns the available courses.

Enroll in a course
POST /api/courses/[id]/enroll

Requires authentication.

Complete a lesson
POST /api/lessons/[lessonId]/complete

Requires authentication and course enrollment.

Authentication
/api/auth/[...nextauth]

Handles Auth.js authentication.

Project Structure
course-platform/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   ├── courses/
│   │   └── lessons/
│   ├── courses/
│   ├── dashboard/
│   ├── login/
│   └── page.tsx
│
├── components/
│   ├── ui/
│   ├── CourseCard.tsx
│   ├── EnrollmentButton.tsx
│   ├── LogoutButton.tsx
│   └── MarkCompleteButton.tsx
│
├── lib/
│   ├── db.ts
│   └── utils.ts
│
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
│
├── server/
│   ├── repositories/
│   └── services/
│
├── auth.ts
├── proxy.ts
├── prisma.config.ts
└── package.json
Getting Started
1. Clone the repository
git clone https://github.com/Sumaiya1201/blackcap-course-platform.git
cd blackcap-course-platform
2. Install dependencies
npm install
3. Configure environment variables

Create a .env file using .env.example as a template.

Required environment variables:

DATABASE_URL=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
AUTH_SECRET=

Do not commit the .env file because it contains sensitive credentials.

4. Generate Prisma Client
npx prisma generate
5. Apply database migrations
npx prisma migrate deploy
6. Seed the database
npx prisma db seed
7. Start the development server
npm run dev

The application will then be available at:

http://localhost:3000
Available Scripts

Start the development server:

npm run dev

Create a production build:

npm run build

Start the production server:

npm run start

Run TypeScript checking:

npx tsc --noEmit

Generate Prisma Client:

npx prisma generate

Run database migrations:

npx prisma migrate dev

Apply migrations in production:

npx prisma migrate deploy

Seed the database:

npx prisma db seed
Main User Flow
Browse Courses
      ↓
View Course Details
      ↓
Login with GitHub
      ↓
Enroll in Course
      ↓
Access Lesson
      ↓
Mark Lesson Complete
      ↓
Dashboard
      ↓
View Updated Progress
Security
Environment variables containing secrets are excluded from Git.
.env.example contains no real credentials.
Dashboard access requires authentication.
Lesson access requires authentication and course enrollment.
Duplicate enrollments are prevented at the database level.
Duplicate lesson completions are prevented at the database level.
Database access is separated from frontend components.
Deployment

The application is designed to be deployed on Vercel with Neon PostgreSQL.

The following environment variables must be configured in the production environment:

DATABASE_URL=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
AUTH_SECRET=

The GitHub OAuth application must also be configured with the production authentication callback URL after deployment.

Assessment Scope

This project focuses on the core course-platform requirements:

Authentication
Course catalogue
Course hierarchy
Enrollment
Protected learning content
Lesson completion
Progress tracking
PostgreSQL persistence
Layered backend architecture
Loading, error, empty, and not-found states

Optional bonus features such as Stripe payments and Arcjet protection are not included.

Validation

The project has been verified with:

npx tsc --noEmit
npm run build

Both checks complete successfully.

## Live Demo

https://blackcap-course-platform.vercel.app
