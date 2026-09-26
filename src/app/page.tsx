import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to xazdazd
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your app is live! Sign in to get started.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/sign-in"
            className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
}
