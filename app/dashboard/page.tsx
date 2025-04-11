"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, Clock, FileText, MapPin, Filter, Download, CheckCircle2, Clock4, XCircle } from "lucide-react"
import Link from "next/link"

// Mock data for FIRs
const mockFIRs = [
  {
    id: "FIR123456789",
    date: "15 Aug 2023",
    time: "10:30 AM",
    type: "Theft",
    location: "Andheri West, Mumbai",
    status: "Under Investigation",
    officer: "Inspector Sharma",
  },
  {
    id: "FIR987654321",
    date: "10 Aug 2023",
    time: "3:45 PM",
    type: "Cybercrime",
    location: "Online Transaction",
    status: "Evidence Collection",
    officer: "Inspector Patel",
  },
  {
    id: "FIR456789123",
    date: "5 Aug 2023",
    time: "9:15 AM",
    type: "Assault",
    location: "Juhu Beach, Mumbai",
    status: "Witness Statement",
    officer: "Inspector Singh",
  },
  {
    id: "FIR789123456",
    date: "1 Aug 2023",
    time: "2:00 PM",
    type: "Fraud",
    location: "Bank Transaction",
    status: "Resolved",
    officer: "Inspector Khanna",
  },
]

// Status badge color mapping
const getStatusColor = (status: string) => {
  const statusMap: Record<string, string> = {
    Filed: "bg-blue-500 hover:bg-blue-600",
    "Under Investigation": "bg-orange-500 hover:bg-orange-600",
    "Evidence Collection": "bg-amber-500 hover:bg-amber-600",
    "Witness Statement": "bg-cyan-500 hover:bg-cyan-600",
    Transferred: "bg-indigo-500 hover:bg-indigo-600",
    Resolved: "bg-green-500 hover:bg-green-600",
    Rejected: "bg-red-500 hover:bg-red-600",
  }

  return statusMap[status] || "bg-gray-500 hover:bg-gray-600"
}

export default function DashboardPage() {
  return (
    <div className="container mx-auto max-w-7xl space-y-8 pb-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold">Your Dashboard</h1>
          <p className="text-muted-foreground">Track and manage your FIR cases</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button className="gap-2">
            <FileText className="h-4 w-4" />
            File New FIR
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Case Overview</CardTitle>
            <CardDescription>Summary of your FIR cases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1 rounded-lg bg-muted p-3 text-center">
                <p className="text-xs font-medium text-muted-foreground">Total Cases</p>
                <p className="text-2xl font-bold">4</p>
              </div>
              <div className="space-y-1 rounded-lg bg-amber-100 p-3 text-center text-amber-800">
                <p className="text-xs font-medium">Active</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <div className="space-y-1 rounded-lg bg-green-100 p-3 text-center text-green-800">
                <p className="text-xs font-medium">Resolved</p>
                <p className="text-2xl font-bold">1</p>
              </div>
              <div className="space-y-1 rounded-lg bg-blue-100 p-3 text-center text-blue-800">
                <p className="text-xs font-medium">This Month</p>
                <p className="text-2xl font-bold">4</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="mb-2 text-sm font-medium">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-lg border p-3 text-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                    <Clock4 className="h-4 w-4" />
                  </div>
                  <div>
                    <p>Case status updated</p>
                    <p className="text-xs text-muted-foreground">FIR123456789 - 2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border p-3 text-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <p>Case resolved</p>
                    <p className="text-xs text-muted-foreground">FIR789123456 - 3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Your FIRs</CardTitle>
                <CardDescription>Track the status of your filed complaints</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4 grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="resolved">Resolved</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-4">
                {mockFIRs.map((fir) => (
                  <div
                    key={fir.id}
                    className="flex flex-col justify-between gap-4 rounded-lg border p-4 sm:flex-row sm:items-center"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{fir.id}</h3>
                        <Badge className={getStatusColor(fir.status)}>{fir.status}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{fir.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{fir.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{fir.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium">Type:</span>
                        <span>{fir.type}</span>
                        <span className="font-medium ml-4">Officer:</span>
                        <span>{fir.officer}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 self-end sm:self-center">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/track-fir?id=${fir.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="active" className="space-y-4">
                {mockFIRs
                  .filter((fir) => fir.status !== "Resolved" && fir.status !== "Rejected")
                  .map((fir) => (
                    <div
                      key={fir.id}
                      className="flex flex-col justify-between gap-4 rounded-lg border p-4 sm:flex-row sm:items-center"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{fir.id}</h3>
                          <Badge className={getStatusColor(fir.status)}>{fir.status}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{fir.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{fir.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{fir.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium">Type:</span>
                          <span>{fir.type}</span>
                          <span className="font-medium ml-4">Officer:</span>
                          <span>{fir.officer}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 self-end sm:self-center">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/track-fir?id=${fir.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
              </TabsContent>
              <TabsContent value="resolved" className="space-y-4">
                {mockFIRs
                  .filter((fir) => fir.status === "Resolved")
                  .map((fir) => (
                    <div
                      key={fir.id}
                      className="flex flex-col justify-between gap-4 rounded-lg border p-4 sm:flex-row sm:items-center"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{fir.id}</h3>
                          <Badge className={getStatusColor(fir.status)}>{fir.status}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{fir.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{fir.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{fir.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium">Type:</span>
                          <span>{fir.type}</span>
                          <span className="font-medium ml-4">Officer:</span>
                          <span>{fir.officer}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 self-end sm:self-center">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/track-fir?id=${fir.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
              </TabsContent>
              <TabsContent value="rejected" className="space-y-4">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <XCircle className="mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="mb-2 text-lg font-medium">No Rejected FIRs</h3>
                  <p className="mb-6 max-w-sm text-sm text-muted-foreground">
                    You don&apos;t have any rejected FIRs at the moment. If you think there&apos;s an issue, please
                    contact the relevant police station.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>Your scheduled meetings with officers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border">
              <div className="flex items-center gap-4 border-b p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div className="space-y-1">
                  <p className="font-medium">Meeting with Inspector Sharma</p>
                  <div className="flex gap-2 text-xs text-muted-foreground">
                    <span>Aug 30, 2023</span>
                    <span>•</span>
                    <span>11:00 AM</span>
                    <span>•</span>
                    <span>Andheri Police Station</span>
                  </div>
                  <Badge variant="outline" className="mt-1 text-xs">
                    Regarding FIR123456789
                  </Badge>
                </div>
              </div>
              <div className="p-4 text-center">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/appointments">Schedule New Appointment</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Important Contacts</CardTitle>
            <CardDescription>Emergency and helpline numbers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <Avatar className="h-12 w-12 border bg-red-100">
                  <AvatarFallback className="text-red-600 text-lg">112</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Emergency Helpline</p>
                  <p className="text-sm text-muted-foreground">For immediate police assistance</p>
                  <p className="mt-1 text-lg font-bold text-red-600">112</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <Avatar className="h-12 w-12 border bg-blue-100">
                  <AvatarFallback className="text-blue-600 text-lg">WH</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Women Helpline</p>
                  <p className="text-sm text-muted-foreground">For women in distress</p>
                  <p className="mt-1 text-lg font-bold text-blue-600">181</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <Avatar className="h-12 w-12 border bg-green-100">
                  <AvatarFallback className="text-green-600 text-lg">CC</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Cyber Crime Helpline</p>
                  <p className="text-sm text-muted-foreground">For reporting cyber crimes</p>
                  <p className="mt-1 text-lg font-bold text-green-600">1930</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
