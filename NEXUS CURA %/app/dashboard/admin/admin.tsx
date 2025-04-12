"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle2, MessageSquare } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function AdminDashboard() {
  const complaints = [
    {
      id: "C001",
      subject: "App Performance Issue",
      submittedBy: "Pharmacist",
      date: "2023-04-01",
      status: "New",
      priority: "Medium",
    },
    {
      id: "C002",
      subject: "Login Problem",
      submittedBy: "Doctor",
      date: "2023-03-30",
      status: "In Progress",
      priority: "High",
    },
    {
      id: "C003",
      subject: "QR Code Not Scanning",
      submittedBy: "Patient",
      date: "2023-03-29",
      status: "In Progress",
      priority: "High",
    },
    {
      id: "C004",
      subject: "Medication Database Update Request",
      submittedBy: "Pharmacist",
      date: "2023-03-28",
      status: "Resolved",
      priority: "Medium",
    },
    {
      id: "C005",
      subject: "Feature Request: Prescription History",
      submittedBy: "Doctor",
      date: "2023-03-25",
      status: "Resolved",
      priority: "Low",
    },
  ]

  const systemStats = [
    { metric: "System Uptime", value: "99.8%", trend: "up" },
    { metric: "Active Users", value: "1,245", trend: "up" },
    { metric: "Prescriptions Processed", value: "5,678", trend: "up" },
    { metric: "Average Response Time", value: "0.5s", trend: "up" },
  ]

  return (
    <DashboardLayout title="Admin Dashboard" userRole="System Administrator" userName="David Wilson">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {systemStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{stat.metric}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                {stat.trend === "up" ? (
                  <CheckCircle2 className="mr-1 h-3 w-3 text-green-500" />
                ) : (
                  <AlertTriangle className="mr-1 h-3 w-3 text-amber-500" />
                )}
                {stat.trend === "up" ? "Healthy" : "Monitor"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="complaints" className="w-full">
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="complaints">System Complaints</TabsTrigger>
        </TabsList>

        <TabsContent value="complaints">
          <Card>
            <CardHeader>
              <CardTitle>User Complaints</CardTitle>
              <CardDescription>Manage and respond to system complaints from users.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complaints.map((complaint) => (
                  <div key={complaint.id} className="border rounded-lg overflow-hidden">
                    <div className="bg-muted p-4 flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{complaint.subject}</h3>
                        <p className="text-sm text-gray-500">
                          Submitted by: {complaint.submittedBy} • {complaint.date}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Badge
                          variant="outline"
                          className={
                            complaint.status === "New"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : complaint.status === "In Progress"
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : "bg-green-50 text-green-700 border-green-200"
                          }
                        >
                          {complaint.status}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={
                            complaint.priority === "High"
                              ? "bg-red-50 text-red-700 border-red-200"
                              : complaint.priority === "Medium"
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : "bg-green-50 text-green-700 border-green-200"
                          }
                        >
                          {complaint.priority}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex gap-2">
                        <Button className="flex-1">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Respond
                        </Button>
                        {complaint.status !== "Resolved" && (
                          <Button variant="outline" className="flex-1">
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Mark as Resolved
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
      </Tabs>
    </DashboardLayout>
  )
}
