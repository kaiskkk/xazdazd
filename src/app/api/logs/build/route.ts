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
    // Get latest deployment for this project
    const deploymentsRes = await fetch(
      `https://api.vercel.com/v6/deployments?projectId=${projectId}&limit=1`,
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
      return NextResponse.json({ logs: "No deployments found" });
    }

    const latestDeployment = deploymentsData.deployments[0];

    // Get build logs using deployment events endpoint
    const logsRes = await fetch(
      `https://api.vercel.com/v3/deployments/${latestDeployment.uid}/events`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!logsRes.ok) {
      throw new Error("Failed to fetch build logs");
    }

    const logsData = await logsRes.json();

    // Format logs as text
    const logs = logsData
      .map((event: any) => {
        const timestamp = new Date(event.created).toISOString();
        return `[${timestamp}] ${event.text || event.payload?.text || JSON.stringify(event)}`;
      })
      .join("\n");

    return NextResponse.json({
      logs: logs || "No build logs available",
      deployment: {
        id: latestDeployment.uid,
        url: latestDeployment.url,
        state: latestDeployment.state,
        createdAt: latestDeployment.created,
      }
    });
  } catch (error) {
    console.error("Build logs error:", error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Failed to fetch build logs"
    }, { status: 500 });
  }
}
