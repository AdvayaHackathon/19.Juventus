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
import { Search, Upload, FileText, AlertTriangle, CheckCircle, Brain, Scan, Download, Printer, Eye } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function RadiologyDashboard() {
  const [patientId, setPatientId] = useState("")
  const [patientFound, setPatientFound] = useState(false)
  const [scanType, setScanType] = useState("")
  const [uploadedFile, setUploadedFile] = useState(null)
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedScan, setSelectedScan] = useState(null)
  const [showScanDetails, setShowScanDetails] = useState(false)
  const [showAIAnnotations, setShowAIAnnotations] = useState(false)

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

  const handleSubmitScan = (e) => {
    e.preventDefault()
    // In a real app, this would save the scan to the database
    alert("Scan submitted for AI analysis!")
    setShowUploadForm(false)
    setUploadedFile(null)
    setScanType("")
  }

  const viewScanDetails = (scan) => {
    setSelectedScan(scan)
    setShowScanDetails(true)
  }

  const pendingScans = [
    {
      id: "RAD001",
      patientId: "PT123456",
      patientName: "Rajesh Mehta",
      scanType: "MRI - Knee",
      requestedBy: "Dr. Manish Rathi",
      requestDate: "2023-04-01",
      priority: "Normal",
      aiProgress: 75,
    },
    {
      id: "RAD002",
      patientId: "PT789012",
      patientName: "Anjali Verma",
      scanType: "MRI - Lumbar Spine",
      requestedBy: "Dr. Manish Rathi",
      requestDate: "2023-04-01",
      priority: "High",
      aiProgress: 90,
    },
    {
      id: "RAD003",
      patientId: "PT345678",
      patientName: "Ramesh Shetty",
      scanType: "X-Ray - Chest",
      requestedBy: "Dr. Sarah Brown",
      requestDate: "2023-03-31",
      priority: "Normal",
      aiProgress: 30,
    },
  ]

  const completedScans = [
    {
      id: "RAD004",
      patientId: "PT901234",
      patientName: "Priya Singh",
      scanType: "CT Scan - Brain",
      completedDate: "2023-03-30",
      radiologist: "Dr. Vikram Desai",
      aiFindings: "No abnormalities detected",
      status: "Normal",
      reportSummary: "Brain parenchyma appears normal. No evidence of infarct, hemorrhage, or space-occupying lesion. Ventricles and sulci are normal in size and configuration. No midline shift or mass effect.",
      clinicalDetails: "Patient presented with persistent headaches for 2 weeks. No history of trauma or neurological symptoms."
    },
    {
      id: "RAD005",
      patientId: "PT567890",
      patientName: "Arjun Patel",
      scanType: "X-Ray - Wrist",
      completedDate: "2023-03-29",
      radiologist: "Dr. Vikram Desai",
      aiFindings: "Distal radius fracture detected",
      status: "Abnormal",
      reportSummary: "Distal radius fracture with minimal displacement. No involvement of the articular surface. Carpal bones appear normal. Soft tissue swelling noted.",
      clinicalDetails: "Patient fell on outstretched hand while playing sports. Complains of pain and swelling in the wrist."
    },
    {
      id: "RAD006",
      patientId: "PT123456",
      patientName: "Rajesh Mehta",
      scanType: "MRI - Shoulder",
      completedDate: "2023-03-28",
      radiologist: "Dr. Neha Sharma",
      aiFindings: "Rotator cuff tear detected",
      status: "Abnormal",
      reportSummary: "Full-thickness tear of the supraspinatus tendon measuring approximately 1.5 cm. Mild degenerative changes in the acromioclavicular joint. No evidence of labral tear or Hill-Sachs lesion.",
      clinicalDetails: "Patient complains of shoulder pain and limited range of motion for 3 weeks. No history of trauma."
    },
  ]

  const filteredPendingScans = pendingScans.filter(
    (scan) =>
      scan.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scan.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scan.scanType.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredCompletedScans = completedScans.filter(
    (scan) =>
      scan.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scan.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scan.scanType.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <DashboardLayout title="Radiology Dashboard" userRole="Radiologist" userName="Dr. Vikram Desai">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Scans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingScans.length}</div>
            <p className="text-xs text-muted-foreground">
              {pendingScans.filter((scan) => scan.priority === "High").length} high priority
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">AI Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Average processing time: 45 mins</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              {completedScans.filter((scan) => scan.status === "Abnormal").length} abnormal findings
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Upload Scans</TabsTrigger>
          <TabsTrigger value="pending">AI Processing</TabsTrigger>
          <TabsTrigger value="completed">Completed Scans</TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload Radiology Scans</CardTitle>
              <CardDescription>Search for a patient and upload their radiology scans for AI analysis.</CardDescription>
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
                        <h3 className="font-medium">Rajesh Mehta</h3>
                        <p className="text-sm text-gray-500">38 years • Male • Patient ID: {patientId}</p>
                        <p className="text-sm text-gray-500">Referred by: Dr. Manish Rathi (Ortho Dept)</p>
                      </div>
                      <Button variant="outline" onClick={() => setShowUploadForm(!showUploadForm)}>
                        {showUploadForm ? "Cancel" : "Upload New Scan"}
                      </Button>
                    </div>
                  </div>

                  {showUploadForm && (
                    <form onSubmit={handleSubmitScan} className="space-y-4 p-4 border rounded-lg">
                      <div className="space-y-2">
                        <Label htmlFor="scanType">Scan Type</Label>
                        <Select value={scanType} onValueChange={setScanType} required>
                          <SelectTrigger id="scanType">
                            <SelectValue placeholder="Select scan type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="xray-chest">X-Ray - Chest</SelectItem>
                            <SelectItem value="xray-spine">X-Ray - Spine</SelectItem>
                            <SelectItem value="xray-limbs">X-Ray - Limbs</SelectItem>
                            <SelectItem value="ct-brain">CT Scan - Brain</SelectItem>
                            <SelectItem value="ct-abdomen">CT Scan - Abdomen</SelectItem>
                            <SelectItem value="ct-chest">CT Scan - Chest</SelectItem>
                            <SelectItem value="mri-knee">MRI - Knee</SelectItem>
                            <SelectItem value="mri-brain">MRI - Brain</SelectItem>
                            <SelectItem value="mri-spine">MRI - Spine</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="clinicalDetails">Clinical Details</Label>
                        <Textarea
                          id="clinicalDetails"
                          placeholder="Enter clinical details and reason for scan"
                          defaultValue="Patient complains of persistent knee pain for 3 weeks following sports injury. Suspected meniscus tear."
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="fileUpload">Upload Scan Images</Label>
                        <Input id="fileUpload" type="file" onChange={handleFileUpload} />
                        {uploadedFile && <p className="text-xs text-gray-600">File selected: {uploadedFile.name}</p>}
                      </div>

                      <div className="flex items-center space-x-2 mb-2">
                        <input type="checkbox" id="priority" className="rounded" />
                        <Label htmlFor="priority" className="text-sm font-medium text-amber-600">
                          <AlertTriangle className="h-4 w-4 inline mr-1" /> Mark as high priority
                        </Label>
                      </div>

                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-md mb-4">
                        <div className="flex items-center gap-2 text-blue-700 font-medium mb-1">
                          <Brain className="h-5 w-5 text-blue-600" />
                          AI Analysis Information
                        </div>
                        <p className="text-sm text-blue-700 mb-2">
                          This scan will be automatically analyzed by our AI system. The AI will:
                        </p>
                        <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
                          <li>Detect abnormalities like fractures, lesions, or tumors</li>
                          <li>Generate a preliminary report within 1 hour</li>
                          <li>Highlight areas of concern on the scan images</li>
                          <li>Forward results to the referring doctor</li>
                        </ul>
                      </div>

                      <div className="flex gap-3">
                        <Button type="submit" className="flex-1">
                          <Upload className="mr-2 h-4 w-4" />
                          Submit for AI Analysis
                        </Button>
                        <Button type="button" variant="outline" className="flex-1">
                          <FileText className="mr-2 h-4 w-4" />
                          Save as Draft
                        </Button>
                      </div>
                    </form>
                  )}

                  <div className="space-y-2">
                    <h3 className="font-medium">Previous Scans</h3>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Scan Type</TableHead>
                            <TableHead>AI Findings</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>2023-03-28</TableCell>
                            <TableCell>MRI - Shoulder</TableCell>
                            <TableCell>Rotator cuff tear detected</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                Abnormal
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm" onClick={() => viewScanDetails(completedScans[2])}>
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>2023-02-15</TableCell>
                            <TableCell>X-Ray - Chest</TableCell>
                            <TableCell>No abnormalities detected</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                Normal
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
              <CardTitle>AI Processing Queue</CardTitle>
              <CardDescription>Scans currently being analyzed by the AI system.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input
                  placeholder="Search by patient name, ID, or scan type"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="space-y-6">
                {filteredPendingScans.map((scan) => (
                  <div key={scan.id} className="border rounded-lg overflow-hidden">
                    <div className="bg-muted p-4 flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{scan.patientName}</h3>
                        <p className="text-sm text-gray-500">
                          {scan.scanType} • Requested by: {scan.requestedBy}
                        </p>
                        <p className="text-sm text-gray-500">
                          Patient ID: {scan.patientId} • Date: {scan.requestDate}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          scan.priority === "High"
                            ? "bg-red-50 text-red-700 border-red-200"
                            : "bg-blue-50 text-blue-700 border-blue-200"
                        }
                      >
                        {scan.priority}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Brain className="h-5 w-5 text-indigo-600" />
                          <span className="font-medium">AI Analysis in Progress</span>
                        </div>
                        <span className="text-sm text-gray-500">{scan.aiProgress}% Complete</span>
                      </div>
                      <Progress value={scan.aiProgress} className="h-2 mb-4" />
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">
                          <Scan className="mr-2 h-4 w-4" />
                          View Original Scan
                        </Button>
                        <Button className="flex-1">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Review When Complete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Scans</CardTitle>
              <CardDescription>Scans that have been analyzed by AI and reviewed by radiologists.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input
                  placeholder="Search by patient name, ID, or scan type"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="space-y-6">
                {filteredCompletedScans.map((scan) => (
                  <div key={scan.id} className="border rounded-lg overflow-hidden">
                    <div className="bg-muted p-4 flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{scan.patientName}</h3>
                        <p className="text-sm text-gray-500">
                          {scan.scanType} • Completed: {scan.completedDate}
                        </p>
                        <p className="text-sm text-gray-500">
                          Patient ID: {scan.patientId} • Radiologist: {scan.radiologist}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          scan.status === "Normal"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }
                      >
                        {scan.status}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-1">AI Findings:</h4>
                        <p className="text-sm p-2 bg-blue-50 border border-blue-100 rounded-md">{scan.aiFindings}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1" onClick={() => {
                          setSelectedScan(scan);
                          setShowAIAnnotations(true);
                        }}>
                          <Scan className="mr-2 h-4 w-4" />
                          View Annotated Scan
                        </Button>
                        <Button className="flex-1" onClick={() => viewScanDetails(scan)}>
                          <FileText className="mr-2 h-4 w-4" />
                          View Full Report
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

      {/* Scan Details Dialog */}
      <Dialog open={showScanDetails} onOpenChange={setShowScanDetails}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Radiology Report: {selectedScan?.scanType}</DialogTitle>
          </DialogHeader>
          {selectedScan && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Patient</h3>
                  <p>{selectedScan.patientName}</p>
                  <p className="text-sm text-gray-500">{selectedScan.patientId}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Scan Information</h3>
                  <p>Completed: {selectedScan.completedDate}</p>
                  <p className="text-sm text-gray-500">Radiologist: {selectedScan.radiologist}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Clinical Details</h3>
                <p className="text-sm">{selectedScan.clinicalDetails}</p>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">AI Analysis</h3>
                  <Badge
                    variant="outline"
                    className={
                      selectedScan.status === "Normal"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }
                  >
                    {selectedScan.status}
                  </Badge>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-100 rounded-md mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Brain className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-700">AI Findings</span>
                  </div>
                  <p className="text-sm text-blue-700">{selectedScan.aiFindings}</p>
                </div>
                <Button variant="outline" size="sm" className="mb-4" onClick={() => {
                  setShowScanDetails(false);
                  setShowAIAnnotations(true);
                }}>
                  <Eye className="mr-2 h-4 w-4" />
                  View AI Annotations
                </Button>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Radiologist Report</h3>
                <p className="text-sm whitespace-pre-line">{selectedScan.reportSummary}</p>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Impression</h3>
                <p className="text-sm font-medium">
                  {selectedScan.status === "Normal" 
                    ? "No significant abnormalities detected." 
                    : selectedScan.aiFindings}
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download Report
                </Button>
                <Button variant="outline">
                  <Printer className="mr-2 h-4 w-4" />
                  Print Report
                </Button>
                <Button onClick={() => setShowScanDetails(false)}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* AI Annotations Dialog */}
      <Dialog open={showAIAnnotations} onOpenChange={setShowAIAnnotations}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>AI Annotated Scan: {selectedScan?.scanType}</DialogTitle>
          </DialogHeader>
          {/* AI Content Here */}
        </DialogContent>
      </Dialog>\
