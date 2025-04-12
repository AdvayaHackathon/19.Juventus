"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"

interface AppointmentSchedulerProps {
  onClose: () => void
}

export function AppointmentScheduler({ onClose }: AppointmentSchedulerProps) {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [specialist, setSpecialist] = useState("")
  const [timeSlot, setTimeSlot] = useState("")

  const specialists = [
    { id: "1", name: "Dr. Emily Chen", specialty: "General Practitioner" },
    { id: "2", name: "Dr. Robert Smith", specialty: "Dermatologist" },
    { id: "3", name: "Dr. Sarah Johnson", specialty: "Cardiologist" },
    { id: "4", name: "Dr. Michael Brown", specialty: "Orthopedic Surgeon" },
    { id: "5", name: "Dr. Jennifer Lee", specialty: "Neurologist" },
  ]

  const timeSlots = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
  ]

  const handleSchedule = () => {
    // In a real app, this would send the appointment data to a server
    alert(`Appointment scheduled with ${specialist} on ${date?.toLocaleDateString()} at ${timeSlot}`)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="relative">
          <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={onClose} aria-label="Close">
            <X className="h-4 w-4" />
          </Button>
          <CardTitle>Schedule an Appointment</CardTitle>
          <CardDescription>Choose a specialist, date, and time for your appointment.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Specialist</label>
            <Select value={specialist} onValueChange={setSpecialist}>
              <SelectTrigger>
                <SelectValue placeholder="Select a specialist" />
              </SelectTrigger>
              <SelectContent>
                {specialists.map((doc) => (
                  <SelectItem key={doc.id} value={doc.name}>
                    {doc.name} - {doc.specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Select Date</label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="border rounded-md p-3"
              disabled={(date) => {
                const today = new Date()
                today.setHours(0, 0, 0, 0)
                return date < today || date.getDay() === 0 || date.getDay() === 6
              }}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Select Time</label>
            <Select value={timeSlot} onValueChange={setTimeSlot}>
              <SelectTrigger>
                <SelectValue placeholder="Select a time slot" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleSchedule}
            className="w-full bg-indigo-600 hover:bg-indigo-700"
            disabled={!specialist || !date || !timeSlot}
          >
            Schedule Appointment
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
