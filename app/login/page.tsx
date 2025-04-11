"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield } from "lucide-react"

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

const aadhaarSchema = z.object({
  aadhaarNumber: z
    .string()
    .min(12, { message: "Aadhaar number must be 12 digits" })
    .max(12, { message: "Aadhaar number must be 12 digits" })
    .regex(/^[0-9]+$/, { message: "Aadhaar number must contain only digits" }),
})

const otpSchema = z.object({
  otp: z
    .string()
    .min(6, { message: "OTP must be 6 digits" })
    .max(6, { message: "OTP must be 6 digits" })
    .regex(/^[0-9]+$/, { message: "OTP must contain only digits" }),
})

export default function LoginPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("password")
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [otpSent, setOtpSent] = useState(false)

  // Password login form
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // Aadhaar login form
  const aadhaarForm = useForm<z.infer<typeof aadhaarSchema>>({
    resolver: zodResolver(aadhaarSchema),
    defaultValues: {
      aadhaarNumber: "",
    },
  })

  // OTP form
  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  })

  // Password login handler
  function onLoginSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values)
    // Simulate a successful login
    router.push("/dashboard")
  }

  // Aadhaar login handler - request OTP
  function onAadhaarSubmit(values: z.infer<typeof aadhaarSchema>) {
    console.log("Requesting OTP for Aadhaar:", values.aadhaarNumber)
    // Show OTP input after Aadhaar verification
    setOtpSent(true)
    setShowOtpInput(true)
  }

  // OTP verification handler
  function onOtpSubmit(values: z.infer<typeof otpSchema>) {
    console.log("Verifying OTP:", values.otp)
    // Simulate a successful verification
    router.push("/dashboard")
  }

  return (
    <div className="container flex h-screen items-center justify-center">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Shield className="h-12 w-12 text-blue-600" />
          <h1 className="text-3xl font-bold">Virtual Police Station</h1>
          <p className="text-muted-foreground">Sign in to access the FIR filing and tracking system</p>
        </div>

        <Tabs defaultValue="password" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="password">Email & Password</TabsTrigger>
            <TabsTrigger value="aadhaar">Aadhaar OTP</TabsTrigger>
          </TabsList>

          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Login with Email</CardTitle>
                <CardDescription>Enter your email and password to sign in</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="you@example.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input placeholder="••••••••" type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      Sign In
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex flex-col items-center space-y-2">
                <div className="text-sm text-muted-foreground">
                  <Link href="/forgot-password" className="text-blue-600 hover:underline">
                    Forgot your password?
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="aadhaar">
            <Card>
              <CardHeader>
                <CardTitle>Aadhaar OTP Login</CardTitle>
                <CardDescription>Verify your identity with Aadhaar OTP verification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!showOtpInput ? (
                  <Form {...aadhaarForm}>
                    <form onSubmit={aadhaarForm.handleSubmit(onAadhaarSubmit)} className="space-y-4">
                      <FormField
                        control={aadhaarForm.control}
                        name="aadhaarNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Aadhaar Number</FormLabel>
                            <FormControl>
                              <Input placeholder="123456789012" maxLength={12} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full">
                        Request OTP
                      </Button>
                    </form>
                  </Form>
                ) : (
                  <Form {...otpForm}>
                    <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-4">
                      {otpSent && (
                        <Alert className="bg-green-50">
                          <AlertDescription className="text-green-600">
                            OTP has been sent to your registered mobile number
                          </AlertDescription>
                        </Alert>
                      )}
                      <FormField
                        control={otpForm.control}
                        name="otp"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Enter OTP</FormLabel>
                            <FormControl>
                              <Input placeholder="123456" maxLength={6} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowOtpInput(false)}
                          className="flex-1"
                        >
                          Back
                        </Button>
                        <Button type="submit" className="flex-1">
                          Verify OTP
                        </Button>
                      </div>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Don&apos;t have an account?</span>{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  )
}
