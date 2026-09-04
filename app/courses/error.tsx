"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-8 text-black">
      <div className="max-w-md text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
          Something went wrong
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Unable to load courses
        </h1>

        <p className="mt-3 text-zinc-600">
          We couldn't load the course catalogue right now.
          Please try again.
        </p>

        <Button
          onClick={() => reset()}
          className="mt-6"
        >
          Try Again
        </Button>
      </div>
    </main>
  );
}