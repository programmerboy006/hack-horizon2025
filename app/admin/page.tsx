"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { FileText, User, ArrowUpRight, BarChart3, Search, Filter, MessagesSquare, FileWarning } from "lucide-react"
import Link from "next/link"

// Mock data for FIRs
const mockFIRs = [
  {
    id: "FIR123456789",
    date: "15 Aug 2023",
    complainant: "Rahul Sharma",
    phone: "9876543210",
    type: "Theft",
    location: "Andheri West, Mumbai",
    status: "Under Investigation",
    priority: "Medium",
    assigned: "Inspector Sharma",
  },
  {
    id: "FIR987654321",
    date: "10 Aug 2023",
    complainant: "Priya Patel",
    phone: "9876543211",
    type: "Cybercrime",
    location: "Online Transaction",
    status: "Evidence Collection",
    priority: "High",
    assigned: "Inspector Patel",
  },
  {
    id: "FIR456789123",
    date: "5 Aug 2023",
    complainant: "Amit Singh",
    phone: "9876543212",
    type: "Assault",
    location: "Juhu Beach, Mumbai",
    status: "Witness Statement",
    priority: "High",
    assigned: "Inspector Singh",
  },
  {
    id: "FIR789123456",
    date: "1 Aug 2023",
    complainant: "Neha Khanna",
    phone: "9876543213",
    type: "Fraud",
    location: "Bank Transaction",
    status: "Resolved",
    priority: "Medium",
    assigned: "Inspector Khanna",
  },
  {
    id: "FIR234567891",
    date: "28 Jul 2023",
    complainant: "Vikram Malhotra",
    phone: "9876543214",
    type: "Property Dispute",
    location: "Bandra, Mumbai",
    status: "Filed",
    priority: "Low",
    assigned: "Unassigned",
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

// Priority badge color mapping
const getPriorityColor = (priority: string) => {
  const priorityMap: Record<string, string> = {
    High: "bg-red-100 text-red-800 hover:bg-red-200",
    Medium: "bg-amber-100 text-amber-800 hover:bg-amber-200",
    Low: "bg-green-100 text-green-800 hover:bg-green-200",
  }

  return priorityMap[priority] || "bg-gray-100 text-gray-800 hover:bg-gray-200"
}

export default function AdminDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter FIRs based on search query and status filter
  const filteredFIRs = mockFIRs.filter((fir) => {
    const matchesSearch =
      fir.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fir.complainant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fir.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fir.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || fir.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="container mx-auto max-w-7xl space-y-8 pb-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage and track all FIR cases</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            Generate Report
          </Button>
          <Button className="gap-2">
            <User className="h-4 w-4" />
            Manage Officers
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total FIRs</p>
                <p className="text-3xl font-bold">124</p>
              </div>
              <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                <FileText className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              <span className="font-medium text-green-500">12%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Cases</p>
                <p className="text-3xl font-bold">78</p>
              </div>
              <div className="rounded-full bg-amber-100 p-3 text-amber-600">
                <FileWarning className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              <span className="font-medium text-green-500">8%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Resolved Cases</p>
                <p className="text-3xl font-bold">42</p>
              </div>
              <div className="rounded-full bg-green-100 p-3 text-green-600">
                <MessagesSquare className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              <span className="font-medium text-green-500">24%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Officers Assigned</p>
                <p className="text-3xl font-bold">18</p>
              </div>
              <div className="rounded-full bg-purple-100 p-3 text-purple-600">
                <User className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <span>out of 24 officers</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Case Management</CardTitle>
            <CardDescription>Review and manage all FIR cases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by FIR ID, complainant, type..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select defaultValue="all" onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="Status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Filed">Filed</SelectItem>
                    <SelectItem value="Under Investigation">Under Investigation</SelectItem>
                    <SelectItem value="Evidence Collection">Evidence Collection</SelectItem>
                    <SelectItem value="Witness Statement">Witness Statement</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="rounded-lg border shadow">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-3 text-left text-sm font-medium">FIR ID</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Complainant</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Priority</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Assigned To</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFIRs.map((fir, index) => (
                      <tr key={fir.id} className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-muted/30"}`}>
                        <td className="whitespace-nowrap px-4 py-4 text-sm font-medium">{fir.id}</td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm">
                          <div>
                            <p>{fir.complainant}</p>
                            <p className="text-xs text-muted-foregroun">{fir.phone}</p>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm">{fir.type}</td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm">
                          <Badge className={getStatusColor(fir.status)}>{fir.status}</Badge>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm">
                          <Badge variant="outline" className={getPriorityColor(fir.priority)}>
                            {fir.priority}
                          </Badge>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm">
                          {fir.assigned === "Unassigned" ? (
                            <span className="text-amber-500">Unassigned</span>
                          ) : (
                            fir.assigned
                          )}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/admin/fir/${fir.id}`}>View</Link>
                            </Button>
                            <Button size="sm" asChild>
                              <Link href={`/admin/fir/${fir.id}/edit`}>Update</Link>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between bg-muted/30 px-4 py-3">
                <div className="text-sm text-muted-foreground">
                  Showing 1-{filteredFIRs.length} of {filteredFIRs.length} results
                </div>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Station Statistics</CardTitle>
            <CardDescription>Overview of case distribution by type</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Case Distribution</h4>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Theft</span>
                    <span className="font-medium">34%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 w-[34%] rounded-full bg-blue-500"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Assault</span>
                    <span className="font-medium">22%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 w-[22%] rounded-full bg-red-500"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Cybercrime</span>
                    <span className="font-medium">18%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 w-[18%] rounded-full bg-purple-500"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Fraud</span>
                    <span className="font-medium">15%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 w-[15%] rounded-full bg-amber-500"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Others</span>
                    <span className="font-medium">11%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 w-[11%] rounded-full bg-gray-500"></div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-6">
              <h4 className="text-sm font-medium">Monthly Case Status</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-1 rounded-lg bg-amber-50 p-3 text-amber-900">
                  <p className="text-xs font-medium uppercase text-amber-700">New</p>
                  <p className="text-2xl font-bold">32</p>
                </div>
                <div className="space-y-1 rounded-lg bg-purple-50 p-3 text-purple-900">
                  <p className="text-xs font-medium uppercase text-purple-700">Active</p>
                  <p className="text-2xl font-bold">78</p>
                </div>
                <div className="space-y-1 rounded-lg bg-green-50 p-3 text-green-900">
                  <p className="text-xs font-medium uppercase text-green-700">Resolved</p>
                  <p className="text-2xl font-bold">23</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="text-sm font-medium">Top Performing Officers</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>IS</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">Inspector Sharma</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500">45 cases</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>IP</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">Inspector Patel</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500">38 cases</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>IS</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">Inspector Singh</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500">32 cases</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
