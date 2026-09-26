import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { QuickWinIdeas } from "@/components/QuickWinIdeas";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">xazdazd</h1>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Welcome */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Welcome to xazdazd
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            Your app is live. You're logged in.
          </p>
        </div>

        {/* What to Build - Now a Client Component */}
        <QuickWinIdeas />

        {/* Setup Status Check */}
        <div className="bg-green-50 rounded-xl p-6 mb-8 border border-green-200">
          <h3 className="font-semibold text-green-900 mb-4 flex items-center gap-2">
            <span className="text-xl">✓</span> Everything is Ready
          </h3>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-3">
              <span className="text-green-600 text-lg">✓</span>
              <div>
                <div className="font-medium text-gray-900">Authentication</div>
                <div className="text-xs text-gray-600">Clerk • You're logged in!</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-600 text-lg">✓</span>
              <div>
                <div className="font-medium text-gray-900">Database</div>
                <div className="text-xs text-gray-600">Neon Postgres • Connected</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-600 text-lg">✓</span>
              <div>
                <div className="font-medium text-gray-900">Hosting</div>
                <div className="text-xs text-gray-600">Vercel • Auto-deploys on push</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-lg">○</span>
              <div>
                <div className="font-medium text-gray-900">AI (Optional)</div>
                <div className="text-xs text-gray-600">Add via Vercel env vars when needed</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-600 text-lg">✓</span>
              <div>
                <div className="font-medium text-gray-900">Styling</div>
                <div className="text-xs text-gray-600">Tailwind CSS • Utility-first</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-600 text-lg">✓</span>
              <div>
                <div className="font-medium text-gray-900">Animations</div>
                <div className="text-xs text-gray-600">Framer Motion + GSAP + Lottie</div>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:col-span-2">
              <span className="text-green-600 text-lg">✓</span>
              <div className="flex-1 flex items-center justify-between flex-wrap gap-2">
                <div>
                  <div className="font-medium text-gray-900">Deployment Logs</div>
                  <div className="text-xs text-gray-600">Build & runtime logs available</div>
                </div>
                <div className="flex gap-2">
                  <a
                    href="/logs?tab=build"
                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Build Logs
                  </a>
                  <a
                    href="/logs?tab=runtime"
                    className="px-3 py-1.5 bg-purple-600 text-white text-xs font-medium rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Runtime Logs
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Domain Section */}
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 mb-8 border border-indigo-100">
          <div className="flex items-start gap-4">
            <div className="text-3xl">🌐</div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">Want Your Own Domain?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Your site is live at <code className="bg-white px-2 py-0.5 rounded text-xs">xazdazd.vercel.app</code>
                <br />
                Add a custom domain like <strong>yoursite.com</strong> in 5 minutes.
              </p>
              <a
                href="https://vercel.com/docs/projects/domains/add-a-domain"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                Add Custom Domain →
              </a>
              <p className="text-xs text-gray-500 mt-3">
                💡 Buy from Vercel or connect one you already own (GoDaddy, Namecheap, etc.)
              </p>
            </div>
          </div>
        </div>

        {/* Your Tech Stack */}
        <div className="bg-white rounded-xl border p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4 text-center">Your Tech Stack</h3>
          <div className="space-y-4 text-sm">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span>🎨</span>
                <span className="font-medium text-gray-900">Frontend</span>
              </div>
              <p className="text-gray-600 ml-6">
                Next.js UI components → Instantly deployed via Vercel
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span>⚙️</span>
                <span className="font-medium text-gray-900">Backend</span>
              </div>
              <p className="text-gray-600 ml-6">
                API routes + business logic → Serverless functions on Vercel
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span>🗄️</span>
                <span className="font-medium text-gray-900">Database</span>
              </div>
              <p className="text-gray-600 ml-6">
                Postgres with Drizzle ORM → Neon serverless database
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span>🎨</span>
                <span className="font-medium text-gray-900">Styling</span>
              </div>
              <p className="text-gray-600 ml-6">
                Tailwind CSS → Utility-first, no CSS files needed
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span>✨</span>
                <span className="font-medium text-gray-900">Animations & Motion Graphics</span>
              </div>
              <p className="text-gray-600 ml-6">
                Framer Motion + GSAP + Lottie for pro-level animations
              </p>
            </div>
          </div>
        </div>

        {/* What This Means */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-5 mb-8 border border-blue-100">
          <h3 className="text-sm font-semibold mb-3 text-gray-900 text-center">
            What This Means for You
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">→</span>
              <span><strong className="text-gray-900">Build real products:</strong> Not a toy - this powers actual businesses</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">→</span>
              <span><strong className="text-gray-900">No rewrites later:</strong> Start with 10 users, scale to 100K on the same stack</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">→</span>
              <span><strong className="text-gray-900">Free until you profit:</strong> Build and launch without server costs</span>
            </li>
          </ul>
        </div>

        {/* Ready to customize */}
        <div className="bg-gray-50 rounded-lg p-4 mb-8 border border-gray-200">
          <p className="text-sm text-gray-700 text-center">
            <strong>Tip:</strong> This dashboard is optional. Replace <code className="bg-white px-2 py-1 rounded text-xs border">src/app/dashboard/page.tsx</code> when you're ready to build your own UI.
          </p>
        </div>

        {/* Building Options */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {/* Phone Option */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-xl">📱</span> Build from Your Phone
            </h3>
            <p className="text-xs text-gray-600 mb-4 italic">
              Build features → Deploy to production → Test on your live site
            </p>
            <ol className="space-y-2 text-sm text-gray-700 mb-4">
              <li className="flex gap-2">
                <span className="font-bold text-purple-600 flex-shrink-0">1.</span>
                <span>Open Claude mobile app</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-purple-600 flex-shrink-0">2.</span>
                <span>Tap Code → Select your repo</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-purple-600 flex-shrink-0">3.</span>
                <span>Describe what you want</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-purple-600 flex-shrink-0">4.</span>
                <span>Merge PR → Goes live</span>
              </li>
            </ol>
            <a
              href="https://claude.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-purple-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
            >
              Open Claude App →
            </a>
            <p className="text-xs text-gray-500 mt-3 text-center">
              💡 Database features work automatically - tables sync when you push code
            </p>
          </div>

          {/* Laptop Option */}
          <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-xl">💻</span> Build from Your Laptop
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              Click to open your repo in an editor:
            </p>
            <div className="space-y-2">
              <a
                href="vscode://vscode.dev/clone?url=https://github.com/kaiskkk/xazdazd"
                className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Open in VS Code
              </a>
              <a
                href="https://github.dev/kaiskkk/xazdazd"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center border-2 border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:border-gray-400 transition-colors"
              >
                Open in Browser IDE
              </a>
              <a
                href="antigravity://vscode.dev/clone?url=https://github.com/kaiskkk/xazdazd"
                className="block w-full text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-purple-700 transition-colors"
              >
                Open in Antigravity IDE
              </a>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              No setup needed • Installs editor if missing
            </p>
          </div>
        </div>

        {/* Proof of Ownership - Minimal */}
        <div className="bg-white rounded-xl border p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Your App</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Users</span>
              <span className="font-mono font-semibold text-gray-900">1 (you!)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Database</span>
              <span className="font-mono font-semibold text-gray-900">Ready</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Auto-deploys from</span>
              <a
                href="${process.env.NEXT_PUBLIC_GITHUB_REPO ? `https://github.com/${process.env.NEXT_PUBLIC_GITHUB_REPO}` : '#'}"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                GitHub →
              </a>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 pt-6 border-t text-center">
          <p className="text-xs text-gray-500">
            <a href="https://clerk.com" target="_blank" className="hover:text-gray-700">Manage users</a>
            {" • "}
            <a href="https://neon.tech" target="_blank" className="hover:text-gray-700">View database</a>
            {" • "}
            <a href="/logs" className="hover:text-gray-700">View logs</a>
          </p>
        </div>
      </div>
    </main>
  );
}
