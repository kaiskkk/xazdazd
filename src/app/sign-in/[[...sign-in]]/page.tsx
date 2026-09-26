import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-6">Sign in to xazdazd</h1>
      <SignIn
        appearance={{
          elements: {
            headerTitle: { display: "none" },
            headerSubtitle: { display: "none" },
          },
        }}
      />
    </main>
  );
}
