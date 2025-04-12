"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  AlertTriangle,
  Activity,
  Thermometer,
  Heart,
  Droplet,
  Bell,
  CheckCircle,
  Clock,
  Calendar,
} from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"

export default function NurseDashboard() {
  const [patientId, setPatientId] = useState("")
  const [patientFound, setPatientFound] = useState(false)
  const [showVitalsForm, setShowVitalsForm] = useState(false)
  const [selectedWard, setSelectedWard] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showPatientDetails, setShowPatientDetails] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [showMedicationDialog, setShowMedicationDialog] = useState(false)
  const [selectedMedication, setSelectedMedication] = useState(null)

  const handleSearchPatient = (e) => {
    e.preventDefault()
    // In a real app, this would search the database
    if (patientId) {
      setPatientFound(true)
    }
  }

  const handleSubmitVitals = (e) => {
    e.preventDefault()
    // In a real app, this would save the vitals to the database
    alert("Vitals submitted successfully!")
    setShowVitalsForm(false)
  }

  const viewPatientDetails = (patient) => {
    setSelectedPatient(patient)
    setShowPatientDetails(true)
  }

  const administeredMedication = (medication) => {
    setSelectedMedication(medication)
    setShowMedicationDialog(true)
  }

  const wards = [
    { id: "ward1", name: "General Ward", beds: 20, occupancy: 15 },
    { id: "ward2", name: "ICU", beds: 10, occupancy: 8 },
    { id: "ward3", name: "Pediatric Ward", beds: 15, occupancy: 10 },
    { id: "ward4", name: "Maternity Ward", beds: 12, occupancy: 7 },
  ]

  const patients = [
    {
      id: "PT123456",
      name: "Sneha Patel",
      age: 32,
      gender: "Female",
      bed: "12A",
      ward: "General Ward",
      admissionDate: "2023-03-28",
      diagnosis: "Typhoid Fever",
      status: "Stable",
      vitals: [
        {
          time: "6:00 AM",
          temperature: "98.6°F",
          bloodPressure: "120/80",
          pulse: "78",
          respiratoryRate: "16",
          spo2: "97%",
        },
        {
          time: "12:00 PM",
          temperature: "99.1°F",
          bloodPressure: "118/82",
          pulse: "80",
          respiratoryRate: "18",
          spo2: "96%",
        },
      ],
    },
    {
      id: "PT789012",
      name: "Rahul Sharma",
      age: 45,
      gender: "Male",
      bed: "05B",
      ward: "ICU",
      admissionDate: "2023-03-30",
      diagnosis: "Myocardial Infarction",
      status: "Critical",
      vitals: [
        {
          time: "6:00 AM",
          temperature: "98.8°F",
          bloodPressure: "135/85",
          pulse: "88",
          respiratoryRate: "20",
          spo2: "94%",
        },
        {
          time: "12:00 PM",
          temperature: "99.0°F",
          bloodPressure: "140/90",
          pulse: "90",
          respiratoryRate: "22",
          spo2: "93%",
        },
      ],
    },
    {
      id: "PT345678",
      name: "Priya Singh",
      age: 28,
      gender: "Female",
      bed: "08C",
      ward: "Maternity Ward",
      admissionDate: "2023-04-01",
      diagnosis: "Post-Partum Care",
      status: "Stable",
      vitals: [
        {
          time: "6:00 AM",
          temperature: "98.4°F",
          bloodPressure: "110/70",
          pulse: "72",
          respiratoryRate: "16",
          spo2: "98%",
        },
      ],
    },
    {
      id: "PT901234",
      name: "Arjun Patel",
      age: 7,
      gender: "Male",
      bed: "03A",
      ward: "Pediatric Ward",
      admissionDate: "2023-03-29",
      diagnosis: "Acute Bronchitis",
      status: "Improving",
      vitals: [
        {
          time: "6:00 AM",
          temperature: "99.5°F",
          bloodPressure: "100/60",
          pulse: "100",
          respiratoryRate: "24",
          spo2: "95%",
        },
        {
          time: "12:00 PM",
          temperature: "99.0°F",
          bloodPressure: "100/65",
          pulse: "95",
          respiratoryRate: "22",
          spo2: "96%",
        },
      ],
    },
    {
      id: "PT567890",
      name: "Meera Reddy",
      age: 65,
      gender: "Female",
      bed: "15D",
      ward: "General Ward",
      admissionDate: "2023-03-25",
      diagnosis: "Diabetic Ketoacidosis",
      status: "Stable",
      vitals: [
        {
          time: "6:00 AM",
          temperature: "98.2°F",
          bloodPressure: "145/85",
          pulse: "76",
          respiratoryRate: "18",
          spo2: "97%",
        },
        {
          time: "12:00 PM",
          temperature: "98.4°F",
          bloodPressure: "140/80",
          pulse: "74",
          respiratoryRate: "18",
          spo2: "97%",
        },
      ],
    },
  ]

  const medicationSchedules = [
    {
      patientId: "PT123456",
      patientName: "Sneha Patel",
      bed: "12A",
      ward: "General Ward",
      medications: [
        {
          name: "Ceftriaxone",
          dosage: "1g",
          route: "IV",
          frequency: "BD",
          time: "6:00 AM",
          status: "Administered",
        },
        {
          name: "Ceftriaxone",
          dosage: "1g",
          route: "IV",
          frequency: "BD",
          time: "6:00 PM",
          status: "Due",
        },
        {
          name: "DNS",
          dosage: "500ml",
          route: "IV",
          frequency: "TDS",
          time: "2:00 PM",
          status: "Due",
        },
      ],
    },
    {
      patientId: "PT789012",
      patientName: "Rahul Sharma",
      bed: "05B",
      ward: "ICU",
      medications: [
        {
          name: "Aspirin",
          dosage: "75mg",
          route: "Oral",
          frequency: "OD",
          time: "8:00 AM",
          status: "Administered",
        },
        {
          name: "Heparin",
          dosage: "5000 IU",
          route: "SC",
          frequency: "TDS",
          time: "2:00 PM",
          status: "Due",
        },
        {
          name: "Atorvastatin",
          dosage: "40mg",
          route: "Oral",
          frequency: "OD",
          time: "8:00 PM",
          status: "Due",
        },
      ],
    },
  ]

  const vitalHistory = [
    {
      patientId: "PT123456",
      patientName: "Sneha Patel",
      time: "6:00 AM",
      temperature: "98.6°F",
      bloodPressure: "120/80",
      pulse: "78",
      respiratoryRate: "16",
      spo2: "97%",
      recordedBy: "Nurse Sarah",
    },
    {
      patientId: "PT123456",
      patientName: "Sneha Patel",
      time: "12:00 PM",
      temperature: "99.1°F",
      bloodPressure: "118/82",
      pulse: "80",
      respiratoryRate: "18",
      spo2: "96%",
      recordedBy: "Nurse Sarah",
    },
    {
      patientId: "PT789012",
      patientName: "Rahul Sharma",
      time: "6:00 AM",
      temperature: "98.8°F",
      bloodPressure: "135/85",
      pulse: "88",
      respiratoryRate: "20",
      spo2: "94%",
      recordedBy: "Nurse Michael",
    },
  ]

  const filteredPatients = patients.filter(
    (patient) =>
      (selectedWard === "all" || patient.ward === selectedWard) &&
      (patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.diagnosis.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <DashboardLayout title="Nurse Dashboard" userRole="Nurse" userName="Sarah Johnson">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {wards.map((ward) => (
          <Card key={ward.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{ward.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {ward.occupancy}/{ward.beds}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round((ward.occupancy / ward.beds) * 100)}% occupancy
              </p>
              <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    ward.occupancy / ward.beds > 0.9
                      ? "bg-red-500"
                      : ward.occupancy / ward.beds > 0.7
                        ? "bg-amber-500"
                        : "bg-green-500"
                  }`}
                  style={{ width: `${(ward.occupancy / ward.beds) * 100}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="patients" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="vitals">Record Vitals</TabsTrigger>
          <TabsTrigger value="medications">Medication Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="patients">
          <Card>
            <CardHeader>
              <CardTitle>Ward Patients</CardTitle>
              <CardDescription>View and manage patients in your assigned wards.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search patients by name, ID, or diagnosis"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-48">
                  <Select value={selectedWard} onValueChange={setSelectedWard}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by ward" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Wards</SelectItem>
                      {wards.map((ward) => (
                        <SelectItem key={ward.id} value={ward.name}>
                          {ward.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Bed</TableHead>
                      <TableHead>Ward</TableHead>
                      <TableHead>Diagnosis</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPatients.map((patient) => (
                      <TableRow key={patient.id}>
                        <TableCell className="font-medium">{patient.id}</TableCell>
                        <TableCell>
                          {patient.name}
                          <div className="text-xs text-gray-500">
                            {patient.age} years • {patient.gender}
                          </div>
                        </TableCell>
                        <TableCell>{patient.bed}</TableCell>
                        <TableCell>{patient.ward}</TableCell>
                        <TableCell>{patient.diagnosis}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              patient.status === "Critical"
                                ? "bg-red-50 text-red-700 border-red-200"
                                : patient.status === "Stable"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : "bg-amber-50 text-amber-700 border-amber-200"
                            }
                          >
                            {patient.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => viewPatientDetails(patient)}>
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              Record Vitals
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vitals">
          <Card>
            <CardHeader>
              <CardTitle>Record Patient Vitals</CardTitle>
              <CardDescription>Search for a patient and record their vital signs.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearchPatient} className="space-y-4 mb-6">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter patient ID"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                  />
                  <Button type="submit">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </div>
              </form>

              {patientFound && (
                <div className="space-y-6">
                  <div className="p-4 border rounded-lg bg-muted/50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Sneha Patel</h3>
                        <p className="text-sm text-gray-500">32 years • Female • Patient ID: {patientId}</p>
                        <p className="text-sm text-gray-500">Bed: 12A • Ward: General Ward</p>
                        <p className="text-sm text-gray-500">Diagnosis: Typhoid Fever</p>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Stable
                      </Badge>
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" onClick={() => setShowVitalsForm(!showVitalsForm)}>
                        {showVitalsForm ? "Cancel" : "Record New Vitals"}
                      </Button>
                    </div>
                  </div>

                  {showVitalsForm && (
                    <form onSubmit={handleSubmitVitals} className="space-y-4 p-4 border rounded-lg">
                      <div className="space-y-2">
                        <Label htmlFor="recordTime">Time</Label>
                        <Select defaultValue="now">
                          <SelectTrigger id="recordTime">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="now">Current Time</SelectItem>
                            <SelectItem value="6am">6:00 AM</SelectItem>
                            <SelectItem value="12pm">12:00 PM</SelectItem>
                            <SelectItem value="6pm">6:00 PM</SelectItem>
                            <SelectItem value="12am">12:00 AM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="temperature">
                            <Thermometer className="h-4 w-4 inline mr-1" /> Temperature
                          </Label>
                          <div className="flex items-center space-x-2">
                            <Input id="temperature" type="text" placeholder="Enter value" defaultValue="99.1" />
                            <span className="text-sm text-gray-500">°F</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bloodPressure">
                            <Activity className="h-4 w-4 inline mr-1" /> Blood Pressure
                          </Label>
                          <div className="flex items-center space-x-2">
                            <Input id="bloodPressure" type="text" placeholder="Enter value" defaultValue="118/82" />
                            <span className="text-sm text-gray-500">mmHg</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pulse">
                            <Heart className="h-4 w-4 inline mr-1" /> Pulse Rate
                          </Label>
                          <div className="flex items-center space-x-2">
                            <Input id="pulse" type="text" placeholder="Enter value" defaultValue="80" />
                            <span className="text-sm text-gray-500">bpm</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="respiratoryRate">Respiratory Rate</Label>
                          <div className="flex items-center space-x-2">
                            <Input id="respiratoryRate" type="text" placeholder="Enter value" defaultValue="18" />
                            <span className="text-sm text-gray-500">/min</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="spo2">
                            <Droplet className="h-4 w-4 inline mr-1" /> SpO2
                          </Label>
                          <div className="flex items-center space-x-2">
                            <Input id="spo2" type="text" placeholder="Enter value" defaultValue="96" />
                            <span className="text-sm text-gray-500">%</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="consciousness">CNS (Consciousness)</Label>
                          <Select defaultValue="alert">
                            <SelectTrigger id="consciousness">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="alert">Alert</SelectItem>
                              <SelectItem value="verbal">Responds to Verbal</SelectItem>
                              <SelectItem value="pain">Responds to Pain</SelectItem>
                              <SelectItem value="unresponsive">Unresponsive</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="notes">Additional Notes</Label>
                        <Textarea
                          id="notes"
                          placeholder="Enter any additional observations"
                          defaultValue="Patient is comfortable and taking oral fluids well. No complaints of headache."
                        />
                      </div>

                      <div className="flex items-center space-x-2 mb-2">
                        <Checkbox id="alertDoctor" />
                        <Label htmlFor="alertDoctor" className="text-sm font-medium text-red-600">
                          <AlertTriangle className="h-4 w-4 inline mr-1" /> Alert doctor immediately (for critical
                          values)
                        </Label>
                      </div>

                      <Button type="submit" className="w-full">
                        Submit Vitals
                      </Button>
                    </form>
                  )}

                  <div className="space-y-2">
                    <h3 className="font-medium">Vital Signs History</h3>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Time</TableHead>
                            <TableHead>Temp</TableHead>
                            <TableHead>BP</TableHead>
                            <TableHead>Pulse</TableHead>
                            <TableHead>Resp</TableHead>
                            <TableHead>SpO2</TableHead>
                            <TableHead>Recorded By</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {vitalHistory
                            .filter((record) => record.patientId === "PT123456")
                            .map((record, index) => (
                              <TableRow key={index}>
                                <TableCell>{record.time}</TableCell>
                                <TableCell>{record.temperature}</TableCell>
                                <TableCell>{record.bloodPressure}</TableCell>
                                <TableCell>{record.pulse}</TableCell>
                                <TableCell>{record.respiratoryRate}</TableCell>
                                <TableCell>{record.spo2}</TableCell>
                                <TableCell>{record.recordedBy}</TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medications">
          <Card>
            <CardHeader>
              <CardTitle>Medication Schedule</CardTitle>
              <CardDescription>Track and administer medications for your patients.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {medicationSchedules.map((schedule) => (
                  <div key={schedule.patientId} className="border rounded-lg overflow-hidden">
                    <div className="bg-muted p-4">
                      <h3 className="font-medium">{schedule.patientName}</h3>
                      <p className="text-sm text-gray-500">
                        Bed: {schedule.bed} • Ward: {schedule.ward} • ID: {schedule.patientId}
                      </p>
                    </div>
                    <div className="p-4">
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Medication</TableHead>
                              <TableHead>Dosage</TableHead>
                              <TableHead>Route</TableHead>
                              <TableHead>Frequency</TableHead>
                              <TableHead>Time</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {schedule.medications.map((medication, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium">{medication.name}</TableCell>
                                <TableCell>{medication.dosage}</TableCell>
                                <TableCell>{medication.route}</TableCell>
                                <TableCell>{medication.frequency}</TableCell>
                                <TableCell>{medication.time}</TableCell>
                                <TableCell>
                                  <Badge
                                    variant="outline"
                                    className={
                                      medication.status === "Administered"
                                        ? "bg-green-50 text-green-700 border-green-200"
                                        : medication.status === "Due"
                                          ? "bg-amber-50 text-amber-700 border-amber-200"
                                          : "bg-red-50 text-red-700 border-red-200"
                                    }
                                  >
                                    {medication.status}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  {medication.status === "Due" ? (
                                    <Button size="sm" onClick={() => administeredMedication(medication)}>
                                      Administer
                                    </Button>
                                  ) : (
                                    <Button variant="outline" size="sm">
                                      View Details
                                    </Button>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm">
                          <Bell className="mr-2 h-4 w-4" />
                          Set Reminder
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Patient Details Dialog */}
      <Dialog open={showPatientDetails} onOpenChange={setShowPatientDetails}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Patient Details</DialogTitle>
          </DialogHeader>
          {selectedPatient && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Patient Information</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Name</p>
                        <p>{selectedPatient.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Patient ID</p>
                        <p>{selectedPatient.id}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Age</p>
                        <p>{selectedPatient.age} years</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Gender</p>
                        <p>{selectedPatient.gender}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Bed</p>
                        <p>{selectedPatient.bed}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Ward</p>
                        <p>{selectedPatient.ward}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Admission Date</p>
                        <p>{selectedPatient.admissionDate}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Status</p>
                        <Badge
                          variant="outline"
                          className={
                            selectedPatient.status === "Critical"
                              ? "bg-red-50 text-red-700 border-red-200"
                              : selectedPatient.status === "Stable"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-amber-50 text-amber-700 border-amber-200"
                          }
                        >
                          {selectedPatient.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Diagnosis & Treatment</h3>
                    <p className="mb-2">{selectedPatient.diagnosis}</p>
                    <p className="text-sm text-gray-600">
                      Treatment plan includes IV antibiotics, antipyretics, and fluid management. Monitor temperature
                      and fluid intake.
                    </p>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Latest Vital Signs</h3>
                      <Button variant="outline" size="sm">
                        <Activity className="mr-2 h-4 w-4" />
                        Record New
                      </Button>
                    </div>
                    {selectedPatient.vitals && selectedPatient.vitals.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">
                          Last recorded: {selectedPatient.vitals[selectedPatient.vitals.length - 1].time}
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center gap-2">
                            <Thermometer className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">Temperature:</span>
                            <span className="font-medium">
                              {selectedPatient.vitals[selectedPatient.vitals.length - 1].temperature}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">BP:</span>
                            <span className="font-medium">
                              {selectedPatient.vitals[selectedPatient.vitals.length - 1].bloodPressure}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Heart className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">Pulse:</span>
                            <span className="font-medium">
                              {selectedPatient.vitals[selectedPatient.vitals.length - 1].pulse}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Droplet className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">SpO2:</span>
                            <span className="font-medium">
                              {selectedPatient.vitals[selectedPatient.vitals.length - 1].spo2}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Medication Schedule</h3>
                    <div className="space-y-2">
                      {medicationSchedules
                        .find((schedule) => schedule.patientId === selectedPatient.id)
                        ?.medications.map((medication, index) => (
                          <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                            <div>
                              <p className="font-medium">
                                {medication.name} {medication.dosage}
                              </p>
                              <p className="text-xs text-gray-500">
                                {medication.route} • {medication.frequency} • {medication.time}
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className={
                                medication.status === "Administered"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : "bg-amber-50 text-amber-700 border-amber-200"
                              }
                            >
                              {medication.status}
                            </Badge>
                          </div>
                        )) || <p className="text-sm text-gray-500">No medications scheduled</p>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Vital Signs History</h3>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Time</TableHead>
                        <TableHead>Temp</TableHead>
                        <TableHead>BP</TableHead>
                        <TableHead>Pulse</TableHead>
                        <TableHead>Resp</TableHead>
                        <TableHead>SpO2</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedPatient.vitals.map((vital, index) => (
                        <TableRow key={index}>
                          <TableCell>{vital.time}</TableCell>
                          <TableCell>{vital.temperature}</TableCell>
                          <TableCell>{vital.bloodPressure}</TableCell>
                          <TableCell>{vital.pulse}</TableCell>
                          <TableCell>{vital.respiratoryRate}</TableCell>
                          <TableCell>{vital.spo2}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  View Care Plan
                </Button>
                <Button variant="outline">
                  <Clock className="mr-2 h-4 w-4" />
                  Schedule Task
                </Button>
                <Button onClick={() => setShowPatientDetails(false)}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Medication Administration Dialog */}
      <Dialog open={showMedicationDialog} onOpenChange={setShowMedicationDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Administer Medication</DialogTitle>
          </DialogHeader>
          {selectedMedication && (
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-medium">
                  {selectedMedication.name} {selectedMedication.dosage}
                </h3>
                <p className="text-sm text-gray-500">
                  Route: {selectedMedication.route} • Frequency: {selectedMedication.frequency}
                </p>
                <p className="text-sm text-gray-500">Scheduled time: {selectedMedication.time}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="administrationTime">Administration Time</Label>
                <Input id="administrationTime" type="time" defaultValue="14:00" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Enter any notes about the administration" />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="patientIdentified" defaultChecked />
                <Label htmlFor="patientIdentified">Patient identified correctly</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="medicationVerified" defaultChecked />
                <Label htmlFor="medicationVerified">Medication verified (right drug, dose, route, time)</Label>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setShowMedicationDialog(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    alert("Medication administered successfully!")
                    setShowMedicationDialog(false)
                  }}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Confirm Administration
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
