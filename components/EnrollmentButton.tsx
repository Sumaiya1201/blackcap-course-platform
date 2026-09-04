"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type EnrollmentButtonProps = {
  courseId: string;
};

export default function EnrollmentButton({
  courseId,
}: EnrollmentButtonProps) {
  const router = useRouter();
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [error, setError] = useState("");

  async function handleEnroll() {
    setIsEnrolling(true);
    setError("");

    try {
      const response = await fetch(`/api/courses/${courseId}/enroll`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to enroll");
      }

      router.refresh();
    } catch {
      setError("Failed to enroll. Please try again.");
      setIsEnrolling(false);
    }
  }

  return (
    <div>
      <Button onClick={handleEnroll} disabled={isEnrolling}>
        {isEnrolling ? "Enrolling..." : "Enroll Now"}
      </Button>

      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}