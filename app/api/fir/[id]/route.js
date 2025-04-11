import { getFIR } from "../../../../api/fir"

export async function GET(request, { params }) {
  try {
    const { id } = params

    // Get FIR by ID
    const result = getFIR(id)

    if (!result.success) {
      return new Response(
        JSON.stringify({
          success: false,
          message: result.message,
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    // Return the FIR data
    return new Response(
      JSON.stringify({
        success: true,
        fir: result.fir,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    )
  } catch (error) {
    console.error("Get FIR error:", error)
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

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    
    // Get auth token from headers
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Authentication required'

```js file="app/api/fir/track/route.js" type="nodejs"
import { getFIR, getFIRsByPhone } from '../../../../api/fir';

export async function GET(request) {
  try {
    // Get URL parameters
    const url = new URL(request.url);
    const firId = url.searchParams.get('firId');
    const phone = url.searchParams.get('phone');
    
    let result;
    
    if (firId) {
      // Track by FIR ID
      result = getFIR(firId);
      
      if (!result.success) {
        return new Response(
          JSON.stringify({ 
            success: false, 
            message: result.message 
          }),
          { 
            status: 404,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
      
      // Return the FIR data
      return new Response(
        JSON.stringify({ 
          success: true, 
          fir: result.fir
        }),
        { 
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    } else if (phone) {
      // Track by phone number
      result = getFIRsByPhone(phone);
      
      if (!result.success) {
        return new Response(
          JSON.stringify({ 
            success: false, 
            message: result.message 
          }),
          { 
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
      
      // Return the FIRs
      return new Response(
        JSON.stringify({ 
          success: true, 
          firs: result.firs
        }),
        { 
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    } else {
      // No tracking parameters provided
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'FIR ID or phone number is required for tracking' 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
  } catch (error) {
    console.error('Track FIR error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Internal server error' 
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
