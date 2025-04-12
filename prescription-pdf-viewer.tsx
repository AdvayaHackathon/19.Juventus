"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FileText } from "lucide-react"

interface Medication {
  name: string
  dosage: string
  frequency: string
  duration: string
}

interface PrescriptionPDFViewerProps {
  prescriptionId: string
  patientName: string
  doctorName: string
  date: string
  medications: Medication[]
}

export function PrescriptionPDFViewer({
  prescriptionId,
  patientName,
  doctorName,
  date,
  medications,
}: PrescriptionPDFViewerProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant="outline" size="sm" className="flex-1" onClick={() => setOpen(true)}>
        <FileText className="mr-2 h-4 w-4" />
        View PDF
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Prescription #{prescriptionId}</DialogTitle>
          </DialogHeader>
          <div className="bg-white p-8 rounded-lg border">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-2xl font-bold text-indigo-700">Nexus Cura Health System</h2>
                <p className="text-gray-500">123 Medical Center Blvd, Cityville</p>
                <p className="text-gray-500">Phone: (123) 456-7890</p>
              </div>
              <div className="text-right">
                <p className="font-bold">Prescription #{prescriptionId}</p>
                <p>Date: {date}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-bold text-gray-700 mb-1">Patient</h3>
                <p>{patientName}</p>
                <p>ID: PT123456</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-700 mb-1">Prescriber</h3>
                <p>{doctorName}</p>
                <p>License: MD987654</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-bold text-gray-700 mb-2">Prescribed Medications</h3>
              <div className="border rounded-lg overflow-hidden">
                <div className="grid grid-cols-4 bg-gray-100 p-3 font-bold text-gray-700">
                  <div>Medication</div>
                  <div>Dosage</div>
                  <div>Frequency</div>
                  <div>Duration</div>
                </div>
                {medications.map((med, index) => (
                  <div key={index} className="grid grid-cols-4 p-3 border-t">
                    <div>{med.name}</div>
                    <div>{med.dosage}</div>
                    <div>{med.frequency}</div>
                    <div>{med.duration}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-bold text-gray-700 mb-2">Instructions</h3>
              <p className="text-gray-700">
                Take medications as prescribed. Complete the full course of treatment even if symptoms improve.
              </p>
            </div>

            <div className="flex justify-between items-center mt-12">
              <div>
                <div className="w-40 border-b border-gray-400 mb-1"></div>
                <p>Patient Signature</p>
              </div>
              <div className="text-right">
                <div className="w-40 border-b border-gray-400 mb-1 ml-auto">
                  <p className="text-indigo-700 font-script">Dr. Signature</p>
                </div>
                <p>{doctorName}</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
