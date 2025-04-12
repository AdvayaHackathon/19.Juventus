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
import { Search, Upload, FileText, Download, Printer } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function LaboratoryDashboard() {
  const [patientId, setPatientId] = useState("")
  const [patientFound, setPatientFound] = useState(false)
  const [testType, setTestType] = useState("")
  const [uploadedFile, setUploadedFile] = useState(null)
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTest, setSelectedTest] = useState(null)
  const [showTestDetails, setShowTestDetails] = useState(false)

  const handleSearchPatient = (e) => {
    e.preventDefault()
    // In a real app, this would search the database
    if (patientId) {
      setPatientFound(true)
    }
  }

  const handleFileUpload = (e) => {
    // In a real app, this would handle file upload
    setUploadedFile(e.target.files[0])
  }

  const handleSubmitReport = (e) => {
    e.preventDefault()
    // In a real app, this would save the report to the database
    alert("Report submitted successfully!")
    setShowUploadForm(false)
    setUploadedFile(null)
    setTestType("")
  }

  const pendingTests = [
    {
      id: "LAB001",
      patientId: "PT123456",
      patientName: "Ravi Kumar",
      testType: "Complete Blood Count",
      requestedBy: "Dr. Emily Chen",
      requestDate: "2023-04-01",
      priority: "High",
    },
    {
      id: "LAB002",
      patientId: "PT789012",
      patientName: "Sneha Patel",
      testType: "Liver Function Test",
      requestedBy: "Dr. James Wilson",
      requestDate: "2023-04-01",
      priority: "Normal",
    },
    {
      id: "LAB003",
      patientId: "PT345678",
      patientName: "Rajesh Mehta",
      testType: "Kidney Function Test",
      requestedBy: "Dr. Sarah Brown",
      requestDate: "2023-03-31",
      priority: "Normal",
    },
  ]

  const completedTests = [
    {
      id: "LAB004",
      patientId: "PT123456",
      patientName: "Ravi Kumar",
      testType: "Hemoglobin A1C",
      completedDate: "2023-03-30",
      technician: "John Smith",
      status: "Normal",
      results: {
        hba1c: "5.7%",
        interpretation: "Pre-diabetic range (5.7-6.4%)",
        notes: "Recommend lifestyle modifications and follow-up in 3 months.",
      },
    },
    {
      id: "LAB005",
      patientId: "PT901234",
      patientName: "Anjali Verma",
      testType: "Lipid Profile",
      completedDate: "2023-03-29",
      technician: "Maria Rodriguez",
      status: "Abnormal",
      results: {
        totalCholesterol: "240 mg/dL",
        ldl: "160 mg/dL",
        hdl: "45 mg/dL",
        triglycerides: "180 mg/dL",
        interpretation: "Elevated LDL and total cholesterol",
        notes: "Recommend dietary changes and possible statin therapy.",
      },
    },
    {
      id: "LAB006",
      patientId: "PT567890",
      patientName: "Ramesh Shetty",
      testType: "Thyroid Panel",
      completedDate: "2023-03-28",
      technician: "John Smith",
      status: "Normal",
      results: {
        tsh: "2.5 mIU/L",
        t3: "120 ng/dL",
        t4: "8.5 μg/dL",
        interpretation: "All values within normal range",
        notes: "No further action required.",
      },
    },
  ]

  const filteredPendingTests = pendingTests.filter(
    (test) =>
      test.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.testType.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredCompletedTests = completedTests.filter(
    (test) =>
      test.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.testType.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const viewTestDetails = (test) => {
    setSelectedTest(test)
    setShowTestDetails(true)
  }

  return (
    <DashboardLayout title="Laboratory Dashboard" userRole="Lab Technician" userName="John Smith">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingTests.length}</div>
            <p className="text-xs text-muted-foreground">
              {pendingTests.filter((test) => test.priority === "High").length} high priority
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              {completedTests.filter((test) => test.status === "Abnormal").length} abnormal results
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Processing Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.5 hrs</div>
            <p className="text-xs text-muted-foreground">Target: &lt; 2 hours</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Upload Results</TabsTrigger>
          <TabsTrigger value="pending">Pending Tests</TabsTrigger>
          <TabsTrigger value="completed">Completed Tests</TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload Lab Results</CardTitle>
              <CardDescription>Search for a patient and upload their lab test results.</CardDescription>
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
                        <h3 className="font-medium">Ravi Kumar</h3>
                        <p className="text-sm text-gray-500">45 years • Male • Patient ID: {patientId}</p>
                        <p className="text-sm text-gray-500">Referred by: Dr. Emily Chen</p>
                      </div>
                      <Button variant="outline" onClick={() => setShowUploadForm(!showUploadForm)}>
                        {showUploadForm ? "Cancel" : "Upload Results"}
                      </Button>
                    </div>
                  </div>

                  {showUploadForm && (
                    <form onSubmit={handleSubmitReport} className="space-y-4 p-4 border rounded-lg">
                      <div className="space-y-2">
                        <Label htmlFor="testType">Test Type</Label>
                        <Select value={testType} onValueChange={setTestType} required>
                          <SelectTrigger id="testType">
                            <SelectValue placeholder="Select test type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cbc">Complete Blood Count (CBC)</SelectItem>
                            <SelectItem value="lft">Liver Function Test (LFT)</SelectItem>
                            <SelectItem value="kft">Kidney Function Test (KFT)</SelectItem>
                            <SelectItem value="urinalysis">Urinalysis</SelectItem>
                            <SelectItem value="lipid">Lipid Profile</SelectItem>
                            <SelectItem value="thyroid">Thyroid Panel</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {testType === "lft" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="sgot">SGOT (AST)</Label>
                            <div className="flex items-center space-x-2">
                              <Input id="sgot" type="number" placeholder="Enter value" defaultValue="82" />
                              <span className="text-sm text-gray-500">U/L</span>
                            </div>
                            <p className="text-xs text-red-600">Above normal range (5-40 U/L)</p>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="sgpt">SGPT (ALT)</Label>
                            <div className="flex items-center space-x-2">
                              <Input id="sgpt" type="number" placeholder="Enter value" defaultValue="94" />
                              <span className="text-sm text-gray-500">U/L</span>
                            </div>
                            <p className="text-xs text-red-600">Above normal range (7-56 U/L)</p>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="alp">Alkaline Phosphatase</Label>
                            <div className="flex items-center space-x-2">
                              <Input id="alp" type="number" placeholder="Enter value" defaultValue="115" />
                              <span className="text-sm text-gray-500">U/L</span>
                            </div>
                            <p className="text-xs text-gray-600">Normal range (44-147 U/L)</p>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="bilirubin">Total Bilirubin</Label>
                            <div className="flex items-center space-x-2">
                              <Input
                                id="bilirubin"
                                type="number"
                                placeholder="Enter value"
                                defaultValue="0.9"
                                step="0.1"
                              />
                              <span className="text-sm text-gray-500">mg/dL</span>
                            </div>
                            <p className="text-xs text-gray-600">Normal range (0.1-1.2 mg/dL)</p>
                          </div>
                        </div>
                      )}

                      {testType === "cbc" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="hemoglobin">Hemoglobin</Label>
                            <div className="flex items-center space-x-2">
                              <Input
                                id="hemoglobin"
                                type="number"
                                placeholder="Enter value"
                                defaultValue="12.8"
                                step="0.1"
                              />
                              <span className="text-sm text-gray-500">g/dL</span>
                            </div>
                            <p className="text-xs text-gray-600">Normal range (13.5-17.5 g/dL)</p>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="wbc">White Blood Cells</Label>
                            <div className="flex items-center space-x-2">
                              <Input id="wbc" type="number" placeholder="Enter value" defaultValue="9500" />
                              <span className="text-sm text-gray-500">cells/mm³</span>
                            </div>
                            <p className="text-xs text-gray-600">Normal range (4,500-11,000 cells/mm³)</p>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="platelets">Platelets</Label>
                            <div className="flex items-center space-x-2">
                              <Input id="platelets" type="number" placeholder="Enter value" defaultValue="250000" />
                              <span className="text-sm text-gray-500">cells/mm³</span>
                            </div>
                            <p className="text-xs text-gray-600">Normal range (150,000-450,000 cells/mm³)</p>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="rbc">Red Blood Cells</Label>
                            <div className="flex items-center space-x-2">
                              <Input id="rbc" type="number" placeholder="Enter value" defaultValue="4.8" step="0.1" />
                              <span className="text-sm text-gray-500">million/mm³</span>
                            </div>
                            <p className="text-xs text-gray-600">Normal range (4.5-5.9 million/mm³)</p>
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="notes">Notes & Observations</Label>
                        <Textarea
                          id="notes"
                          placeholder="Enter any additional notes or observations"
                          defaultValue={
                            testType === "lft"
                              ? "Elevated liver enzymes suggest possible hepatic inflammation. Recommend follow-up in 2 weeks."
                              : ""
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="fileUpload">Upload Report File (Optional)</Label>
                        <Input id="fileUpload" type="file" onChange={handleFileUpload} />
                        {uploadedFile && <p className="text-xs text-gray-600">File selected: {uploadedFile.name}</p>}
                      </div>

                      <div className="flex gap-3">
                        <Button type="submit" className="flex-1">
                          <Upload className="mr-2 h-4 w-4" />
                          Submit Report
                        </Button>
                        <Button type="button" variant="outline" className="flex-1">
                          <FileText className="mr-2 h-4 w-4" />
                          Save as Draft
                        </Button>
                      </div>
                    </form>
                  )}

                  <div className="space-y-2">
                    <h3 className="font-medium">Previous Lab Reports</h3>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Test Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>2023-03-30</TableCell>
                            <TableCell>Hemoglobin A1C</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                Normal
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm" onClick={() => viewTestDetails(completedTests[0])}>
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>2023-02-15</TableCell>
                            <TableCell>Complete Blood Count</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                Abnormal
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Lab Tests</CardTitle>
              <CardDescription>Tests that are waiting to be processed.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input
                  placeholder="Search by patient name, ID, or test type"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Test ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Test Type</TableHead>
                      <TableHead>Requested By</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPendingTests.map((test) => (
                      <TableRow key={test.id}>
                        <TableCell className="font-medium">{test.id}</TableCell>
                        <TableCell>
                          {test.patientName}
                          <div className="text-xs text-gray-500">{test.patientId}</div>
                        </TableCell>
                        <TableCell>{test.testType}</TableCell>
                        <TableCell>{test.requestedBy}</TableCell>
                        <TableCell>{test.requestDate}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              test.priority === "High"
                                ? "bg-red-50 text-red-700 border-red-200"
                                : "bg-blue-50 text-blue-700 border-blue-200"
                            }
                          >
                            {test.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm">Process</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Lab Tests</CardTitle>
              <CardDescription>Tests that have been processed and reported.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input
                  placeholder="Search by patient name, ID, or test type"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Test ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Test Type</TableHead>
                      <TableHead>Completed Date</TableHead>
                      <TableHead>Technician</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCompletedTests.map((test) => (
                      <TableRow key={test.id}>
                        <TableCell className="font-medium">{test.id}</TableCell>
                        <TableCell>
                          {test.patientName}
                          <div className="text-xs text-gray-500">{test.patientId}</div>
                        </TableCell>
                        <TableCell>{test.testType}</TableCell>
                        <TableCell>{test.completedDate}</TableCell>
                        <TableCell>{test.technician}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              test.status === "Normal"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-amber-50 text-amber-700 border-amber-200"
                            }
                          >
                            {test.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => viewTestDetails(test)}>
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              Print
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
      </Tabs>

      {/* Test Details Dialog */}
      <Dialog open={showTestDetails} onOpenChange={setShowTestDetails}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Test Results: {selectedTest?.testType}</DialogTitle>
          </DialogHeader>
          {selectedTest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Patient</h3>
                  <p>{selectedTest.patientName}</p>
                  <p className="text-sm text-gray-500">{selectedTest.patientId}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Test Information</h3>
                  <p>Completed: {selectedTest.completedDate}</p>
                  <p className="text-sm text-gray-500">Technician: {selectedTest.technician}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Test Results</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  {selectedTest.testType === "Hemoglobin A1C" && (
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">HbA1c:</span>
                        <span>{selectedTest.results.hba1c}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Interpretation:</span>
                        <span>{selectedTest.results.interpretation}</span>
                      </div>
                    </div>
                  )}

                  {selectedTest.testType === "Lipid Profile" && (
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Total Cholesterol:</span>
                        <span>{selectedTest.results.totalCholesterol}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">LDL:</span>
                        <span>{selectedTest.results.ldl}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">HDL:</span>
                        <span>{selectedTest.results.hdl}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Triglycerides:</span>
                        <span>{selectedTest.results.triglycerides}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Interpretation:</span>
                        <span>{selectedTest.results.interpretation}</span>
                      </div>
                    </div>
                  )}

                  {selectedTest.testType === "Thyroid Panel" && (
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">TSH:</span>
                        <span>{selectedTest.results.tsh}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">T3:</span>
                        <span>{selectedTest.results.t3}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">T4:</span>
                        <span>{selectedTest.results.t4}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Interpretation:</span>
                        <span>{selectedTest.results.interpretation}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Notes</h3>
                <p className="text-sm">{selectedTest.results.notes}</p>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
                <Button variant="outline">
                  <Printer className="mr-2 h-4 w-4" />
                  Print Report
                </Button>
                <Button onClick={() => setShowTestDetails(false)}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
