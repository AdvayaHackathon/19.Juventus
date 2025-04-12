"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NexusCuraLogo } from "@/components/nexus-cura-logo"

export default function LoginPage() {
  const router = useRouter()
  const [role, setRole] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [hospitalCode, setHospitalCode] = useState("")
  const [otp, setOtp] = useState("")
  const [showOtp, setShowOtp] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()

    // For doctor role, show OTP verification
    if (role === "doctor" && !showOtp) {
      setShowOtp(true)
      return
    }

    // In a real app, you would validate credentials here
    // For demo purposes, we'll just redirect based on role
    if (username && password && role) {
      router.push(`/dashboard/${role.toLowerCase()}`)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 to-white p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Link href="/">
            <NexusCuraLogo size="large" />
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Login to Nexus Cura</CardTitle>
            <CardDescription className="text-center">Enter your credentials to access the system</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="standard" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="standard">Standard Login</TabsTrigger>
                <TabsTrigger value="hospital">Hospital Login</TabsTrigger>
              </TabsList>

              <TabsContent value="standard">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Select Role</Label>
                    <Select
                      value={role}
                      onValueChange={(value) => {
                        setRole(value)
                        setShowOtp(false)
                      }}
                      required
                    >
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="receptionist">Receptionist</SelectItem>
                        <SelectItem value="patient">Patient</SelectItem>
                        <SelectItem value="doctor">Doctor</SelectItem>
                        <SelectItem value="pharmacist">Pharmacist</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="college">College Portal</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  {role === "doctor" && showOtp && (
                    <div className="space-y-2">
                      <Label htmlFor="otp">OTP Verification</Label>
                      <div className="flex gap-2">
                        <Input
                          id="otp"
                          type="text"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="Enter OTP sent to your device"
                          required
                        />
                        <Button type="button" variant="outline" onClick={() => alert("OTP resent!")}>
                          Resend
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500">
                        For security, we verify doctors working at multiple hospitals with OTP.
                      </p>
                    </div>
                  )}

                  <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                    {role === "doctor" && !showOtp ? "Send OTP" : "Login"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="hospital">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="hospitalCode">Hospital Code</Label>
                    <Input
                      id="hospitalCode"
                      type="text"
                      value={hospitalCode}
                      onChange={(e) => setHospitalCode(e.target.value)}
                      placeholder="Enter your hospital's unique code"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                    Login to Hospital Portal
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/" className="text-sm text-indigo-600 hover:text-indigo-800">
              Back to home
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
