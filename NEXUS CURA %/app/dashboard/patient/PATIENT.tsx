"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Calendar, Clock, QrCode, AlertTriangle, MapPin, Pill, CalendarDays, Clock3 } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

export default function PatientDashboard() {
  const [showQRCode, setShowQRCode] = useState(false)
  const [showPharmacyFinder, setShowPharmacyFinder] = useState(false)
  const [location, setLocation] = useState("")
  const [showAppointmentScheduler, setShowAppointmentScheduler] = useState(false)

  const prescriptions = [
    {
      id: "RX78901",
      doctor: "Dr. Emily Chen",
      date: "2023-04-01",
      visitCount: 3,
      medications: [
        {
          name: "Amoxicillin",
          dosage: "500mg",
          frequency: "3 times daily",
          duration: "7 days",
          expirationDate: "2024-04-01",
          daysUntilExpiration: 359,
        },
        {
          name: "Ibuprofen",
          dosage: "400mg",
          frequency: "As needed",
          duration: "5 days",
          expirationDate: "2025-01-15",
          daysUntilExpiration: 648,
        },
      ],
      status: "Active",
    },
    {
      id: "RX45678",
      doctor: "Dr. Amith Raj",
      date: "2023-03-15",
      visitCount: 1,
      medications: [
        {
          name: "Loratadine",
          dosage: "10mg",
          frequency: "Once daily",
          duration: "30 days",
          expirationDate: "2023-05-10",
          daysUntilExpiration: 33,
        },
      ],
      status: "Active",
    },
  ]

  const medications = [
    {
      name: "Amoxicillin",
      dosage: "500mg",
      time: "8:00 AM",
      taken: false,
      expirationDate: "2024-04-01",
      daysUntilExpiration: 359,
    },
    {
      name: "Amoxicillin",
      dosage: "500mg",
      time: "2:00 PM",
      taken: true,
      expirationDate: "2024-04-01",
      daysUntilExpiration: 359,
    },
    {
      name: "Amoxicillin",
      dosage: "500mg",
      time: "8:00 PM",
      taken: false,
      expirationDate: "2024-04-01",
      daysUntilExpiration: 359,
    },
    {
      name: "Ibuprofen",
      dosage: "400mg",
      time: "As needed",
      taken: false,
      expirationDate: "2025-01-15",
      daysUntilExpiration: 648,
    },
  ]

  const appointments = [
    { doctor: "Dr. Emily Chen", specialty: "General Practitioner", date: "2023-04-10", time: "10:30 AM" },
    { doctor: "Dr. Robert Smith", specialty: "Dermatologist", date: "2023-04-15", time: "2:00 PM" },
  ]

  const nearbyPharmacies = [
    { name: "MedPlus Pharmacy", distance: "0.5 km", address: "123 Main St, City Center", hasStock: true },
    { name: "Apollo Pharmacy", distance: "1.2 km", address: "456 Park Ave, Downtown", hasStock: true },
    { name: "LifeCare Medicines", distance: "2.3 km", address: "789 Oak Rd, Westside", hasStock: false },
    { name: "Health First Pharmacy", distance: "3.1 km", address: "101 Pine St, Eastside", hasStock: true },
  ]

  // Function to get badge color based on days until expiration
  const getExpirationBadgeColor = (daysUntilExpiration) => {
    if (daysUntilExpiration <= 7) return "bg-red-50 text-red-700 border-red-200"
    if (daysUntilExpiration <= 30) return "bg-amber-50 text-amber-700 border-amber-200"
    return "bg-green-50 text-green-700 border-green-200"
  }

  return (
    <DashboardLayout title="Patient Dashboard" userRole="Patient" userName="John Doe">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Today's Medications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{medications.filter((m) => !m.taken).length}</div>
            <p className="text-xs text-muted-foreground">
              {medications.filter((m) => m.taken).length} taken, {medications.filter((m) => !m.taken).length} remaining
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Prescriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{prescriptions.filter((p) => p.status === "Active").length}</div>
            <p className="text-xs text-muted-foreground">
              From {new Set(prescriptions.map((p) => p.doctor)).size} doctors
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointments.length}</div>
            <p className="text-xs text-muted-foreground">Next: {appointments[0].date}</p>
          </CardContent>
        </Card>
      </div>

      <div className="absolute top-6 right-6 md:right-8">
        <Button
          variant="outline"
          className="flex items-center gap-2 border-indigo-200 hover:bg-indigo-50"
          onClick={() => setShowQRCode(!showQRCode)}
        >
          <QrCode className="h-5 w-5 text-indigo-600" />
          <span className="text-indigo-600 font-medium">Payment QR</span>
        </Button>

        {showQRCode && (
          <div className="absolute right-0 mt-2 p-4 bg-white rounded-lg shadow-lg border border-gray-200 z-10 w-64">
            <div className="text-center">
              <QrCode className="mx-auto h-32 w-32 text-indigo-700 mb-2" />
              <p className="text-sm text-gray-600 mt-2">Scan to make a payment</p>
              <p className="text-lg font-semibold mt-1">Total: ₹1,250.00</p>
              <Button variant="ghost" size="sm" className="mt-2" onClick={() => setShowQRCode(false)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </div>

      <Card className="mb-6 border-red-200 bg-red-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-red-700 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
            Medication Interaction Alert
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-red-100 text-red-700 border-red-300">
                High Risk
              </Badge>
              <span className="font-medium">Amoxicillin + Ibuprofen</span>
            </div>
            <p className="text-sm text-red-700">
              Taking these medications together may increase the risk of gastrointestinal bleeding. Please consult your
              doctor.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100 hover:text-red-800">
                Contact Doctor
              </Button>
              <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100 hover:text-red-800">
                View Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-6">
        <Button className="w-full bg-indigo-600 hover:bg-indigo-700" onClick={() => setShowAppointmentScheduler(true)}>
          <CalendarDays className="mr-2 h-5 w-5" />
          Schedule Appointment with Specialist
        </Button>
      </div>

      <Tabs defaultValue="medications" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="pharmacies">Nearby Pharmacies</TabsTrigger>
        </TabsList>

        <TabsContent value="medications">
          <Card>
            <CardHeader>
              <CardTitle>Today's Medication Schedule</CardTitle>
              <CardDescription>
                Your medication schedule for today. Remember to take your medications on time.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {medications.map((med, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${med.taken ? "bg-green-100" : "bg-amber-100"}`}>
                        <Clock className={`h-5 w-5 ${med.taken ? "text-green-600" : "text-amber-600"}`} />
                      </div>
                      <div>
                        <h4 className="font-medium">
                          {med.name} {med.dosage}
                        </h4>
                        <p className="text-sm text-gray-500">{med.time}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock3 className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">Expires: {med.expirationDate}</span>
                          <Badge variant="outline" className={getExpirationBadgeColor(med.daysUntilExpiration)}>
                            {med.daysUntilExpiration <= 7
                              ? "Expiring soon"
                              : med.daysUntilExpiration <= 30
                                ? "Expires in 1 month"
                                : "Valid"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div>
                      {med.taken ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Taken
                        </Badge>
                      ) : (
                        <Button size="sm" variant="outline">
                          <Bell className="mr-1 h-4 w-4" />
                          Set Reminder
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prescriptions">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>My Prescriptions</CardTitle>
                <CardDescription>View all your prescriptions and medication details.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {prescriptions.map((prescription) => (
                  <div key={prescription.id} className="border rounded-lg overflow-hidden">
                    <div className="bg-muted p-4 flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{prescription.doctor}</h3>
                        <p className="text-sm text-gray-500">
                          {prescription.date} • Visit #{prescription.visitCount}
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
                      <p className="text-sm text-gray-500 mb-2">Prescription ID: {prescription.id}</p>
                      <div className="space-y-2">
                        {prescription.medications.map((med, idx) => (
                          <div key={idx} className="p-3 bg-muted/50 rounded-md">
                            <div className="font-medium">
                              {med.name} {med.dosage}
                            </div>
                            <div className="text-sm text-gray-500">
                              {med.frequency} for {med.duration}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <Clock3 className="h-3 w-3 text-gray-400" />
                              <span className="text-xs text-gray-500">Expires: {med.expirationDate}</span>
                              <Badge variant="outline" className={getExpirationBadgeColor(med.daysUntilExpiration)}>
                                {med.daysUntilExpiration <= 7
                                  ? "Expiring soon"
                                  : med.daysUntilExpiration <= 30
                                    ? "Expires in 1 month"
                                    : "Valid"}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1">
                          View PDF
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <MapPin className="mr-2 h-4 w-4" />
                          Find Pharmacy
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Your scheduled doctor appointments.</CardDescription>
              </div>
              <Button onClick={() => setShowAppointmentScheduler(true)} className="bg-indigo-600 hover:bg-indigo-700">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule New
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((appointment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-indigo-100">
                        <Calendar className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{appointment.doctor}</h4>
                        <p className="text-sm text-gray-500">{appointment.specialty}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{appointment.date}</div>
                      <div className="text-sm text-gray-500">{appointment.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pharmacies">
          <Card>
            <CardHeader>
              <CardTitle>Find Nearby Pharmacies</CardTitle>
              <CardDescription>Locate pharmacies outside the hospital for medication access.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter your location or use current location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <Button onClick={() => setShowPharmacyFinder(true)}>
                    <MapPin className="mr-2 h-4 w-4" />
                    Find
                  </Button>
                </div>

                {showPharmacyFinder && (
                  <div className="mt-4 space-y-4">
                    {nearbyPharmacies.map((pharmacy, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{pharmacy.name}</h3>
                            <p className="text-sm text-gray-500">{pharmacy.address}</p>
                            <p className="text-sm text-gray-500">{pharmacy.distance} away</p>
                          </div>
                          <div>
                            {pharmacy.hasStock ? (
                              <Badge className="bg-green-50 text-green-700 border-green-200">In Stock</Badge>
                            ) : (
                              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                Limited Stock
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Pill className="mr-2 h-4 w-4" />
                            Check Availability
                          </Button>
                          <Button size="sm" className="flex-1">
                            Get Directions
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
