"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, AlertCircle } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

// Mock data for FIR tracking
const mockFIR = {
  id: "FIR123456789",
  status: "Under Investigation",
  date: "2023-08-15",
  type: "Theft",
  station: "Andheri Police Station",
  officer: {
    name: "Inspector Sharma",
    badge: "ID4578",
    contact: "022-28576453",
  },
  timeline: [
    {
      date: "Aug 15, 2023 - 10:30 AM",
      status: "FIR Filed",
      description: "FIR successfully registered in the system",
    },
    {
      date: "Aug 15, 2023 - 2:45 PM",
      status: "Assigned",
      description: "Case assigned to Inspector Sharma for investigation",
    },
    {
      date: "Aug 17, 2023 - 11:15 AM",
      status: "Evidence Collection",
      description: "Initial evidence collected from the scene",
    },
    {
      date: "Aug 20, 2023 - 3:30 PM",
      status: "Witness Statement",
      description: "Witness statements recorded",
    },
    {
      date: "Aug 25, 2023 - 5:00 PM",
      status: "Under Investigation",
      description: "Case under active investigation",
    },
  ],
}

// Status color mapping
const statusColors: Record<string, string> = {
  "FIR Filed": "bg-blue-500",
  Assigned: "bg-purple-500",
  "Evidence Collection": "bg-amber-500",
  "Witness Statement": "bg-cyan-500",
  "Under Investigation": "bg-orange-500",
  Transferred: "bg-indigo-500",
  Closed: "bg-green-500",
  Rejected: "bg-red-500",
}

export default function TrackFIRPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [loading, setLoading] = useState(false)
  const [firFound, setFirFound] = useState(false)
  const [error, setError] = useState("")
  const [firData, setFirData] = useState<any>(null)

  const handleSearchById = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simulate API call with delay
    setTimeout(() => {
      setLoading(false)

      if (searchQuery === "FIR123456789") {
        setFirFound(true)
        setFirData(mockFIR)
      } else {
        setFirFound(false)
        setError("No FIR found with the provided ID. Please check and try again.")
      }
    }, 1500)
  }

  const handleSearchByPhone = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simulate API call with delay
    setTimeout(() => {
      setLoading(false)

      if (phoneNumber === "9876543210") {
        setFirFound(true)
        setFirData(mockFIR)
      } else {
        setFirFound(false)
        setError("No FIR found associated with this phone number. Please check and try again.")
      }
    }, 1500)
  }

  return (
    <div className="container mx-auto max-w-3xl py-8">
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Track Your FIR</h1>
          <Search className="h-8 w-8 text-blue-600" />
        </div>
        <p className="text-muted-foreground">
          Track the status of your filed FIR using the FIR ID or your registered phone number.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>FIR Tracking</CardTitle>
          <CardDescription>Enter your FIR ID or phone number to check the status of your complaint</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="fir-id" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="fir-id">Search by FIR ID</TabsTrigger>
              <TabsTrigger value="phone">Search by Phone Number</TabsTrigger>
            </TabsList>
            <TabsContent value="fir-id">
              <form onSubmit={handleSearchById} className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fir-id">FIR ID</Label>
                  <Input
                    id="fir-id"
                    placeholder="Enter FIR ID (e.g., FIR123456789)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading || !searchQuery}>
                  {loading ? "Searching..." : "Track FIR"}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="phone">
              <form onSubmit={handleSearchByPhone} className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone-number">Registered Phone Number</Label>
                  <Input
                    id="phone-number"
                    placeholder="Enter your registered phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading || !phoneNumber}>
                  {loading ? "Searching..." : "Track FIR"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {error && (
            <div className="mt-6 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
              <AlertCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {firFound && firData && (
        <Card className="mt-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>FIR Details</CardTitle>
                <CardDescription>Tracking information for {firData.id}</CardDescription>
              </div>
              <Badge className="text-md bg-orange-500 px-3 py-1">{firData.status}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <h3 className="font-semibold">FIR Information</h3>
                <div className="space-y-2 rounded-lg bg-muted/50 p-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">FIR Number:</span>
                    <span className="font-medium">{firData.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Filing Date:</span>
                    <span className="font-medium">{firData.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Complaint Type:</span>
                    <span className="font-medium">{firData.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Police Station:</span>
                    <span className="font-medium">{firData.station}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">Investigating Officer</h3>
                <div className="flex items-center gap-4 rounded-lg bg-muted/50 p-3">
                  <Avatar className="h-16 w-16 border">
                    <AvatarFallback className="text-lg">
                      {firData.officer.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1 text-sm">
                    <p className="font-medium">{firData.officer.name}</p>
                    <p className="text-muted-foreground">Badge: {firData.officer.badge}</p>
                    <p className="text-muted-foreground">Contact: {firData.officer.contact}</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="font-semibold">Case Timeline</h3>
              <div className="rounded-lg border bg-card p-3">
                <ol className="relative space-y-6 border-l border-muted-foreground/20 py-2 pl-6">
                  {firData.timeline.map((event: any, index: number) => (
                    <li key={index} className="relative">
                      <div
                        className={`absolute -left-[30px] flex h-6 w-6 items-center justify-center rounded-full border ${
                          statusColors[event.status] || "bg-gray-500"
                        }`}
                      >
                        <div className="h-2 w-2 rounded-full bg-white"></div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{event.status}</span>
                          <span className="text-xs text-muted-foreground">{event.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col space-y-2">
            <p className="text-xs text-muted-foreground">
              For any updates or queries related to this FIR, please contact the investigating officer or visit{" "}
              {firData.station}. You can also call the helpline at 100 for emergency assistance.
            </p>
            <div className="flex justify-between">
              <Button variant="outline" className="gap-2">
                <FileText className="h-4 w-4" />
                Download FIR Copy
              </Button>
              <Button className="gap-2">Schedule Appointment</Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
