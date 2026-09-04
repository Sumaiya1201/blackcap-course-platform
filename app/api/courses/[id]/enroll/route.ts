import { auth } from "@/auth";
import { enrollUser } from "@/server/services/enrollment.service";
import { NextResponse } from "next/server";

type EnrollRouteProps = {
  params: Promise<{ id: string }>;
};

export async function POST(
  request: Request,
  { params }: EnrollRouteProps
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;

  try {
    const enrollment = await enrollUser(session.user.id, id);

    return NextResponse.json(enrollment, { status: 201 });
  } catch (error) {
    console.error("Failed to enroll user:", error);

    return NextResponse.json(
      { error: "Failed to enroll in course" },
      { status: 500 }
    );
  }
}