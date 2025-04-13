"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Calendar, Search, UserCircle, FileText, MessageSquare, History, Clock } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DoctorAvailabilityManager } from "@/components/doctor-availability-manager"

export default function DoctorDashboard() {
  const [patientCode, setPatientCode] = useState("")
  const [patientFound, setPatientFound] = useState(false)
  const [isAvailable, setIsAvailable] = useState(true)
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [showInteractionDetails, setShowInteractionDetails] = useState(false)
  const [showPrescriptionHistory, setShowPrescriptionHistory] = useState(false)
  const [showAvailabilityManager, setShowAvailabilityManager] = useState(false)

  const handleSearchPatient = (e) => {
    e.preventDefault()
    // In a real app, this would search the database
    if (patientCode) {
      setPatientFound(true)
      setSelectedPatient({
        id: patientCode,
        name: "John Doe",
        age: 35,
        gender: "Male",
        visitCount: 3,
        allergies: ["Penicillin"],
        history: [
          { date: "2023-03-15", diagnosis: "Common Cold", doctor: "Dr. Emily Chen", visitNumber: 2 },
          { date: "2022-11-10", diagnosis: "Seasonal Allergies", doctor: "Dr. James Wilson", visitNumber: 1 },
        ],
        currentMedications: [
          {
            name: "Amoxicillin",
            dosage: "500mg",
            prescribedBy: "Dr. Sarah Brown",
            hospital: "City General Hospital",
            expirationDate: "2024-04-01",
          },
          {
            name: "Ibuprofen",
            dosage: "400mg",
            prescribedBy: "Dr. Emily Chen",
            hospital: "Metro Medical Center",
            expirationDate: "2025-01-15",
          },
        ],
        prescriptionHistory: [
          {
            id: "RX78901",
            doctor: "Dr. Emily Chen",
            date: "2023-04-01",
            medications: [
              {
                name: "Amoxicillin",
                dosage: "500mg",
                frequency: "3 times daily",
                duration: "7 days",
                expirationDate: "2024-04-01",
              },
              {
                name: "Ibuprofen",
                dosage: "400mg",
                frequency: "As needed",
                duration: "5 days",
                expirationDate: "2025-01-15",
              },
            ],
            status: "Active",
          },
          {
            id: "RX45678",
            doctor: "Dr. Amith Raj",
            date: "2023-03-15",
            medications: [
              {
                name: "Loratadine",
                dosage: "10mg",
                frequency: "Once daily",
                duration: "30 days",
                expirationDate: "2023-05-10",
              },
            ],
            status: "Active",
          },
          {
            id: "RX12345",
            doctor: "Dr. Emily Chen",
            date: "2023-02-10",
            medications: [
              {
                name: "Amoxicillin",
                dosage: "500mg",
                frequency: "3 times daily",
                duration: "10 days",
                expirationDate: "2023-04-15",
              },
            ],
            status: "Completed",
          },
          {
            id: "RX98765",
            doctor: "Dr. Robert Smith",
            date: "2023-01-20",
            medications: [
              {
                name: "Atorvastatin",
                dosage: "20mg",
                frequency: "Once daily",
                duration: "90 days",
                expirationDate: "2024-01-20",
              },
              {
                name: "Aspirin",
                dosage: "81mg",
                frequency: "Once daily",
                duration: "90 days",
                expirationDate: "2024-01-20",
              },
            ],
            status: "Completed",
          },
        ],
      })
    }
  }

  const appointments = [
    { patient: "Jane Smith", time: "9:00 AM", status: "Completed", visitNumber: 2 },
    { patient: "Michael Johnson", time: "10:30 AM", status: "Completed", visitNumber: 1 },
    { patient: "Emily Davis", time: "1:00 PM", status: "Waiting", visitNumber: 3 },
    { patient: "Robert Wilson", time: "2:30 PM", status: "Scheduled", visitNumber: 1 },
    { patient: "Sarah Brown", time: "4:00 PM", status: "Scheduled", visitNumber: 5 },
  ]

  return (
    <DashboardLayout title="Doctor Dashboard" userRole="Doctor" userName="Dr. Emily Chen">
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Availability Status</CardTitle>
            <CardDescription>Set your current availability status for appointments.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch id="availability" checked={isAvailable} onCheckedChange={setIsAvailable} />
                <Label htmlFor="availability" className="font-medium">
                  {isAvailable ? "Available" : "On Leave"}
                </Label>
              </div>
              <Button
                variant="outline"
                onClick={() => setShowAvailabilityManager(true)}
                className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
              >
                <Clock className="mr-2 h-4 w-4" />
                Manage Schedule
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Your appointments for today.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{appointments.length}</div>
                <p className="text-xs text-muted-foreground">
                  {appointments.filter((a) => a.status === "Completed").length} completed,{" "}
                  {appointments.filter((a) => a.status !== "Completed").length} remaining
                </p>
              </div>
              <div>
                <Button variant="outline" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  View All
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {showAvailabilityManager && <DoctorAvailabilityManager onClose={() => setShowAvailabilityManager(false)} />}

      <Tabs defaultValue="search" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="search">Patient Search</TabsTrigger>
          <TabsTrigger value="appointments">Today's Appointments</TabsTrigger>
        </TabsList>

        <TabsContent value="search">
          <Card>
            <CardHeader>
              <CardTitle>Search Patient</CardTitle>
              <CardDescription>
                Enter patient code to access their medical records and prescribe medications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearchPatient} className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter patient code"
                    value={patientCode}
                    onChange={(e) => setPatientCode(e.target.value)}
                  />
                  <Button type="submit">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </div>
              </form>

              {patientFound && selectedPatient && (
                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/50">
                    <div className="p-2 rounded-full bg-indigo-100">
                      <UserCircle className="h-12 w-12 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">{selectedPatient.name}</h3>
                      <p className="text-sm text-gray-500">
                        {selectedPatient.age} years • {selectedPatient.gender} • Patient ID: {selectedPatient.id}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                          Visit #{selectedPatient.visitCount}
                        </Badge>
                        {selectedPatient.allergies.map((allergy, idx) => (
                          <Badge key={idx} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            Allergic to {allergy}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="ml-auto">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowPrescriptionHistory(true)}
                            className="flex items-center gap-2"
                          >
                            <History className="h-4 w-4" />
                            Prescription History
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>Prescription History - {selectedPatient.name}</DialogTitle>
                          </DialogHeader>

                          <div className="space-y-4 max-h-[60vh] overflow-y-auto p-1">
                            {selectedPatient.prescriptionHistory.map((prescription) => (
                              <div key={prescription.id} className="border rounded-lg overflow-hidden">
                                <div className="bg-muted p-4 flex justify-between items-center">
                                  <div>
                                    <h3 className="font-medium">{prescription.doctor}</h3>
                                    <p className="text-sm text-gray-500">
                                      {prescription.date} • Prescription ID: {prescription.id}
                                    </p>
                                  </div>
                                  <Badge
                                    variant="outline"
                                    className={
                                      prescription.status === "Active"
                                        ? "bg-green-50 text-green-700 border-green-200"
                                        : "bg-gray-50 text-gray-700 border-gray-200"
                                    }
                                  >
                                    {prescription.status}
                                  </Badge>
                                </div>
                                <div className="p-4">
                                  <div className="space-y-2 mb-4">
                                    {prescription.medications.map((med, idx) => (
                                      <div key={idx} className="p-3 bg-muted/50 rounded-md">
                                        <div className="font-medium">
                                          {med.name} {med.dosage}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                          {med.frequency} for {med.duration}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">Expires: {med.expirationDate}</div>
                                      </div>
                                    ))}
                                  </div>

                                  <div className="flex justify-end">
                                    <Button variant="outline" size="sm">
                                      <FileText className="mr-2 h-4 w-4" />
                                      View Full Prescription
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>

                  <Card className="mb-6 border-red-200 bg-red-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-red-700 flex items-center">
                        <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
                        Potential Drug Interaction Warning
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-red-100 text-red-700 border-red-300">
                            High Risk
                          </Badge>
                          <span className="font-medium">Current medications may have dangerous interactions</span>
                        </div>
                        <p className="text-sm text-red-700">
                          Amoxicillin + Ibuprofen may increase the risk of gastrointestinal bleeding. Consider
                          alternative medications or additional monitoring.
                        </p>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            className="border-red-300 text-red-700 hover:bg-red-100 hover:text-red-800"
                            onClick={() => setShowInteractionDetails(!showInteractionDetails)}
                          >
                            {showInteractionDetails ? "Hide Details" : "View Details"}
                          </Button>
                          <Button
                            variant="outline"
                            className="border-red-300 text-red-700 hover:bg-red-100 hover:text-red-800"
                          >
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Contact Prescribing Doctor
                          </Button>
                        </div>

                        {showInteractionDetails && (
                          <div className="mt-3 p-3 bg-white rounded-md border border-red-200">
                            <h4 className="font-medium text-red-800 mb-2">Medication Details:</h4>
                            <div className="space-y-2">
                              {selectedPatient.currentMedications.map((med, idx) => (
                                <div key={idx} className="text-sm">
                                  <div className="font-medium">
                                    {med.name} {med.dosage}
                                  </div>
                                  <div className="text-gray-600">Prescribed by: {med.prescribedBy}</div>
                                  <div className="text-gray-600">Hospital: {med.hospital}</div>
                                  <div className="text-gray-600">Expires: {med.expirationDate}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-2">
                    <h3 className="font-medium">Medical History</h3>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-4 p-3 font-medium">
                        <div>Date</div>
                        <div>Diagnosis</div>
                        <div>Doctor</div>
                        <div>Visit #</div>
                      </div>
                      {selectedPatient.history.map((record, idx) => (
                        <div key={idx} className="grid grid-cols-4 p-3 border-t">
                          <div>{record.date}</div>
                          <div>{record.diagnosis}</div>
                          <div>{record.doctor}</div>
                          <div>{record.visitNumber}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <h3 className="font-medium">Lab Reports</h3>
                    <div className="rounded-md border p-4">
                      <h4 className="text-sm font-medium mb-3">Blood Work Results (2023-03-28)</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Blood Pressure</span>
                            <span className="font-medium text-red-600">160/95 mmHg</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Heart Rate</span>
                            <span className="font-medium">78 bpm</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Cholesterol (Total)</span>
                            <span className="font-medium text-amber-600">240 mg/dL</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Glucose (Fasting)</span>
                            <span className="font-medium">92 mg/dL</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Potassium</span>
                            <span className="font-medium">4.2 mEq/L</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Creatinine</span>
                            <span className="font-medium text-amber-600">1.3 mg/dL</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Prescribe Medication</h3>
                    <div className="space-y-2">
                      <Label htmlFor="diagnosis">Diagnosis</Label>
                      <Input id="diagnosis" placeholder="Enter diagnosis" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="medication">Medication</Label>
                      <Select>
                        <SelectTrigger id="medication">
                          <SelectValue placeholder="Select medication" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="amoxicillin">Amoxicillin 500mg</SelectItem>
                          <SelectItem value="ibuprofen">Ibuprofen 400mg</SelectItem>
                          <SelectItem value="loratadine">Loratadine 10mg</SelectItem>
                          <SelectItem value="omeprazole">Omeprazole 20mg</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="frequency">Frequency</Label>
                        <Select>
                          <SelectTrigger id="frequency">
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="once">Once daily</SelectItem>
                            <SelectItem value="twice">Twice daily</SelectItem>
                            <SelectItem value="three">Three times daily</SelectItem>
                            <SelectItem value="four">Four times daily</SelectItem>
                            <SelectItem value="asneeded">As needed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration</Label>
                        <Select>
                          <SelectTrigger id="duration">
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3days">3 days</SelectItem>
                            <SelectItem value="5days">5 days</SelectItem>
                            <SelectItem value="7days">7 days</SelectItem>
                            <SelectItem value="10days">10 days</SelectItem>
                            <SelectItem value="14days">14 days</SelectItem>
                            <SelectItem value="30days">30 days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="expiration">Expiration Date</Label>
                        <Input
                          id="expiration"
                          type="date"
                          defaultValue={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea id="notes" placeholder="Additional notes or instructions" />
                    </div>

                    <div className="flex gap-3">
                      <Button className="flex-1">Create Prescription</Button>
                      <Button variant="outline" className="flex-1">
                        <FileText className="mr-2 h-4 w-4" />
                        Save as PDF
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>Today's Appointments</CardTitle>
              <CardDescription>Your scheduled appointments for today.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((appointment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-indigo-100">
                        <UserCircle className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{appointment.patient}</h4>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-gray-500">{appointment.time}</p>
                          <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                            Visit #{appointment.visitNumber}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Badge
                        variant="outline"
                        className={
                          appointment.status === "Completed"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : appointment.status === "Waiting"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-blue-50 text-blue-700 border-blue-200"
                        }
                      >
                        {appointment.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
