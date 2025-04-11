import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, MapPin } from "lucide-react"
import Link from "next/link"

// Mock data for recent FIRs
const recentFIRs = [
  {
    id: "FIR123456789",
    date: "15 Aug 2023",
    time: "10:30 AM",
    type: "Theft",
    location: "Andheri West, Mumbai",
    status: "Under Investigation",
  },
  {
    id: "FIR987654321",
    date: "10 Aug 2023",
    time: "3:45 PM",
    type: "Cybercrime",
    location: "Online Transaction",
    status: "Evidence Collection",
  },
  {
    id: "FIR456789123",
    date: "5 Aug 2023",
    time: "9:15 AM",
    type: "Assault",
    location: "Juhu Beach, Mumbai",
    status: "Witness Statement",
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

export default function RecentFIRs() {
  return (
    <div className="space-y-4">
      {recentFIRs.map((fir) => (
        <Card key={fir.id} className="overflow-hidden hover:shadow-md">
          <CardContent className="p-0">
            <Link href={`/track-fir?id=${fir.id}`} className="block">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{fir.id}</h3>
                  <Badge className={getStatusColor(fir.status)}>{fir.status}</Badge>
                </div>
                <div className="mt-2">
                  <p className="font-medium">{fir.type}</p>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{fir.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{fir.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{fir.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
