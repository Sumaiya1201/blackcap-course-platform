import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto flex min-h-[80vh] max-w-md flex-col items-center justify-center px-6 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
          BlackCap Learning
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight">
          Welcome back
        </h1>

        <p className="mt-4 text-zinc-600">
          Sign in to continue learning with BlackCap.
        </p>

        <form
          action={async () => {
            "use server";
            await signIn("github", { redirectTo: "/dashboard" });
          }}
          className="mt-8 w-full"
        >
          <Button type="submit" className="w-full">
            Continue with GitHub
          </Button>
        </form>

        <p className="mt-6 text-sm text-zinc-500">
          New to BlackCap?{" "}
          <span className="font-medium text-black">
            Your GitHub account will be created automatically.
          </span>
        </p>
      </div>
    </main>
  );
}