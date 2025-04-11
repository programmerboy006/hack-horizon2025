// Mock database for FIRs
const firs = [
  {
    id: "FIR123456789",
    userId: "1",
    personalInfo: {
      name: "Rahul Sharma",
      phone: "9876543210",
      email: "rahul@example.com",
      address: "123 Andheri East",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400069",
      idType: "aadhaar",
      idNumber: "123456789012",
    },
    incidentDetails: {
      incidentType: "theft",
      incidentDate: "2023-08-15",
      incidentTime: "10:30",
      incidentLocation: "Andheri West, Mumbai",
      incidentDescription: "My mobile phone was stolen while traveling in a crowded bus.",
      suspectsInfo: "The suspect was a young man wearing a black t-shirt",
      witnessInfo: "No witnesses",
      propertyDetails: "iPhone 13 Pro, Space Grey, 256GB",
    },
    evidenceDetails: {
      evidenceFiles: false,
      evidenceDescription: "No physical evidence available",
    },
    status: "Under Investigation",
    filingDate: "2023-08-15T10:30:00Z",
    priority: "Medium",
    assignedTo: "Inspector Sharma",
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
  },
  {
    id: "FIR987654321",
    userId: "1",
    personalInfo: {
      name: "Priya Patel",
      phone: "9876543211",
      email: "priya@example.com",
      address: "456 Juhu Beach",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400049",
      idType: "pan",
      idNumber: "ABCDE1234F",
    },
    incidentDetails: {
      incidentType: "cybercrime",
      incidentDate: "2023-08-10",
      incidentTime: "15:45",
      incidentLocation: "Online Transaction",
      incidentDescription: "Unauthorized transaction from my bank account.",
      suspectsInfo: "₹15,000 transferred to an unknown account",
      witnessInfo: "",
      propertyDetails: "Bank transaction details available",
    },
    evidenceDetails: {
      evidenceFiles: true,
      evidenceDescription: "Bank statement and screenshot of transaction",
    },
    status: "Evidence Collection",
    filingDate: "2023-08-10T15:45:00Z",
    priority: "High",
    assignedTo: "Inspector Patel",
    timeline: [
      {
        date: "Aug 10, 2023 - 03:45 PM",
        status: "FIR Filed",
        description: "FIR successfully registered in the system",
      },
      {
        date: "Aug 10, 2023 - 06:30 PM",
        status: "Assigned",
        description: "Case assigned to Inspector Patel for investigation",
      },
      {
        date: "Aug 12, 2023 - 10:00 AM",
        status: "Evidence Collection",
        description: "Bank statements collected and transaction details analyzed",
      },
    ],
  },
]

// Function to file a new FIR
export function fileFIR(userId, firData) {
  try {
    // Generate a unique ID for the FIR
    const firId = `FIR${Math.floor(Math.random() * 900000000) + 100000000}`

    // Get current date and time
    const filingDate = new Date().toISOString()

    // Create the FIR object
    const newFIR = {
      id: firId,
      userId,
      ...firData,
      status: "Filed",
      filingDate,
      priority: "Medium", // Default priority
      assignedTo: "Unassigned",
      timeline: [
        {
          date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
          status: "FIR Filed",
          description: "FIR successfully registered in the system",
        },
      ],
    }

    // Add to database (in a real app, this would be a database insert)
    firs.push(newFIR)

    return {
      success: true,
      firId,
      message: "FIR filed successfully",
    }
  } catch (error) {
    console.error("Error filing FIR:", error)
    return { success: false, message: "Failed to file FIR" }
  }
}

// Function to get a specific FIR by ID
export function getFIR(firId) {
  try {
    const fir = firs.find((fir) => fir.id === firId)

    if (!fir) {
      return { success: false, message: "FIR not found" }
    }

    return {
      success: true,
      fir,
    }
  } catch (error) {
    console.error("Error getting FIR:", error)
    return { success: false, message: "Failed to retrieve FIR" }
  }
}

// Function to get FIRs by user ID
export function getUserFIRs(userId) {
  try {
    const userFIRs = firs.filter((fir) => fir.userId === userId)

    return {
      success: true,
      firs: userFIRs,
    }
  } catch (error) {
    console.error("Error getting user FIRs:", error)
    return { success: false, message: "Failed to retrieve user FIRs" }
  }
}

// Function to get FIRs by phone number
export function getFIRsByPhone(phoneNumber) {
  try {
    const matchingFIRs = firs.filter((fir) => fir.personalInfo.phone === phoneNumber)

    return {
      success: true,
      firs: matchingFIRs,
    }
  } catch (error) {
    console.error("Error getting FIRs by phone:", error)
    return { success: false, message: "Failed to retrieve FIRs by phone number" }
  }
}

// Function to update FIR status (admin only)
export function updateFIRStatus(firId, status, description) {
  try {
    const fir = firs.find((fir) => fir.id === firId)

    if (!fir) {
      return { success: false, message: "FIR not found" }
    }

    // Update status
    fir.status = status

    // Add to timeline
    fir.timeline.push({
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
      status,
      description,
    })

    return {
      success: true,
      message: "FIR status updated successfully",
    }
  } catch (error) {
    console.error("Error updating FIR status:", error)
    return { success: false, message: "Failed to update FIR status" }
  }
}

// Function to assign FIR to an officer (admin only)
export function assignFIR(firId, officerName) {
  try {
    const fir = firs.find((fir) => fir.id === firId)

    if (!fir) {
      return { success: false, message: "FIR not found" }
    }

    // Update assigned officer
    fir.assignedTo = officerName

    // Add to timeline
    fir.timeline.push({
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
      status: "Assigned",
      description: `Case assigned to ${officerName} for investigation`,
    })

    return {
      success: true,
      message: "FIR assigned successfully",
    }
  } catch (error) {
    console.error("Error assigning FIR:", error)
    return { success: false, message: "Failed to assign FIR" }
  }
}

// Function to get all FIRs (admin only)
export function getAllFIRs() {
  try {
    return {
      success: true,
      firs,
    }
  } catch (error) {
    console.error("Error getting all FIRs:", error)
    return { success: false, message: "Failed to retrieve all FIRs" }
  }
}

// Function to get FIR statistics (admin only)
export function getFIRStatistics() {
  try {
    // Count FIRs by status
    const statusCounts = firs.reduce((acc, fir) => {
      acc[fir.status] = (acc[fir.status] || 0) + 1
      return acc
    }, {})

    // Count FIRs by type
    const typeCounts = firs.reduce((acc, fir) => {
      const type = fir.incidentDetails.incidentType
      acc[type] = (acc[type] || 0) + 1
      return acc
    }, {})

    // Get total count
    const totalFIRs = firs.length

    // Get active count (not resolved or rejected)
    const activeFIRs = firs.filter((fir) => fir.status !== "Resolved" && fir.status !== "Rejected").length

    // Get resolved count
    const resolvedFIRs = firs.filter((fir) => fir.status === "Resolved").length

    return {
      success: true,
      statistics: {
        total: totalFIRs,
        active: activeFIRs,
        resolved: resolvedFIRs,
        byStatus: statusCounts,
        byType: typeCounts,
      },
    }
  } catch (error) {
    console.error("Error getting FIR statistics:", error)
    return { success: false, message: "Failed to retrieve FIR statistics" }
  }
}

console.log("FIR API loaded")
