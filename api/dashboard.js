import { getAllFIRs, getFIRStatistics } from "./fir.js"

// Function to get dashboard data for users
export function getUserDashboardData(userId) {
  try {
    // In a real app, you would query this data from a database
    // For this demo, we're generating mock data

    // Get user FIRs (in a real app, this would be filtered from the database)
    const userFIRs = [
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

    // Calculate statistics
    const totalFIRs = userFIRs.length
    const activeFIRs = userFIRs.filter((fir) => fir.status !== "Resolved" && fir.status !== "Rejected").length
    const resolvedFIRs = userFIRs.filter((fir) => fir.status === "Resolved").length
    const firsThisMonth = userFIRs.length // In a real app, filter by date

    // Recent activity
    const recentActivity = [
      {
        type: "status_update",
        firId: "FIR123456789",
        timestamp: "2 hours ago",
      },
      {
        type: "case_resolved",
        firId: "FIR789123456",
        timestamp: "3 days ago",
      },
    ]

    // Upcoming appointments
    const appointments = [
      {
        id: "APT123",
        officer: "Inspector Sharma",
        date: "Aug 30, 2023",
        time: "11:00 AM",
        location: "Andheri Police Station",
        regarding: "FIR123456789",
      },
    ]

    return {
      success: true,
      dashboard: {
        statistics: {
          totalFIRs,
          activeFIRs,
          resolvedFIRs,
          firsThisMonth,
        },
        recentFIRs: userFIRs.slice(0, 3), // Recent 3 FIRs
        allFIRs: userFIRs,
        recentActivity,
        appointments,
      },
    }
  } catch (error) {
    console.error("Error getting user dashboard data:", error)
    return { success: false, message: "Failed to retrieve dashboard data" }
  }
}

// Function to get dashboard data for admin
export function getAdminDashboardData() {
  try {
    // Get statistics
    const stats = getFIRStatistics()

    if (!stats.success) {
      return { success: false, message: "Failed to retrieve statistics" }
    }

    // Get all FIRs for admin view
    const allFIRs = getAllFIRs()

    if (!allFIRs.success) {
      return { success: false, message: "Failed to retrieve FIRs" }
    }

    // Top officers (in a real app, this would be calculated from the database)
    const topOfficers = [
      {
        name: "Inspector Sharma",
        id: "OFF001",
        cases: 45,
      },
      {
        name: "Inspector Patel",
        id: "OFF002",
        cases: 38,
      },
      {
        name: "Inspector Singh",
        id: "OFF003",
        cases: 32,
      },
    ]

    // Monthly progress (in a real app, this would be calculated from the database)
    const monthlyProgress = {
      newFIRs: 32,
      activeFIRs: 78,
      resolvedFIRs: 23,
    }

    // Case distribution by type
    const caseDistribution = {
      Theft: 34,
      Assault: 22,
      Cybercrime: 18,
      Fraud: 15,
      Others: 11,
    }

    return {
      success: true,
      dashboard: {
        statistics: stats.statistics,
        allFIRs: allFIRs.firs,
        topOfficers,
        monthlyProgress,
        caseDistribution,
      },
    }
  } catch (error) {
    console.error("Error getting admin dashboard data:", error)
    return { success: false, message: "Failed to retrieve admin dashboard data" }
  }
}

console.log("Dashboard API loaded")
