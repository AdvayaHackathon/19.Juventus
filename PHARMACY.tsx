"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, QrCode, AlertTriangle, CheckCircle2, Home, ShoppingCart } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PharmacistDashboard() {
  const [prescriptionId, setPrescriptionId] = useState("")
  const [prescriptionFound, setPrescriptionFound] = useState(false)
  const [showQRScanner, setShowQRScanner] = useState(false)
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [supplier, setSupplier] = useState("")

  const handleSearchPrescription = (e) => {
    e.preventDefault()
    // In a real app, this would search the database
    if (prescriptionId) {
      setPrescriptionFound(true)
    }
  }

  const inventory = [
    { name: "Amoxicillin 500mg", stock: 120, total: 200, status: "normal", supplier: "MedSupply Inc." },
    { name: "Ibuprofen 400mg", stock: 45, total: 200, status: "low", supplier: "PharmaCorp" },
    { name: "Loratadine 10mg", stock: 80, total: 100, status: "normal", supplier: "AllergyCare" },
    { name: "Omeprazole 20mg", stock: 15, total: 100, status: "critical", supplier: "GastroMeds" },
    { name: "Atorvastatin 10mg", stock: 60, total: 100, status: "normal", supplier: "CardioPharm" },
  ]

  const prescriptions = [
    {
      id: "RX78901",
      patient: "John Doe",
      age: 35,
      doctor: "Dr. Emily Chen",
      date: "2023-04-01",
      medications: [
        { name: "Amoxicillin", dosage: "500mg", quantity: 21, ageRestriction: "None" },
        { name: "Ibuprofen", dosage: "400mg", quantity: 10, ageRestriction: "Not for children under 12" },
      ],
      status: "Ready",
      allergies: ["Penicillin"],
    },
    {
      id: "RX45678",
      patient: "Jane Smith",
      age: 28,
      doctor: "Dr. James Wilson",
      date: "2023-04-01",
      medications: [{ name: "Loratadine", dosage: "10mg", quantity: 30, ageRestriction: "None" }],
      status: "Pending",
      allergies: [],
    },
    {
      id: "RX23456",
      patient: "Robert Johnson",
      age: 72,
      doctor: "Dr. Sarah Brown",
      date: "2023-03-31",
      medications: [
        { name: "Omeprazole", dosage: "20mg", quantity: 30, ageRestriction: "Reduced dosage for elderly" },
        { name: "Atorvastatin", dosage: "10mg", quantity: 30, ageRestriction: "None" },
      ],
      status: "Completed",
      allergies: ["Sulfa drugs"],
    },
  ]

  const suppliers = [
    { name: "MedSupply Inc.", contact: "1-800-123-4567", leadTime: "2-3 days" },
    { name: "PharmaCorp", contact: "1-888-765-4321", leadTime: "1-2 days" },
    { name: "AllergyCare", contact: "1-877-987-6543", leadTime: "3-4 days" },
    { name: "GastroMeds", contact: "1-866-456-7890", leadTime: "2 days" },
    { name: "CardioPharm", contact: "1-855-234-5678", leadTime: "1 day" },
  ]

  return (
    <DashboardLayout title="Pharmacist Dashboard" userRole="Pharmacist" userName="Michael Thompson">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Prescriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{prescriptions.length}</div>
            <p className="text-xs text-muted-foreground">
              {prescriptions.filter((p) => p.status === "Completed").length} completed,{" "}
              {prescriptions.filter((p) => p.status !== "Completed").length} pending
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {inventory.filter((item) => item.status === "low" || item.status === "critical").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {inventory.filter((item) => item.status === "critical").length} critical,{" "}
              {inventory.filter((item) => item.status === "low").length} low
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">QR Payments Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Total: ₹12,575.00</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="prescriptions" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="payments">QR Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="prescriptions">
          <Card>
            <CardHeader>
              <CardTitle>Manage Prescriptions</CardTitle>
              <CardDescription>Search and process patient prescriptions.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearchPrescription} className="space-y-4 mb-6">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter prescription ID"
                    value={prescriptionId}
                    onChange={(e) => setPrescriptionId(e.target.value)}
                  />
                  <Button type="submit">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </div>
              </form>

              <div className="space-y-4">
                {prescriptions.map((prescription) => (
                  <div key={prescription.id} className="border rounded-lg overflow-hidden">
                    <div className="bg-muted p-4 flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{prescription.patient}</h3>
                        <p className="text-sm text-gray-500">
                          {prescription.doctor} • {prescription.date} • Age: {prescription.age}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          prescription.status === "Completed"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : prescription.status === "Ready"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : "bg-amber-50 text-amber-700 border-amber-200"
                        }
                      >
                        {prescription.status}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-500 mb-2">Prescription ID: {prescription.id}</p>

                      {prescription.allergies.length > 0 && (
                        <div className="mb-3 flex flex-wrap gap-2">
                          <span className="text-sm font-medium">Allergies:</span>
                          {prescription.allergies.map((allergy, idx) => (
                            <Badge key={idx} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                              {allergy}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {prescription.id === "RX78901" && (
                        <div className="p-3 mb-4 bg-red-50 border border-red-200 rounded-md">
                          <div className="flex items-center gap-2 text-red-700 font-medium mb-1">
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                            Drug Interaction Alert
                          </div>
                          <p className="text-sm text-red-700 mb-2">
                            Amoxicillin + Ibuprofen may increase the risk of gastrointestinal bleeding. Patient has
                            penicillin allergy which may be relevant.
                          </p>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-300 text-red-700 hover:bg-red-100"
                            >
                              Contact Doctor
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-300 text-red-700 hover:bg-red-100"
                            >
                              Notify Patient
                            </Button>
                          </div>
                        </div>
                      )}

                      {prescription.id === "RX23456" && (
                        <div className="p-3 mb-4 bg-amber-50 border border-amber-200 rounded-md">
                          <div className="flex items-center gap-2 text-amber-700 font-medium mb-1">
                            <AlertTriangle className="h-5 w-5 text-amber-600" />
                            Age-Related Dosage Warning
                          </div>
                          <p className="text-sm text-amber-700 mb-2">
                            Patient is elderly (72 years). Verify reduced dosage for Omeprazole.
                          </p>
                        </div>
                      )}

                      <div className="space-y-2 mb-4">
                        {prescription.medications.map((med, idx) => (
                          <div key={idx} className="p-3 bg-muted/50 rounded-md">
                            <div className="font-medium">
                              {med.name} {med.dosage}
                            </div>
                            <div className="text-sm text-gray-500">Quantity: {med.quantity}</div>
                            {med.ageRestriction !== "None" && (
                              <div className="text-sm text-amber-600 font-medium mt-1">Note: {med.ageRestriction}</div>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        {prescription.status === "Pending" && (
                          <Button className="flex-1">
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Mark as Ready
                          </Button>
                        )}
                        {prescription.status === "Ready" && (
                          <>
                            <Button className="flex-1">
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Complete
                            </Button>
                            <Button variant="outline" className="flex-1">
                              <Home className="mr-2 h-4 w-4" />
                              Home Delivery
                            </Button>
                          </>
                        )}
                        <Button variant="outline" className="flex-1">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Medication Inventory</CardTitle>
                <CardDescription>Monitor your medication stock levels.</CardDescription>
              </div>
              <Button onClick={() => setShowOrderForm(!showOrderForm)}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Order Inventory
              </Button>
            </CardHeader>
            <CardContent>
              {showOrderForm && (
                <div className="mb-6 p-4 border rounded-md bg-muted/30">
                  <h3 className="font-medium mb-3">Order Inventory</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Select Supplier</label>
                        <Select value={supplier} onValueChange={setSupplier}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose supplier" />
                          </SelectTrigger>
                          <SelectContent>
                            {suppliers.map((s) => (
                              <SelectItem key={s.name} value={s.name}>
                                {s.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {supplier && (
                        <div className="p-3 bg-white rounded-md">
                          <h4 className="text-sm font-medium">Supplier Details</h4>
                          <p className="text-sm">{suppliers.find((s) => s.name === supplier)?.contact}</p>
                          <p className="text-sm">Lead time: {suppliers.find((s) => s.name === supplier)?.leadTime}</p>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1 block">Select Items to Order</label>
                      <div className="space-y-2 max-h-40 overflow-y-auto p-2 border rounded-md bg-white">
                        {inventory.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <input type="checkbox" id={`item-${idx}`} className="rounded" />
                              <label htmlFor={`item-${idx}`} className="text-sm">
                                {item.name}
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-500">Current: {item.stock}</span>
                              <Input
                                type="number"
                                placeholder="Qty"
                                className="w-16 h-7 text-sm"
                                defaultValue={item.status === "critical" ? item.total - item.stock : ""}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1">Submit Order</Button>
                      <Button variant="outline" className="flex-1" onClick={() => setShowOrderForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {inventory.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{item.name}</h4>
                        {item.status === "critical" && (
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            Critical
                          </Badge>
                        )}
                        {item.status === "low" && (
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                            Low
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm font-medium">
                        {item.stock} / {item.total}
                      </div>
                    </div>
                    <Progress
                      value={(item.stock / item.total) * 100}
                      className={
                        item.status === "critical"
                          ? "bg-red-100"
                          : item.status === "low"
                            ? "bg-amber-100"
                            : "bg-green-100"
                      }
                    />
                    <div className="text-xs text-gray-500">Supplier: {item.supplier}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>QR Code Payments</CardTitle>
              <CardDescription>Scan patient QR codes for payment processing.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center p-6 border-2 border-dashed rounded-lg mb-6">
                {showQRScanner ? (
                  <div>
                    <div className="w-64 h-64 mx-auto bg-gray-100 flex items-center justify-center mb-4">
                      <QrCode className="h-32 w-32 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500 mb-4">
                      Point the camera at the patient's QR code to process payment.
                    </p>
                    <Button variant="outline" onClick={() => setShowQRScanner(false)}>
                      Cancel Scan
                    </Button>
                  </div>
                ) : (
                  <div>
                    <QrCode className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-sm text-gray-500 mb-4">
                      Click the button below to scan a patient's QR code for payment.
                    </p>
                    <Button onClick={() => setShowQRScanner(true)}>
                      <QrCode className="mr-2 h-4 w-4" />
                      Scan QR Code
                    </Button>
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-medium mb-4">Recent Payments</h3>
                <div className="rounded-md border">
                  <div className="grid grid-cols-4 p-3 font-medium">
                    <div>Patient</div>
                    <div>Prescription</div>
                    <div>Date</div>
                    <div>Amount</div>
                  </div>
                  <div className="grid grid-cols-4 p-3 border-t">
                    <div>John Doe</div>
                    <div>RX78901</div>
                    <div>2023-04-01</div>
                    <div>₹2,575.00</div>
                  </div>
                  <div className="grid grid-cols-4 p-3 border-t">
                    <div>Jane Smith</div>
                    <div>RX45678</div>
                    <div>2023-04-01</div>
                    <div>₹1,250.00</div>
                  </div>
                  <div className="grid grid-cols-4 p-3 border-t">
                    <div>Robert Johnson</div>
                    <div>RX23456</div>
                    <div>2023-03-31</div>
                    <div>₹3,750.00</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
