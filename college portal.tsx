"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Plus, CheckCircle2, XCircle, FileText, Users } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export default function CollegeDashboard() {
  const [showAddCase, setShowAddCase] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedYear, setSelectedYear] = useState("all")

  const students = [
    {
      id: "STU-001",
      name: "namrutha sundar raj",
      year: "3rd Year",
      status: "Active",
      casesAssigned: 10,
      casesCompleted: 5,
    },
    { id: "STU-002", name: "Amith HG", year: "2nd Year", status: "Active", casesAssigned: 5, casesCompleted: 3 },
    { id: "STU-003", name: "prapthi GS", year: "4th Year", status: "Active", casesAssigned: 20, casesCompleted: 12 },
    { id: "STU-004", name: "ajith p", year: "1st Year", status: "Active", casesAssigned: 3, casesCompleted: 1 },
    {
      id: "STU-005",
      name: "kavya",
      year: "Internship",
      status: "Active",
      casesAssigned: 25,
      casesCompleted: 10,
    },
    {
      id: "STU-006",
      name: "Sanglaba janna",
      year: "3rd Year",
      status: "Inactive",
      casesAssigned: 10,
      casesCompleted: 2,
    },
  ]

  const caseStudies = [
    { id: "CS001", title: "Respiratory Infection Case Study", category: "Respiratory", status: "Approved" },
    { id: "CS002", title: "Hypertension Management", category: "Cardiovascular", status: "Approved" },
    { id: "CS003", title: "Type 2 Diabetes Initial Diagnosis", category: "Endocrinology", status: "Pending" },
    { id: "CS004", title: "Pediatric Asthma Treatment", category: "Pediatrics", status: "Approved" },
    { id: "CS005", title: "Acute Appendicitis", category: "Surgery", status: "Pending" },
  ]

  const pendingApprovals = [
    { id: "REQ-001", studentName: "Ajith p", studentId: "STU-001", caseId: "CS003", requestDate: "2023-04-01" },
    { id: "REQ-002", studentName: "kavya", studentId: "STU-002", caseId: "CS005", requestDate: "2023-04-02" },
  ]

  const filteredStudents = students.filter(
    (student) =>
      (selectedYear === "all" || student.year === selectedYear) &&
      (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <DashboardLayout title="College Portal" userRole="College Administrator" userName="Dr. Thomas Anderson">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-xs text-muted-foreground">
              {students.filter((s) => s.status === "Active").length} active,{" "}
              {students.filter((s) => s.status === "Inactive").length} inactive
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Case Studies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{caseStudies.length}</div>
            <p className="text-xs text-muted-foreground">
              {caseStudies.filter((c) => c.status === "Approved").length} approved,{" "}
              {caseStudies.filter((c) => c.status === "Pending").length} pending
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingApprovals.length}</div>
            <p className="text-xs text-muted-foreground">Students requesting case study access</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="students" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="students">Manage Students</TabsTrigger>
          <TabsTrigger value="cases">Case Studies</TabsTrigger>
          <TabsTrigger value="approvals">Pending Approvals</TabsTrigger>
        </TabsList>

        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Student Management</CardTitle>
              <CardDescription>View and manage student access to case studies.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search students by name or ID"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-48">
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Years</SelectItem>
                      <SelectItem value="1st Year">1st Year</SelectItem>
                      <SelectItem value="2nd Year">2nd Year</SelectItem>
                      <SelectItem value="3rd Year">3rd Year</SelectItem>
                      <SelectItem value="4th Year">4th Year</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.id}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.year}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              student.status === "Active"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-gray-50 text-gray-700 border-gray-200"
                            }
                          >
                            {student.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-indigo-600 rounded-full"
                                style={{ width: `${(student.casesCompleted / student.casesAssigned) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500">
                              {student.casesCompleted}/{student.casesAssigned}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              Assign Cases
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

        <TabsContent value="cases">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Case Studies</CardTitle>
                <CardDescription>Manage case studies available to students.</CardDescription>
              </div>
              <Button onClick={() => setShowAddCase(!showAddCase)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Case Study
              </Button>
            </CardHeader>
            <CardContent>
              {showAddCase && (
                <div className="mb-6 p-4 border rounded-md">
                  <h3 className="font-medium mb-4">Add New Case Study</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor="caseTitle">Case Title</Label>
                      <Input id="caseTitle" placeholder="Enter case study title" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="respiratory">Respiratory</SelectItem>
                          <SelectItem value="cardiovascular">Cardiovascular</SelectItem>
                          <SelectItem value="endocrinology">Endocrinology</SelectItem>
                          <SelectItem value="pediatrics">Pediatrics</SelectItem>
                          <SelectItem value="surgery">Surgery</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="description">Description</Label>
                      <Input id="description" placeholder="Enter case study description" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1">Add Case Study</Button>
                    <Button variant="outline" className="flex-1" onClick={() => setShowAddCase(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {caseStudies.map((caseStudy) => (
                  <div key={caseStudy.id} className="border rounded-lg overflow-hidden">
                    <div className="bg-muted p-4 flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{caseStudy.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{caseStudy.category}</Badge>
                          <span className="text-sm text-gray-500">ID: {caseStudy.id}</span>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          caseStudy.status === "Approved"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }
                      >
                        {caseStudy.status}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">
                          <FileText className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Users className="mr-2 h-4 w-4" />
                          Assign to Students
                        </Button>
                        {caseStudy.status === "Pending" && (
                          <Button className="flex-1">
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Approve
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approvals">
          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
              <CardDescription>Student requests for case study access.</CardDescription>
            </CardHeader>
            <CardContent>
              {pendingApprovals.length === 0 ? (
                <div className="text-center p-6 text-gray-500">No pending approval requests.</div>
              ) : (
                <div className="space-y-4">
                  {pendingApprovals.map((request) => (
                    <div key={request.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{request.studentName}</h3>
                          <p className="text-sm text-gray-500">Student ID: {request.studentId}</p>
                          <p className="text-sm text-gray-500">
                            Requesting access to case: {caseStudies.find((c) => c.id === request.caseId)?.title}
                          </p>
                          <p className="text-sm text-gray-500">Request Date: {request.requestDate}</p>
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
