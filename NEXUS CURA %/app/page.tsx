import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CrossIcon as MedicalCross,
  Users,
  Pill,
  UserCircle,
  GraduationCap,
  ShieldAlert,
  Building2,
  BookOpen,
  Brain,
  Lock,
  MapPin,
  FileText,
  AlertTriangle,
} from "lucide-react"
import { NexusCuraLogoAnimated } from "@/components/nexus-cura-logo-animated"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <NexusCuraLogoAnimated size="large" />
          <nav>
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Advanced Healthcare Management System</h2>
          <p className="text-xl text-gray-600 mb-8">
            A comprehensive, secure, and AI-powered platform that integrates prescription handling, hospital management,
            pharmacy inventory, and medical education.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/login">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                Get Started
              </Button>
            </Link>
            <Link href="#roles">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </section>

        <section id="roles" className="py-12">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">User Roles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <RoleCard
              title="Receptionist"
              description="Assign unique patient codes and assist with app onboarding."
              icon={<Users className="h-12 w-12 text-indigo-600" />}
            />
            <RoleCard
              title="Patient"
              description="View prescriptions, receive medication alerts, and find nearby pharmacies."
              icon={<UserCircle className="h-12 w-12 text-indigo-600" />}
            />
            <RoleCard
              title="Doctor"
              description="Access patient profiles with OTP verification and track visit history."
              icon={<MedicalCross className="h-12 w-12 text-indigo-600" />}
            />
            <RoleCard
              title="Pharmacist"
              description="Manage inventory, verify prescriptions, and offer home delivery."
              icon={<Pill className="h-12 w-12 text-indigo-600" />}
            />
            <RoleCard
              title="Hospital Management"
              description="Manage hospital codes and doctor verification systems."
              icon={<Building2 className="h-12 w-12 text-indigo-600" />}
            />
            <RoleCard
              title="Student"
              description="Access AI-powered question banks and tiered case studies."
              icon={<GraduationCap className="h-12 w-12 text-indigo-600" />}
            />
            <RoleCard
              title="College Portal"
              description="Manage student access and case study approvals."
              icon={<BookOpen className="h-12 w-12 text-indigo-600" />}
            />
            <RoleCard
              title="Admin"
              description="Oversee hospital codes and system security protocols."
              icon={<ShieldAlert className="h-12 w-12 text-indigo-600" />}
            />
          </div>
        </section>

        <section className="py-12 bg-indigo-50 rounded-lg my-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Security & AI-Driven Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FeatureCard
                title="AI-Powered Learning"
                icon={<Brain className="h-6 w-6 text-indigo-600" />}
                description="Question banks and case studies tailored to student level."
              />
              <FeatureCard
                title="Enhanced Security"
                icon={<Lock className="h-6 w-6 text-indigo-600" />}
                description="OTP verification and end-to-end encryption for all data."
              />
              <FeatureCard
                title="Pharmacy Locator"
                icon={<MapPin className="h-6 w-6 text-indigo-600" />}
                description="Find nearby pharmacies for medication access outside hospitals."
              />
              <FeatureCard
                title="Digital Prescriptions"
                icon={<FileText className="h-6 w-6 text-indigo-600" />}
                description="Auto-generated PDF prescriptions for seamless record-keeping."
              />
              <FeatureCard
                title="Medication Safety"
                icon={<AlertTriangle className="h-6 w-6 text-indigo-600" />}
                description="Drug interaction and overdosage alerts for all users."
              />
              <FeatureCard
                title="Inventory Management"
                icon={<Pill className="h-6 w-6 text-indigo-600" />}
                description="Automated ordering and real-time stock monitoring."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-indigo-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Nexus Cura Healthcare Management System</p>
        </div>
      </footer>
    </div>
  )
}

function RoleCard({ title, description, icon }) {
  return (
    <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-col items-center">
        {icon}
        <CardTitle className="mt-4">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

function FeatureCard({ title, description, icon }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center mb-2">
        {icon}
        <h3 className="font-semibold text-lg ml-2 text-indigo-700">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
