import { fileFIR, getAllFIRs, getUserFIRs } from "../../../api/fir"
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
    const userId = url.searchParams.get("userId")
    const isAdmin = url.searchParams.get("admin") === "true"

    // Determine which FIRs to return
    let result

    if (isAdmin) {
      // Admin can get all FIRs
      result = getAllFIRs()
    } else if (userId) {
      // Get FIRs for a specific user
      result = getUserFIRs(userId)
    } else {
      // Default to the user ID from the token
      result = getUserFIRs(tokenResult.userId)
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

    // Return the FIRs
    return new Response(
      JSON.stringify({
        success: true,
        firs: result.firs,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    )
  } catch (error) {
    console.error("Get FIRs error:", error)
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

export async function POST(request) {
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

    // Get request body
    const body = await request.json()

    // Validate required fields
    if (!body.personalInfo || !body.incidentDetails || !body.evidenceDetails) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Missing required FIR information",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    // File the FIR
    const result = fileFIR(tokenResult.userId, body)

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

    // Return success with FIR ID
    return new Response(
      JSON.stringify({
        success: true,
        firId: result.firId,
        message: result.message,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      },
    )
  } catch (error) {
    console.error("File FIR error:", error)
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
