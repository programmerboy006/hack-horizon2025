import { authenticateUser } from "../../../../api/auth"

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate inputs
    if (!email || !password) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email and password are required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    // Authenticate the user
    const result = await authenticateUser(email, password)

    if (!result.success) {
      return new Response(
        JSON.stringify({
          success: false,
          message: result.message,
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    // Return success with user data and token
    return new Response(
      JSON.stringify({
        success: true,
        user: result.user,
        token: result.token,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    )
  } catch (error) {
    console.error("Login error:", error)
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
