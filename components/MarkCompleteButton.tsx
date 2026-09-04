"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type MarkCompleteButtonProps = {
  lessonId: string;
  initialCompleted: boolean;
};

export default function MarkCompleteButton({
  lessonId,
  initialCompleted,
}: MarkCompleteButtonProps) {
  const router = useRouter();

  const [isCompleting, setIsCompleting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(initialCompleted);
  const [error, setError] = useState("");

  async function handleComplete() {
    setIsCompleting(true);
    setError("");

    try {
      const response = await fetch(
        `/api/lessons/${lessonId}/complete`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to complete lesson");
      }

      setIsCompleted(true);
      router.refresh();
    } catch {
      setError(
        "Failed to mark lesson as complete. Please try again."
      );
    } finally {
      setIsCompleting(false);
    }
  }

  return (
    <div>
      <Button
        onClick={handleComplete}
        disabled={isCompleting || isCompleted}
      >
        {isCompleted
          ? "Completed ✓"
          : isCompleting
            ? "Marking..."
            : "Mark as Complete"}
      </Button>

      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}