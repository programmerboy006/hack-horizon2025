import { getUserDashboardData, getAdminDashboardData } from "../../../api/dashboard"
import { verifyToken } from "../../../api/auth"

export async function GET(request) {
  try {
    // Get auth token from headers
    const authHeader = request.headers.get("Authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Authentication required",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    const token = authHeader.split(" ")[1]

    // Verify token
    const tokenResult = verifyToken(token)

    if (!tokenResult.success) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid authentication token",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    // Get URL parameters
    const url = new URL(request.url)
    const isAdmin = url.searchParams.get("admin") === "true"

    let result

    if (isAdmin) {
      // Get admin dashboard data
      result = getAdminDashboardData()
    } else {
      // Get user dashboard data
      result = getUserDashboardData(tokenResult.userId)
    }

    if (!result.success) {
      return new Response(
        JSON.stringify({
          success: false,
          message: result.message,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    // Return the dashboard data
    return new Response(
      JSON.stringify({
        success: true,
        dashboard: result.dashboard,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    )
  } catch (error) {
    console.error("Get dashboard data error:", error)
    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal server error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
