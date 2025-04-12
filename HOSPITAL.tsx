"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { UserCircle, Search, Plus, CheckCircle2, XCircle, Smartphone } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function HospitalDashboard() {
  const [showAddDoctor, setShowAddDoctor] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const hospitalInfo = {
    name: "Metro Medical Center",
    code: "MMC-12345",
    address: "123 Healthcare Avenue, Medical District",
    type: "Multi-Specialty Hospital",
    beds: 350,
    departments: 12,
  }

  const doctors = [
    { id: "DOC-001", name: "Dr. Emily Chen", department: "Cardiology", status: "Active", multiHospital: true },
    { id: "DOC-002", name: "Dr. James Wilson", department: "Neurology", status: "Active", multiHospital: false },
    { id: "DOC-003", name: "Dr. Sarah Brown", department: "Pediatrics", status: "On Leave", multiHospital: true },
    { id: "DOC-004", name: "Dr. Michael Johnson", department: "Orthopedics", status: "Active", multiHospital: false },
    { id: "DOC-005", name: "Dr. Lisa Wang", department: "Dermatology", status: "Active", multiHospital: true },
    {
      id: "DOC-006",
      name: "Dr. Robert Smith",
      department: "Internal Medicine",
      status: "Active",
      multiHospital: false,
    },
  ]

  const pendingApprovals = [
    { id: "REQ-001", name: "Dr. David Miller", department: "Oncology", currentHospital: "City General Hospital" },
    { id: "REQ-002", name: "Dr. Jennifer Lee", department: "Gynecology", currentHospital: "Women's Health Center" },
  ]

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <DashboardLayout title="Hospital Management" userRole="Hospital Administrator" userName="Maria Rodriguez">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Doctors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{doctors.length}</div>
            <p className="text-xs text-muted-foreground">
              {doctors.filter((d) => d.status === "Active").length} active,{" "}
              {doctors.filter((d) => d.status === "On Leave").length} on leave
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Multi-Hospital Doctors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{doctors.filter((d) => d.multiHospital).length}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((doctors.filter((d) => d.multiHospital).length / doctors.length) * 100)}% of total doctors
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingApprovals.length}</div>
            <p className="text-xs text-muted-foreground">Doctors requesting to join this hospital</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Hospital Information</CardTitle>
          <CardDescription>Details about {hospitalInfo.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Hospital Code:</span>
                <span className="text-sm">{hospitalInfo.code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Type:</span>
                <span className="text-sm">{hospitalInfo.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Total Beds:</span>
                <span className="text-sm">{hospitalInfo.beds}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Address:</span>
                <span className="text-sm">{hospitalInfo.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Departments:</span>
                <span className="text-sm">{hospitalInfo.departments}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Doctors:</span>
                <span className="text-sm">{doctors.length}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="doctors" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="doctors">Manage Doctors</TabsTrigger>
          <TabsTrigger value="approvals">Pending Approvals</TabsTrigger>
        </TabsList>

        <TabsContent value="doctors">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Hospital Doctors</CardTitle>
                <CardDescription>Manage doctors associated with this hospital.</CardDescription>
              </div>
              <Button onClick={() => setShowAddDoctor(!showAddDoctor)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Doctor
              </Button>
            </CardHeader>
            <CardContent>
              {showAddDoctor && (
                <div className="mb-6 p-4 border rounded-md">
                  <h3 className="font-medium mb-4">Add New Doctor</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor="doctorName">Doctor Name</Label>
                      <Input id="doctorName" placeholder="Enter full name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input id="department" placeholder="Select department" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Enter email address" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" placeholder="Enter phone number" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1">Add Doctor</Button>
                    <Button variant="outline" className="flex-1" onClick={() => setShowAddDoctor(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              <div className="mb-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Search doctors by name, department, or ID"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button variant="outline">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Doctor ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Multi-Hospital</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDoctors.map((doctor) => (
                      <TableRow key={doctor.id}>
                        <TableCell className="font-medium">{doctor.id}</TableCell>
                        <TableCell>{doctor.name}</TableCell>
                        <TableCell>{doctor.department}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              doctor.status === "Active"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-amber-50 text-amber-700 border-amber-200"
                            }
                          >
                            {doctor.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {doctor.multiHospital ? (
                            <Badge className="bg-indigo-50 text-indigo-700 border-indigo-200">
                              <Smartphone className="h-3 w-3 mr-1" />
                              OTP Enabled
                            </Badge>
                          ) : (
                            <span className="text-gray-500 text-sm">Single Hospital</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              Edit
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

        <TabsContent value="approvals">
          <Card>
            <CardHeader>
              <CardTitle>Pending Doctor Approvals</CardTitle>
              <CardDescription>Doctors requesting to join this hospital.</CardDescription>
            </CardHeader>
            <CardContent>
              {pendingApprovals.length === 0 ? (
                <div className="text-center p-6 text-gray-500">No pending approval requests.</div>
              ) : (
                <div className="space-y-4">
                  {pendingApprovals.map((request) => (
                    <div key={request.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full bg-indigo-100">
                            <UserCircle className="h-8 w-8 text-indigo-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">{request.name}</h3>
                            <p className="text-sm text-gray-500">
                              {request.department} • Currently at {request.currentHospital}
                            </p>
                            <p className="text-sm text-gray-500">Request ID: {request.id}</p>
                          </div>
                        </div>
                        <Badge className="bg-blue-50 text-blue-700 border-blue-200">Pending Approval</Badge>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button className="flex-1">
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Approve
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <XCircle className="mr-2 h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
