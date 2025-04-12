"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { X, Clock, Save, Plus, Trash2 } from "lucide-react"
import { format, addDays } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function DoctorAvailabilityManager({ onClose }) {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [availabilityPattern, setAvailabilityPattern] = useState({
    monday: { enabled: true, slots: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"] },
    tuesday: { enabled: true, slots: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"] },
    wednesday: { enabled: true, slots: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"] },
    thursday: { enabled: true, slots: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"] },
    friday: { enabled: true, slots: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"] },
    saturday: { enabled: false, slots: [] },
    sunday: { enabled: false, slots: [] },
  })
  const [specialDates, setSpecialDates] = useState([
    { date: addDays(new Date(), 5), status: "unavailable", reason: "Conference" },
    { date: addDays(new Date(), 10), status: "limited", slots: ["9:00 AM - 11:00 AM"] },
  ])
  const [newTimeSlot, setNewTimeSlot] = useState("")
  const [editingDay, setEditingDay] = useState(null)

  // Time slot options
  const timeSlotOptions = [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
    "5:00 PM - 6:00 PM",
    "9:00 AM - 12:00 PM",
    "2:00 PM - 5:00 PM",
  ]

  // Days of the week
  const daysOfWeek = [
    { key: "monday", label: "Monday" },
    { key: "tuesday", label: "Tuesday" },
    { key: "wednesday", label: "Wednesday" },
    { key: "thursday", label: "Thursday" },
    { key: "friday", label: "Friday" },
    { key: "saturday", label: "Saturday" },
    { key: "sunday", label: "Sunday" },
  ]

  // Handle day availability toggle
  const toggleDayAvailability = (day) => {
    setAvailabilityPattern({
      ...availabilityPattern,
      [day]: {
        ...availabilityPattern[day],
        enabled: !availabilityPattern[day].enabled,
      },
    })
  }

  // Add time slot to a day
  const addTimeSlot = (day) => {
    if (!newTimeSlot) return

    setAvailabilityPattern({
      ...availabilityPattern,
      [day]: {
        ...availabilityPattern[day],
        slots: [...availabilityPattern[day].slots, newTimeSlot],
      },
    })
    setNewTimeSlot("")
  }

  // Remove time slot from a day
  const removeTimeSlot = (day, index) => {
    const updatedSlots = [...availabilityPattern[day].slots]
    updatedSlots.splice(index, 1)

    setAvailabilityPattern({
      ...availabilityPattern,
      [day]: {
        ...availabilityPattern[day],
        slots: updatedSlots,
      },
    })
  }

  // Add special date
  const addSpecialDate = () => {
    if (!selectedDate) return

    // Check if date already exists
    const existingIndex = specialDates.findIndex(
      (d) => format(d.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd"),
    )

    if (existingIndex >= 0) {
      // Update existing date
      const updatedDates = [...specialDates]
      updatedDates[existingIndex] = {
        date: selectedDate,
        status: "unavailable",
        reason: "Out of Office",
      }
      setSpecialDates(updatedDates)
    } else {
      // Add new date
      setSpecialDates([
        ...specialDates,
        {
          date: selectedDate,
          status: "unavailable",
          reason: "Out of Office",
        },
      ])
    }
  }

  // Remove special date
  const removeSpecialDate = (index) => {
    const updatedDates = [...specialDates]
    updatedDates.splice(index, 1)
    setSpecialDates(updatedDates)
  }

  // Check if a date is a special date
  const isSpecialDate = (date) => {
    return specialDates.some((specialDate) => format(specialDate.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd"))
  }

  // Get special date status
  const getSpecialDateStatus = (date) => {
    const specialDate = specialDates.find((d) => format(d.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd"))
    return specialDate ? specialDate.status : null
  }

  // Save availability settings
  const saveAvailabilitySettings = () => {
    // In a real app, this would save to the database
    alert("Availability settings saved successfully!")
    onClose()
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Manage Availability</CardTitle>
            <CardDescription>Set your regular schedule and special availability dates</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="weekly">Weekly Schedule</TabsTrigger>
            <TabsTrigger value="special">Special Dates</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly">
            <div className="space-y-4">
              <div className="text-sm font-medium">Set your regular weekly availability</div>

              <div className="space-y-4">
                {daysOfWeek.map((day) => (
                  <div key={day.key} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`${day.key}-available`}
                          checked={availabilityPattern[day.key].enabled}
                          onCheckedChange={() => toggleDayAvailability(day.key)}
                        />
                        <Label htmlFor={`${day.key}-available`} className="font-medium">
                          {day.label}
                        </Label>
                      </div>

                      {availabilityPattern[day.key].enabled && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingDay(editingDay === day.key ? null : day.key)}
                        >
                          {editingDay === day.key ? "Done" : "Edit"}
                        </Button>
                      )}
                    </div>

                    {availabilityPattern[day.key].enabled && (
                      <div className="pl-6">
                        {availabilityPattern[day.key].slots.length > 0 ? (
                          <div className="flex flex-wrap gap-2 mb-2">
                            {availabilityPattern[day.key].slots.map((slot, index) => (
                              <div
                                key={index}
                                className="flex items-center bg-indigo-50 text-indigo-700 text-xs rounded-full px-2 py-1"
                              >
                                <Clock className="h-3 w-3 mr-1" />
                                <span>{slot}</span>
                                {editingDay === day.key && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-4 w-4 p-0 ml-1 text-indigo-700 hover:text-red-600"
                                    onClick={() => removeTimeSlot(day.key, index)}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500 mb-2">No time slots set for this day</p>
                        )}

                        {editingDay === day.key && (
                          <div className="flex items-center gap-2 mt-2">
                            <Select value={newTimeSlot} onValueChange={setNewTimeSlot}>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select time slot" />
                              </SelectTrigger>
                              <SelectContent>
                                {timeSlotOptions.map((slot) => (
                                  <SelectItem key={slot} value={slot}>
                                    {slot}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => addTimeSlot(day.key)}
                              disabled={!newTimeSlot}
                            >
                              <Plus className="h-4 w-4 mr-1" />
                              Add
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="special">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium mb-2">Select dates for special availability</div>
                <div className="border rounded-md p-1">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                    modifiers={{
                      unavailable: specialDates.filter((d) => d.status === "unavailable").map((d) => d.date),
                      limited: specialDates.filter((d) => d.status === "limited").map((d) => d.date),
                    }}
                    modifiersClassNames={{
                      unavailable: "bg-red-100 text-red-700",
                      limited: "bg-amber-100 text-amber-700",
                    }}
                  />
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 rounded-full bg-red-100"></div>
                    <span>Unavailable</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 rounded-full bg-amber-100"></div>
                    <span>Limited Hours</span>
                  </div>
                  <Button size="sm" variant="outline" onClick={addSpecialDate}>
                    <Plus className="h-4 w-4 mr-1" />
                    Mark as Unavailable
                  </Button>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">Special dates</div>
                {specialDates.length > 0 ? (
                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                    {specialDates.map((specialDate, index) => (
                      <div key={index} className="flex justify-between items-center p-2 border rounded-md">
                        <div>
                          <div className="font-medium">{format(specialDate.date, "PPP")}</div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className={
                                specialDate.status === "unavailable"
                                  ? "bg-red-50 text-red-700 border-red-200"
                                  : "bg-amber-50 text-amber-700 border-amber-200"
                              }
                            >
                              {specialDate.status === "unavailable" ? "Unavailable" : "Limited Hours"}
                            </Badge>
                            {specialDate.reason && <span className="text-xs text-gray-500">{specialDate.reason}</span>}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSpecialDate(index)}
                          className="text-gray-500 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-8 border rounded-md bg-gray-50">
                    <p className="text-gray-500">No special dates set</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Select a date on the calendar and mark it as unavailable
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={saveAvailabilitySettings} className="bg-indigo-600 hover:bg-indigo-700">
          <Save className="mr-2 h-4 w-4" />
          Save Availability
        </Button>
      </CardFooter>
    </Card>
  )
}
