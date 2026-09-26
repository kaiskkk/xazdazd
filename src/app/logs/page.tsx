"use client";

import { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

type LogType = "build" | "runtime";

interface LogData {
  logs: string;
  vercelLogsUrl?: string;
  deployment?: {
    id: string;
    url: string;
    state: string;
    createdAt: number;
  };
  error?: string;
}

export default function LogsPage() {
  // Read initial tab from URL params (e.g., /logs?tab=runtime)
  const [activeTab, setActiveTab] = useState<LogType>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab');
      return tab === 'runtime' ? 'runtime' : 'build';
    }
    return 'build';
  });
  const [buildLogs, setBuildLogs] = useState<LogData | null>(null);
  const [runtimeLogs, setRuntimeLogs] = useState<LogData | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const fetchLogs = async (type: LogType) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/logs/${type}`);
      const data = await res.json();

      if (type === "build") {
        setBuildLogs(data);
      } else {
        setRuntimeLogs(data);
      }
    } catch (error) {
      console.error(`Failed to fetch ${type} logs:`, error);
      if (type === "build") {
        setBuildLogs({ logs: "Failed to load logs", error: String(error) });
      } else {
        setRuntimeLogs({ logs: "Failed to load logs", error: String(error) });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs(activeTab);
  }, [activeTab]);

  const currentLogs = activeTab === "build" ? buildLogs : runtimeLogs;

  const copyToClipboard = async () => {
    if (currentLogs?.logs) {
      await navigator.clipboard.writeText(currentLogs.logs);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back
            </Link>
            <h1 className="text-lg font-semibold text-gray-900">Deployment Logs</h1>
          </div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("build")}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === "build"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Build Logs
            </button>
            <button
              onClick={() => setActiveTab("runtime")}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === "runtime"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Runtime Logs
            </button>
          </div>

          {/* Deployment Info */}
          {currentLogs?.deployment && (
            <div className="px-6 py-4 bg-gray-50 border-b text-sm">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-6">
                  <div>
                    <span className="text-gray-600">Status: </span>
                    <span className="font-medium text-gray-900">
                      {currentLogs.deployment.state}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Deployed: </span>
                    <span className="font-medium text-gray-900">
                      {new Date(currentLogs.deployment.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
                <a
                  href={`https://${currentLogs.deployment.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Deployment →
                </a>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="px-6 py-3 bg-white border-b flex items-center justify-between flex-wrap gap-2">
            <div className="text-sm text-gray-600">
              {activeTab === "build" ? "Latest build output" : "Runtime logs (last 1 hour)"}
            </div>
            <div className="flex gap-2">
              {currentLogs?.vercelLogsUrl && (
                <a
                  href={currentLogs.vercelLogsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Open in Vercel →
                </a>
              )}
              <button
                onClick={copyToClipboard}
                disabled={!currentLogs?.logs || loading}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {copied ? "✓ Copied!" : "Copy Logs"}
              </button>
            </div>
          </div>

          {/* Logs Content */}
          <div className="p-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-gray-600">Loading logs...</div>
              </div>
            ) : currentLogs?.error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
                <strong>Error:</strong> {currentLogs.error}
              </div>
            ) : (
              <>
                <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto text-xs font-mono whitespace-pre-wrap break-words max-h-[600px] overflow-y-auto">
                  {currentLogs?.logs || "No logs available"}
                </pre>
                {currentLogs?.vercelLogsUrl && (
                  <div className="mt-4 bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <p className="text-sm text-purple-900 mb-3">
                      <strong>📱 Mobile-friendly tip:</strong> Tap the button above to open Vercel's logs page where you can easily select and copy runtime logs for debugging.
                    </p>
                    <a
                      href={currentLogs.vercelLogsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full sm:w-auto text-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Open Vercel Logs →
                    </a>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
          <strong className="block mb-2">💡 Tip:</strong>
          <ul className="space-y-1 ml-4 list-disc">
            <li><strong>Build logs</strong> show the deployment process (npm install, build, etc.)</li>
            <li><strong>Runtime logs</strong> show API route executions and server-side activity (stored for 1 hour only)</li>
            <li>For longer log retention, configure Log Drains in your Vercel project settings</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
