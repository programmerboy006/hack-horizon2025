import { sendAadhaarOTP, verifyAadhaarOTP } from "../../../../api/auth"

export async function POST(request) {
  try {
    const body = await request.json()

    // Check if this is an OTP request or verification
    if (body.aadhaarNumber && !body.otp) {
      // This is an OTP request
      const { aadhaarNumber } = body

      // Validate Aadhaar number
      if (!aadhaarNumber || aadhaarNumber.length !== 12) {
        return new Response(
          JSON.stringify({
            success: false,
            message: "Valid Aadhaar number is required",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        )
      }

      // Send OTP
      const result = sendAadhaarOTP(aadhaarNumber)

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

      // Return success
      return new Response(
        JSON.stringify({
          success: true,
          message: result.message,
          mockOtp: result.mockOtp, // Only for demo purposes
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      )
    } else if (body.aadhaarNumber && body.otp) {
      // This is an OTP verification
      const { aadhaarNumber, otp } = body

      // Validate inputs
      if (!aadhaarNumber || !otp) {
        return new Response(
          JSON.stringify({
            success: false,
            message: "Aadhaar number and OTP are required",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        )
      }

      // Verify OTP
      const result = verifyAadhaarOTP(aadhaarNumber, otp)

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
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid request format",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      )
    }
  } catch (error) {
    console.error("Aadhaar authentication error:", error)
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
