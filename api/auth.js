import { hash, compare } from "bcrypt"
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from "uuid"

// Secret key for JWT (in a real app, this would be in environment variables)
const JWT_SECRET = "your-secret-key"

// Mock database for users
const users = [
  {
    id: "1",
    name: "Test User",
    email: "user@example.com",
    password: "$2b$10$EfZhbK.9kn1sZHMnkcQvpOHhPLdTPCOgcaYVSWjbU8Kad4S9bzMcS", // hashed 'password123'
    phone: "9876543210",
    aadhaar: "123456789012",
  },
]

// Function to register a new user
export async function registerUser(userData) {
  try {
    // Check if user already exists
    const existingUser = users.find((user) => user.email === userData.email)
    if (existingUser) {
      return { success: false, message: "User already exists with this email" }
    }

    // Hash the password
    const hashedPassword = await hash(userData.password, 10)

    // Create new user
    const newUser = {
      id: uuidv4(),
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      phone: userData.phone,
      aadhaar: userData.aadhaar || null,
    }

    // Add to database (in a real app, this would be a database insert)
    users.push(newUser)

    return {
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
      },
    }
  } catch (error) {
    console.error("Error registering user:", error)
    return { success: false, message: "Failed to register user" }
  }
}

// Function to authenticate a user
export async function authenticateUser(email, password) {
  try {
    // Find user
    const user = users.find((user) => user.email === email)
    if (!user) {
      return { success: false, message: "User not found" }
    }

    // Check password
    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) {
      return { success: false, message: "Invalid password" }
    }

    // Generate JWT
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "24h" },
    )

    return {
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    }
  } catch (error) {
    console.error("Error authenticating user:", error)
    return { success: false, message: "Authentication failed" }
  }
}

// Function to verify a JWT token
export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    return { success: true, userId: decoded.userId }
  } catch (error) {
    return { success: false, message: "Invalid token" }
  }
}

// Function to send OTP for Aadhaar login (mock implementation)
export function sendAadhaarOTP(aadhaarNumber) {
  // Check if user with this Aadhaar exists
  const user = users.find((user) => user.aadhaar === aadhaarNumber)
  if (!user) {
    return { success: false, message: "No user found with this Aadhaar number" }
  }

  // In a real implementation, this would call an SMS gateway or Aadhaar API
  // For demo purposes, we'll just return a success response
  return {
    success: true,
    message: "OTP sent to registered mobile number",
    // In a real app, you'd generate and store this OTP, here we're just using a fixed value
    mockOtp: "123456",
  }
}

// Function to verify Aadhaar OTP
export function verifyAadhaarOTP(aadhaarNumber, otp) {
  // Find user with this Aadhaar
  const user = users.find((user) => user.aadhaar === aadhaarNumber)
  if (!user) {
    return { success: false, message: "Invalid Aadhaar number" }
  }

  // In a real app, you'd verify against the stored OTP
  // For demo, we'll just check against the fixed value
  if (otp !== "123456") {
    return { success: false, message: "Invalid OTP" }
  }

  // Generate JWT token on successful verification
  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: "24h" },
  )

  return {
    success: true,
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  }
}

console.log("Auth API loaded")
