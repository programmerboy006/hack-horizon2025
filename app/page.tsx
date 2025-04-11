import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText, ShieldAlert, User, Calendar, BarChart3 } from "lucide-react"
import StatsCard from "@/components/stats-card"
import RecentFIRs from "@/components/recent-firs"

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-10">
      {/* Hero Section */}
      <section className="flex flex-col rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white md:flex-row md:items-center md:justify-between">
        <div className="mb-6 space-y-4 md:mb-0 md:max-w-xl">
          <h1 className="text-3xl font-bold md:text-5xl">Virtual Police Station</h1>
          <p className="text-blue-100 md:text-lg">
            File and track your FIRs securely from anywhere. An innovative platform designed to make the process
            transparent and accessible.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" variant="secondary" className="font-medium text-blue-700" asChild>
              <Link href="/file-fir">File an FIR</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white font-medium text-white hover:bg-white/20"
              asChild
            >
              <Link href="/track-fir">Track your FIR</Link>
            </Button>
          </div>
        </div>
        <div className="max-w-xs md:max-w-sm">
          <img
            src="/placeholder.svg?height=240&width=280"
            alt="Virtual Police Station"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Filed FIRs"
          value="2,845"
          icon={<FileText className="h-6 w-6 text-blue-500" />}
          trend="+12% from last month"
        />
        <StatsCard
          title="Resolved Cases"
          value="1,658"
          icon={<ShieldAlert className="h-6 w-6 text-green-500" />}
          trend="+8% from last month"
        />
        <StatsCard
          title="Active Users"
          value="5,290"
          icon={<User className="h-6 w-6 text-purple-500" />}
          trend="+24% from last month"
        />
        <StatsCard
          title="Avg. Response Time"
          value="18 hrs"
          icon={<Calendar className="h-6 w-6 text-orange-500" />}
          trend="-15% from last month"
        />
      </section>

      {/* Recent FIRs Section */}
      <section className="grid gap-6 lg:grid-cols-7">
        <div className="space-y-6 lg:col-span-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recent FIRs</h2>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard">View All</Link>
            </Button>
          </div>
          <RecentFIRs />
        </div>

        <div className="space-y-6 lg:col-span-3">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Crime Statistics</h2>
            <Button variant="outline" size="sm" asChild>
              <Link href="/statistics">Full Report</Link>
            </Button>
          </div>
          <div className="overflow-hidden rounded-xl border bg-card p-6 shadow">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-medium">Crime Distribution</h3>
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Theft</span>
                  <span className="font-medium">38%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 w-[38%] rounded-full bg-blue-500"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Assault</span>
                  <span className="font-medium">24%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 w-[24%] rounded-full bg-red-500"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Cybercrime</span>
                  <span className="font-medium">21%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 w-[21%] rounded-full bg-purple-500"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Other</span>
                  <span className="font-medium">17%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 w-[17%] rounded-full bg-gray-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Key Features</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border bg-card p-6 shadow transition-all hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Easy FIR Filing</h3>
            <p className="text-muted-foreground">
              Simple and intuitive interface to file your FIR with step-by-step guidance.
            </p>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow transition-all hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <ShieldAlert className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Secure & Private</h3>
            <p className="text-muted-foreground">
              Your information is encrypted and securely stored with proper authentication protocols.
            </p>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow transition-all hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Real-time Tracking</h3>
            <p className="text-muted-foreground">
              Track the status of your FIR in real-time with updates at every stage of the process.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
