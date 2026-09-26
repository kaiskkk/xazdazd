"use client";

export function QuickWinIdeas() {
  return (
    <div className="mb-12">
      <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
        What do you want to build?
      </h3>
      <p className="text-gray-600 mb-6 text-center">
        Open Claude and describe your idea. It knows your stack.
      </p>
      <div className="text-center">
        <a
          href="https://claude.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full sm:w-auto px-8 py-4 bg-black text-white text-lg font-semibold rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl active:scale-95"
        >
          Start Building →
        </a>
        <p className="text-xs text-gray-500 mt-3">
          Your app has: Database • Auth • AI • Auto-deployment
        </p>
      </div>
    </div>
  );
}
