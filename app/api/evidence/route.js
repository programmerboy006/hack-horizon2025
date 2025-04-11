import { uploadEvidence, getFIREvidence } from "../../../api/evidence"
import { verifyToken } from "../../../api/auth"

export async function GET(request) {
  try {
    // Get URL parameters
    const url = new URL(request.url)
    const firId = url.searchParams.get("firId")

    if (!firId) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "FIR ID is required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    // Get evidence for the FIR
    const result = getFIREvidence(firId)

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

    // Return the evidence
    return new Response(
      JSON.stringify({
        success: true,
        evidence: result.evidence,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    )
  } catch (error) {
    console.error("Get evidence error:", error)
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
    if (!body.firId || !body.fileData || !body.fileDescription) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Missing required evidence information",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    // Upload the evidence
    const result = uploadEvidence(tokenResult.userId, body.firId, body.fileData, body.fileDescription)

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

    // Return success with evidence ID
    return new Response(
      JSON.stringify({
        success: true,
        evidenceId: result.evidenceId,
        message: result.message,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      },
    )
  } catch (error) {
    console.error("Upload evidence error:", error)
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
