import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-6">Sign up for xazdazd</h1>
      <SignUp
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
