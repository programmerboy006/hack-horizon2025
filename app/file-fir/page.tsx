"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, FileText, FileUp, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const personalInfoSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .regex(/^[0-9]+$/, { message: "Phone number must contain only digits" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  address: z.string().min(10, { message: "Address must be at least 10 characters" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  pincode: z
    .string()
    .min(6, { message: "Pincode must be 6 digits" })
    .max(6, { message: "Pincode must be 6 digits" })
    .regex(/^[0-9]+$/, { message: "Pincode must contain only digits" }),
  idType: z.string().min(1, { message: "ID Type is required" }),
  idNumber: z.string().min(5, { message: "ID Number is required" }),
})

const incidentDetailsSchema = z.object({
  incidentType: z.string().min(1, { message: "Incident type is required" }),
  incidentDate: z.string().min(1, { message: "Date is required" }),
  incidentTime: z.string().min(1, { message: "Time is required" }),
  incidentLocation: z.string().min(5, { message: "Location is required" }),
  incidentDescription: z.string().min(50, { message: "Description must be at least 50 characters" }),
  suspectsInfo: z.string().optional(),
  witnessInfo: z.string().optional(),
  propertyDetails: z.string().optional(),
})

const evidenceSchema = z.object({
  evidenceFiles: z.boolean().optional(),
  evidenceDescription: z.string().min(5, { message: "Description is required for evidence" }),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
})

const steps = ["Personal Information", "Incident Details", "Evidence & Review"]

