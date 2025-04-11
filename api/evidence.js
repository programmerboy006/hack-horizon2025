import crypto from "crypto"

// Mock database for evidence files
const evidenceFiles = [
  {
    id: "ev-001",
    firId: "FIR987654321",
    fileName: "bank_statement.pdf",
    fileType: "application/pdf",
    fileSize: 1240000,
    uploadDate: "2023-08-10T16:30:00Z",
    description: "Bank statement showing unauthorized transaction",
    uploadedBy: "1",
    contentHash: "cf23df2207d99a74fbe169e3eba035e633b65d94",
    status: "Active",
  },
  {
    id: "ev-002",
    firId: "FIR987654321",
    fileName: "transaction_screenshot.png",
    fileType: "image/png",
    fileSize: 540000,
    uploadDate: "2023-08-10T16:35:00Z",
    description: "Screenshot of the fraudulent transaction",
    uploadedBy: "1",
    contentHash: "ab65d94cf23df2207d99a74fbe169e3eba035e63",
    status: "Active",
  },
]

// Function to upload a new evidence file
export function uploadEvidence(userId, firId, fileData, fileDescription) {
  try {
    // Generate a unique ID for the evidence
    const evidenceId = `ev-${crypto.randomBytes(3).toString("hex")}`

    // Get current date and time
    const uploadDate = new Date().toISOString()

    // In a real app, you would handle the actual file upload to S3, Azure, etc.
    // and calculate the real file hash

    // Calculate a mock content hash
    const contentHash = crypto
      .createHash("sha1")
      .update(fileData.fileName + uploadDate)
      .digest("hex")

    // Create the evidence file object
    const newEvidence = {
      id: evidenceId,
      firId,
      fileName: fileData.fileName,
      fileType: fileData.fileType,
      fileSize: fileData.fileSize,
      uploadDate,
      description: fileDescription,
      uploadedBy: userId,
      contentHash,
      status: "Active",
    }

    // Add to database (in a real app, this would be a database insert)
    evidenceFiles.push(newEvidence)

    return {
      success: true,
      evidenceId,
      message: "Evidence uploaded successfully",
    }
  } catch (error) {
    console.error("Error uploading evidence:", error)
    return { success: false, message: "Failed to upload evidence" }
  }
}

// Function to get evidence files for a specific FIR
export function getFIREvidence(firId) {
  try {
    const firEvidence = evidenceFiles.filter((evidence) => evidence.firId === firId)

    return {
      success: true,
      evidence: firEvidence,
    }
  } catch (error) {
    console.error("Error getting FIR evidence:", error)
    return { success: false, message: "Failed to retrieve evidence" }
  }
}

// Function to verify evidence file integrity
export function verifyEvidenceIntegrity(evidenceId, providedHash) {
  try {
    const evidence = evidenceFiles.find((evidence) => evidence.id === evidenceId)

    if (!evidence) {
      return { success: false, message: "Evidence not found" }
    }

    // Compare the stored hash with the provided hash
    const isIntegrityVerified = evidence.contentHash === providedHash

    return {
      success: true,
      isIntegrityVerified,
      message: isIntegrityVerified ? "Evidence integrity verified" : "Evidence integrity check failed",
    }
  } catch (error) {
    console.error("Error verifying evidence integrity:", error)
    return { success: false, message: "Failed to verify evidence integrity" }
  }
}

// Function to delete an evidence file (admin only)
export function deleteEvidence(evidenceId) {
  try {
    const evidenceIndex = evidenceFiles.findIndex((evidence) => evidence.id === evidenceId)

    if (evidenceIndex === -1) {
      return { success: false, message: "Evidence not found" }
    }

    // In a real app, you might not actually delete the record but mark it as deleted
    evidenceFiles[evidenceIndex].status = "Deleted"

    return {
      success: true,
      message: "Evidence deleted successfully",
    }
  } catch (error) {
    console.error("Error deleting evidence:", error)
    return { success: false, message: "Failed to delete evidence" }
  }
}

console.log("Evidence API loaded")
