import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const projectId = process.env.VERCEL_PROJECT_ID;
  const token = process.env.VERCEL_TOKEN;

  if (!projectId || !token) {
    return NextResponse.json({
      error: "Vercel credentials not configured"
    }, { status: 500 });
  }

  try {
    // Get latest production deployment
    const deploymentsRes = await fetch(
      `https://api.vercel.com/v6/deployments?projectId=${projectId}&target=production&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!deploymentsRes.ok) {
      throw new Error("Failed to fetch deployments");
    }

    const deploymentsData = await deploymentsRes.json();

    if (!deploymentsData.deployments || deploymentsData.deployments.length === 0) {
      return NextResponse.json({ logs: "No production deployments found" });
    }

    const latestDeployment = deploymentsData.deployments[0];

    // Runtime logs are only available for up to 1 hour
    // Use correct runtime-logs endpoint for function execution logs (console.log, etc.)
    const logsRes = await fetch(
      `https://api.vercel.com/v1/projects/${projectId}/deployments/${latestDeployment.uid}/runtime-logs`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!logsRes.ok) {
      const errorText = await logsRes.text();
      console.error("Runtime logs fetch failed:", errorText);

      // Check if it's a 403 permission error
      if (logsRes.status === 403) {
        // Use special Vercel pathname: appending /_logs to deployment URL shows logs
        const vercelLogsUrl = `https://${latestDeployment.url}/_logs`;

        return NextResponse.json({
          logs: `Runtime logs are not accessible via API on the free plan.\n\nClick "Open in Vercel" below to view runtime logs directly.\n\nDirect link: ${vercelLogsUrl}`,
          vercelLogsUrl: vercelLogsUrl,
          deployment: {
            id: latestDeployment.uid,
            url: latestDeployment.url,
            state: latestDeployment.state,
            createdAt: latestDeployment.created,
          }
        });
      }

      return NextResponse.json({
        logs: `Runtime logs API error (${logsRes.status}): ${errorText}\n\nNote: Runtime logs are only stored for 1 hour by Vercel. For longer retention, configure Log Drains.`,
        deployment: {
          id: latestDeployment.uid,
          url: latestDeployment.url,
          state: latestDeployment.state,
          createdAt: latestDeployment.created,
        }
      });
    }

    // Runtime logs come as newline-delimited JSON stream
    const logsText = await logsRes.text();
    const logLines = logsText.trim().split("\n").filter(line => line);

    // Parse each JSON line and format
    const logs = logLines
      .map((line: string) => {
        try {
          const log = JSON.parse(line);
          const timestamp = new Date(log.timestampInMs || Date.now()).toISOString();
          const level = log.level || "info";
          const message = log.message || JSON.stringify(log);
          return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
        } catch {
          return line; // If parsing fails, return raw line
        }
      })
      .join("\n");

    return NextResponse.json({
      logs: logs || "No runtime logs available (logs are only kept for 1 hour)",
      deployment: {
        id: latestDeployment.uid,
        url: latestDeployment.url,
        state: latestDeployment.state,
        createdAt: latestDeployment.created,
      }
    });
  } catch (error) {
    console.error("Runtime logs error:", error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Failed to fetch runtime logs"
    }, { status: 500 });
  }
}
