"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QrCode, UserPlus } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function ReceptionistDashboard() {
  const [patientCode, setPatientCode] = useState("")
  const [patientName, setPatientName] = useState("")
  const [patientEmail, setPatientEmail] = useState("")
  const [patientPhone, setPatientPhone] = useState("")
  const [generatedCode, setGeneratedCode] = useState("")

  const generatePatientCode = () => {
    // In a real app, this would be a secure unique code generation
    const code = "PT" + Math.floor(100000 + Math.random() * 900000)
    setGeneratedCode(code)
  }

  const handleCreatePatient = (e) => {
    e.preventDefault()
    generatePatientCode()
    // In a real app, you would save the patient data to a database
  }

  const recentPatients = [
    { id: "PT123456", name: "John Doe", date: "2023-04-01" },
    { id: "PT789012", name: "Jane Smith", date: "2023-04-01" },
    { id: "PT345678", name: "Robert Johnson", date: "2023-03-31" },
    { id: "PT901234", name: "Emily Davis", date: "2023-03-31" },
    { id: "PT567890", name: "Michael Wilson", date: "2023-03-30" },
  ]

  return (
    <DashboardLayout title="Receptionist Dashboard" userRole="Receptionist" userName="Sarah Johnson">
      <Tabs defaultValue="register" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="register">Register Patient</TabsTrigger>
          <TabsTrigger value="recent">Recent Patients</TabsTrigger>
        </TabsList>

        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Register New Patient</CardTitle>
              <CardDescription>Create a unique patient code and register a new patient in the system.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreatePatient} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Patient Name</Label>
                  <Input id="name" value={patientName} onChange={(e) => setPatientName(e.target.value)} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" value={patientPhone} onChange={(e) => setPatientPhone(e.target.value)} required />
                </div>

                <Button type="submit" className="w-full">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Generate Patient Code
                </Button>
              </form>

              {generatedCode && (
                <div className="mt-6 p-4 border rounded-md bg-teal-50">
                  <div className="text-center">
                    <QrCode className="mx-auto h-24 w-24 text-teal-700 mb-2" />
                    <h3 className="font-bold text-lg">Patient Code Generated</h3>
                    <p className="text-2xl font-mono mt-2 mb-4">{generatedCode}</p>
                    <p className="text-sm text-gray-600 mb-4">
                      Share this code with the patient for registration in the Como app.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        // In a real app, this would copy to clipboard
                        alert("Code copied to clipboard!")
                      }}
                    >
                      Copy Code
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Recent Patients</CardTitle>
              <CardDescription>Recently registered patients in the system.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border">
                  <div className="grid grid-cols-3 p-3 font-medium">
                    <div>Patient ID</div>
                    <div>Name</div>
                    <div>Registration Date</div>
                  </div>
                  {recentPatients.map((patient) => (
                    <div key={patient.id} className="grid grid-cols-3 p-3 border-t">
                      <div className="font-mono">{patient.id}</div>
                      <div>{patient.name}</div>
                      <div>{patient.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