export default function FileFIRPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [isGeneratingDraft, setIsGeneratingDraft] = useState(false)
  const [generatedDraft, setGeneratedDraft] = useState("")

  const personalInfoForm = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      idType: "",
      idNumber: "",
    },
  })

  const incidentDetailsForm = useForm<z.infer<typeof incidentDetailsSchema>>({
    resolver: zodResolver(incidentDetailsSchema),
    defaultValues: {
      incidentType: "",
      incidentDate: "",
      incidentTime: "",
      incidentLocation: "",
      incidentDescription: "",
      suspectsInfo: "",
      witnessInfo: "",
      propertyDetails: "",
    },
  })

  const evidenceForm = useForm<z.infer<typeof evidenceSchema>>({
    resolver: zodResolver(evidenceSchema),
    defaultValues: {
      evidenceFiles: false,
      evidenceDescription: "",
      termsAccepted: false,
    },
  })

  function onPersonalInfoSubmit(values: z.infer<typeof personalInfoSchema>) {
    setFormData((prev) => ({ ...prev, ...values }))
    setStep(1)
  }

  function onIncidentDetailsSubmit(values: z.infer<typeof incidentDetailsSchema>) {
    setFormData((prev) => ({ ...prev, ...values }))
    setStep(2)
  }

  function onEvidenceSubmit(values: z.infer<typeof evidenceSchema>) {
    setFormData((prev) => ({ ...prev, ...values }))
    handleFinalSubmit()
  }

  function handleFinalSubmit() {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsCompleted(true)

      // Redirect to confirmation page after 2 seconds
      setTimeout(() => {
        router.push("/fir-confirmation?id=FIR123456789")
      }, 2000)
    }, 3000)
  }

  function generateFIRDraft() {
    setIsGeneratingDraft(true)
    // Simulate AI generating a draft
    setTimeout(() => {
      const draft = `
On [${incidentDetailsForm.getValues().incidentDate}] at approximately [${incidentDetailsForm.getValues().incidentTime}], I, [${personalInfoForm.getValues().name}], was a victim of [${incidentDetailsForm.getValues().incidentType}] at [${incidentDetailsForm.getValues().incidentLocation}].

${incidentDetailsForm.getValues().incidentDescription}

${incidentDetailsForm.getValues().suspectsInfo ? `The potential suspect(s) in this incident: ${incidentDetailsForm.getValues().suspectsInfo}` : ""}

${incidentDetailsForm.getValues().witnessInfo ? `Witness information: ${incidentDetailsForm.getValues().witnessInfo}` : ""}

${incidentDetailsForm.getValues().propertyDetails ? `Details about property involved: ${incidentDetailsForm.getValues().propertyDetails}` : ""}

I can be contacted at [${personalInfoForm.getValues().phone}] or [${personalInfoForm.getValues().email}]. My current address is [${personalInfoForm.getValues().address}, ${personalInfoForm.getValues().city}, ${personalInfoForm.getValues().state} - ${personalInfoForm.getValues().pincode}].

I hereby declare that the information provided above is true and accurate to the best of my knowledge.
      `

      setGeneratedDraft(draft)
      setIsGeneratingDraft(false)
      incidentDetailsForm.setValue("incidentDescription", draft)
    }, 3000)
  }

  return (
    <div className="container mx-auto max-w-3xl py-8">
      {!isCompleted ? (
        <>
          <div className="mb-8 space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">File a First Information Report (FIR)</h1>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-muted-foreground">
              Please provide accurate information about yourself and the incident. All fields marked with * are
              required.
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">
                  Step {step + 1} of 3: {steps[step]}
                </span>
                <span className="text-muted-foreground">{Math.round(((step + 1) / 3) * 100)}% completed</span>
              </div>
              <Progress value={((step + 1) / 3) * 100} className="h-2" />
            </div>
          </div>

          {step === 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Provide your contact details for FIR processing</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...personalInfoForm}>
                  <form onSubmit={personalInfoForm.handleSubmit(onPersonalInfoSubmit)} className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={personalInfoForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={personalInfoForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number *</FormLabel>
                            <FormControl>
                              <Input placeholder="9876543210" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={personalInfoForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={personalInfoForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Complete Address *</FormLabel>
                          <FormControl>
                            <Textarea placeholder="House/Flat No., Street, Locality" {...field} rows={3} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid gap-4 md:grid-cols-3">
                      <FormField
                        control={personalInfoForm.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City *</FormLabel>
                            <FormControl>
                              <Input placeholder="Mumbai" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={personalInfoForm.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State *</FormLabel>
                            <FormControl>
                              <Input placeholder="Maharashtra" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={personalInfoForm.control}
                        name="pincode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pincode *</FormLabel>
                            <FormControl>
                              <Input placeholder="400001" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />

                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={personalInfoForm.control}
                        name="idType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ID Type *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select ID type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="aadhaar">Aadhaar Card</SelectItem>
                                <SelectItem value="pan">PAN Card</SelectItem>
                                <SelectItem value="voter">Voter ID</SelectItem>
                                <SelectItem value="driving">Driving License</SelectItem>
                                <SelectItem value="passport">Passport</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={personalInfoForm.control}
                        name="idNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ID Number *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter ID number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button type="submit" className="gap-2">
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Incident Details</CardTitle>
                <CardDescription>Provide information about the incident</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...incidentDetailsForm}>
                  <form onSubmit={incidentDetailsForm.handleSubmit(onIncidentDetailsSubmit)} className="space-y-6">
                    <FormField
                      control={incidentDetailsForm.control}
                      name="incidentType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type of Incident *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select incident type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="theft">Theft/Robbery</SelectItem>
                              <SelectItem value="assault">Assault/Violence</SelectItem>
                              <SelectItem value="fraud">Fraud/Cheating</SelectItem>
                              <SelectItem value="cybercrime">Cybercrime</SelectItem>
                              <SelectItem value="missing">Missing Person/Item</SelectItem>
                              <SelectItem value="accident">Accident</SelectItem>
                              <SelectItem value="property">Property Dispute</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={incidentDetailsForm.control}
                        name="incidentDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date of Incident *</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={incidentDetailsForm.control}
                        name="incidentTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Time of Incident *</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={incidentDetailsForm.control}
                      name="incidentLocation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Incident Location *</FormLabel>
                          <FormControl>
                            <Input placeholder="Provide the address/location where the incident occurred" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <FormLabel htmlFor="incidentDescription">Detailed Description of the Incident *</FormLabel>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={generateFIRDraft}
                          disabled={
                            !personalInfoForm.getValues().name ||
                            !incidentDetailsForm.getValues().incidentType ||
                            !incidentDetailsForm.getValues().incidentDate ||
                            !incidentDetailsForm.getValues().incidentTime ||
                            !incidentDetailsForm.getValues().incidentLocation ||
                            isGeneratingDraft
                          }
                          className="text-xs"
                        >
                          {isGeneratingDraft ? "Generating..." : "Generate Draft with AI"}
                        </Button>
                      </div>
                      <FormField
                        control={incidentDetailsForm.control}
                        name="incidentDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                placeholder="Provide a detailed description of what happened. Include all relevant information."
                                {...field}
                                rows={6}
                              />
                            </FormControl>
                            <FormDescription>
                              Be specific about what happened, when it happened, and who was involved (if known).
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={incidentDetailsForm.control}
                      name="suspectsInfo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Information about Suspect(s) (if any)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Provide any information about the suspect(s) - appearance, clothing, vehicle, etc."
                              {...field}
                              rows={3}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={incidentDetailsForm.control}
                      name="witnessInfo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Witness Information (if any)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Provide details of any witnesses - names, contact information, etc."
                              {...field}
                              rows={3}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={incidentDetailsForm.control}
                      name="propertyDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Property/Items Involved (if applicable)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe any property or items involved - value, description, identification marks, etc."
                              {...field}
                              rows={3}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={() => setStep(0)} className="gap-2">
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </Button>
                      <Button type="submit" className="gap-2">
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Evidence & Review</CardTitle>
                <CardDescription>Upload any evidence and review your FIR details</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...evidenceForm}>
                  <form onSubmit={evidenceForm.handleSubmit(onEvidenceSubmit)} className="space-y-6">
                    <div className="rounded-lg border border-dashed border-muted-foreground/50 p-6 text-center">
                      <FileUp className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                      <h3 className="mb-1 text-lg font-medium">Upload Evidence</h3>
                      <p className="text-sm text-muted-foreground">
                        Drag and drop files or click to upload photos, videos, or documents related to the incident.
                      </p>
                      <Button type="button" variant="outline" className="mt-4">
                        Select Files
                      </Button>
                      <FormField
                        control={evidenceForm.control}
                        name="evidenceFiles"
                        render={({ field }) => (
                          <FormItem className="mt-2">
                            <div className="flex items-center space-x-2">
                              <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <label className="text-sm font-medium">
                                I don&apos;t have any files to upload at the moment
                              </label>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={evidenceForm.control}
                      name="evidenceDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description of Evidence *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe any evidence you are providing or might provide later"
                              {...field}
                              rows={3}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Separator />

                    <div className="space-y-6">
                      <div>
                        <h3 className="mb-2 text-lg font-medium">Review Your Information</h3>
                        <div className="rounded-lg border bg-muted/30 p-4">
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium">Personal Information</h4>
                              <div className="mt-2 grid gap-1 text-sm">
                                <div className="grid grid-cols-3">
                                  <span className="text-muted-foreground">Name:</span>
                                  <span className="col-span-2">{personalInfoForm.getValues().name}</span>
                                </div>
                                <div className="grid grid-cols-3">
                                  <span className="text-muted-foreground">Contact:</span>
                                  <span className="col-span-2">
                                    {personalInfoForm.getValues().phone}, {personalInfoForm.getValues().email}
                                  </span>
                                </div>
                                <div className="grid grid-cols-3">
                                  <span className="text-muted-foreground">Address:</span>
                                  <span className="col-span-2">
                                    {personalInfoForm.getValues().address}, {personalInfoForm.getValues().city},{" "}
                                    {personalInfoForm.getValues().state} - {personalInfoForm.getValues().pincode}
                                  </span>
                                </div>
                                <div className="grid grid-cols-3">
                                  <span className="text-muted-foreground">ID:</span>
                                  <span className="col-span-2">
                                    {personalInfoForm.getValues().idType}: {personalInfoForm.getValues().idNumber}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium">Incident Details</h4>
                              <div className="mt-2 grid gap-1 text-sm">
                                <div className="grid grid-cols-3">
                                  <span className="text-muted-foreground">Type:</span>
                                  <span className="col-span-2">{incidentDetailsForm.getValues().incidentType}</span>
                                </div>
                                <div className="grid grid-cols-3">
                                  <span className="text-muted-foreground">Date & Time:</span>
                                  <span className="col-span-2">
                                    {incidentDetailsForm.getValues().incidentDate} at{" "}
                                    {incidentDetailsForm.getValues().incidentTime}
                                  </span>
                                </div>
                                <div className="grid grid-cols-3">
                                  <span className="text-muted-foreground">Location:</span>
                                  <span className="col-span-2">{incidentDetailsForm.getValues().incidentLocation}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <FormField
                        control={evidenceForm.control}
                        name="termsAccepted"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-start space-x-3">
                              <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Declaration *</FormLabel>
                                <FormDescription>
                                  I hereby declare that the information provided in this FIR is true and accurate to the
                                  best of my knowledge. I understand that providing false information is punishable by
                                  law.
                                </FormDescription>
                              </div>
                            </div>
                            <FormMessage className="mt-2" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={() => setStep(1)} className="gap-2">
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </Button>
                      <Button type="submit" className="gap-2" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit FIR"}
                        {!isSubmitting && <ArrowRight className="h-4 w-4" />}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <Card className="flex flex-col items-center p-8 text-center">
          <CheckCircle2 className="mb-4 h-16 w-16 text-green-500" />
          <h2 className="mb-2 text-2xl font-bold">FIR Submitted Successfully</h2>
          <p className="mb-6 text-muted-foreground">
            Your FIR has been submitted successfully. You will be redirected to the confirmation page shortly.
          </p>
          <p className="text-lg font-semibold text-blue-600">FIR ID: FIR123456789</p>
        </Card>
      )}
    </div>
  )
}
