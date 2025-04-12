"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, FileText, GraduationCap, Brain, CheckCircle, HelpCircle } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { Progress } from "@/components/ui/progress"

export default function StudentDashboard() {
  const [showQuestionBank, setShowQuestionBank] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [selectedCase, setSelectedCase] = useState(null)

  const caseStudies = [
    {
      id: "CS001",
      title: "Respiratory Infection Case Study",
      patient: "Anonymous Patient, 45",
      doctor: "Anonymous Doctor",
      date: "2023-03-15",
      category: "Respiratory",
      status: "New",
      details: {
        symptoms: "Persistent cough for 2 weeks, fever (38.5°C), fatigue, and shortness of breath.",
        vitals: "BP: 130/85 mmHg, HR: 92 bpm, RR: 22/min, SpO2: 94% on room air",
        diagnosis: "Community-acquired pneumonia",
        treatment: "Amoxicillin-clavulanate 875/125 mg twice daily for 7 days, supportive care with hydration and rest",
        labResults: "WBC: 12,500/μL (elevated), CRP: 45 mg/L (elevated), Chest X-ray: Right lower lobe infiltrate",
        followUp: "Review in 7 days, sooner if symptoms worsen",
      },
    },
    {
      id: "CS002",
      title: "Hypertension Management",
      patient: "Anonymous Patient, 62",
      doctor: "Anonymous Doctor",
      date: "2023-03-10",
      category: "Cardiovascular",
      status: "Reviewed",
      details: {
        symptoms: "Occasional headaches, dizziness, and fatigue. No chest pain or shortness of breath.",
        vitals: "BP: 168/98 mmHg (repeated measurements over 3 visits), HR: 76 bpm, RR: 16/min",
        diagnosis: "Stage 2 Hypertension with no evidence of end-organ damage",
        treatment: "Amlodipine 5mg once daily, dietary sodium restriction, regular exercise program",
        labResults:
          "Lipid panel: Total cholesterol 220 mg/dL, LDL 140 mg/dL, HDL 45 mg/dL, Triglycerides 180 mg/dL. Renal function normal.",
        followUp: "Review in 2 weeks to assess BP control and medication tolerance",
      },
    },
    {
      id: "CS003",
      title: "Type 2 Diabetes Initial Diagnosis",
      patient: "Anonymous Patient, 51",
      doctor: "Anonymous Doctor",
      date: "2023-03-05",
      category: "Endocrinology",
      status: "Reviewed",
      details: {
        symptoms:
          "Polyuria, polydipsia, unexplained weight loss (5kg over 3 months), blurred vision, and recurrent infections.",
        vitals: "BP: 142/88 mmHg, HR: 84 bpm, Weight: 92kg, BMI: 31.2 kg/m²",
        diagnosis: "Type 2 Diabetes Mellitus",
        treatment: "Metformin 500mg twice daily with meals, dietary counseling, diabetes education program",
        labResults: "FPG: 186 mg/dL, HbA1c: 8.2%, Urine microalbumin: negative",
        followUp: "Review in 1 month with repeat HbA1c and fasting glucose",
      },
    },
    {
      id: "CS004",
      title: "Pediatric Asthma Treatment",
      patient: "Anonymous Patient, 8",
      doctor: "Anonymous Doctor",
      date: "2023-03-01",
      category: "Pediatrics",
      status: "New",
      details: {
        symptoms:
          "Recurrent episodes of wheezing, coughing, and shortness of breath, especially during physical activity and at night.",
        vitals: "RR: 28/min, HR: 100 bpm, SpO2: 96% on room air, Peak flow: 70% of predicted",
        diagnosis: "Mild persistent asthma",
        treatment:
          "Fluticasone 88mcg inhaler (2 puffs twice daily), Salbutamol as needed for acute symptoms, Asthma action plan provided",
        labResults:
          "Spirometry: FEV1/FVC ratio reduced, significant improvement post-bronchodilator. IgE levels elevated.",
        followUp: "Review in 4 weeks to assess symptom control and inhaler technique",
      },
    },
  ]

  const assignments = [
    {
      id: "A001",
      title: "Medication Interaction Analysis",
      dueDate: "2023-04-10",
      status: "Pending",
    },
    {
      id: "A002",
      title: "Case Study Review: Hypertension",
      dueDate: "2023-04-15",
      status: "Pending",
    },
    {
      id: "A003",
      title: "Prescription Writing Practice",
      dueDate: "2023-04-05",
      status: "Overdue",
    },
  ]

  const questions = [
    {
      question: "What is the primary mechanism of action for Amlodipine in treating hypertension?",
      options: [
        "Blocks calcium channels in vascular smooth muscle",
        "Inhibits angiotensin-converting enzyme",
        "Blocks beta-adrenergic receptors",
        "Increases sodium excretion",
      ],
      correctAnswer: 0,
      explanation:
        "Amlodipine is a calcium channel blocker that relaxes vascular smooth muscle by preventing calcium entry, leading to vasodilation and reduced blood pressure.",
    },
    {
      question: "Which of the following is a common side effect of Spironolactone?",
      options: ["Hyperkalemia", "Hypokalemia", "Increased blood glucose", "Tachycardia"],
      correctAnswer: 0,
      explanation:
        "Spironolactone is a potassium-sparing diuretic that can cause hyperkalemia (elevated potassium levels) as it inhibits aldosterone-mediated potassium excretion.",
    },
    {
      question:
        "In a patient with Stage 2 Hypertension, what would be the target blood pressure according to current guidelines?",
      options: ["<140/90 mmHg", "<130/80 mmHg", "<120/70 mmHg", "<150/90 mmHg"],
      correctAnswer: 1,
      explanation:
        "Current guidelines recommend a target blood pressure of <130/80 mmHg for most adults with hypertension, including those with Stage 2 Hypertension.",
    },
  ]

  const progressByYear = {
    "1st Year": { required: 3, completed: 1 },
    "2nd Year": { required: 5, completed: 3 },
    "3rd Year": { required: 10, completed: 5 },
    "4th Year": { required: 20, completed: 12 },
    Internship: { required: 25, completed: 10 },
  }

  const studentYear = "3rd Year"

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowAnswer(false)
    } else {
      setShowQuestionBank(false)
      setCurrentQuestion(0)
      setSelectedAnswer(null)
      setShowAnswer(false)
    }
  }

  const handleCaseSelect = (caseStudy) => {
    setSelectedCase(caseStudy)
  }

  return (
    <DashboardLayout title="Student Dashboard" userRole="Medical Student" userName="Alex Johnson">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Available Case Studies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{caseStudies.length}</div>
            <p className="text-xs text-muted-foreground">
              {caseStudies.filter((cs) => cs.status === "New").length} new,{" "}
              {caseStudies.filter((cs) => cs.status === "Reviewed").length} reviewed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignments.length}</div>
            <p className="text-xs text-muted-foreground">
              {assignments.filter((a) => a.status === "Overdue").length} overdue, next due on{" "}
              {assignments.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))[0].dueDate}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Weekly Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {progressByYear[studentYear].completed}/{progressByYear[studentYear].required}
            </div>
            <div className="mt-2">
              <Progress
                value={(progressByYear[studentYear].completed / progressByYear[studentYear].required) * 100}
                className="h-2"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {studentYear} requirement: {progressByYear[studentYear].required} case studies per week
            </p>
          </CardContent>
        </Card>
      </div>

      {showQuestionBank ? (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="h-5 w-5 mr-2 text-indigo-600" />
              AI-Powered Question Bank
            </CardTitle>
            <CardDescription>Test your knowledge on hypertension medications and management.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium text-lg mb-3">
                  Question {currentQuestion + 1} of {questions.length}
                </h3>
                <p className="mb-4">{questions[currentQuestion].question}</p>

                <div className="space-y-2 mb-4">
                  {questions[currentQuestion].options.map((option, idx) => (
                    <div
                      key={idx}
                      className={`p-3 border rounded-lg cursor-pointer ${
                        selectedAnswer === idx
                          ? showAnswer
                            ? idx === questions[currentQuestion].correctAnswer
                              ? "bg-green-50 border-green-200"
                              : "bg-red-50 border-red-200"
                            : "bg-indigo-50 border-indigo-200"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => !showAnswer && setSelectedAnswer(idx)}
                    >
                      <div className="flex items-center">
                        {showAnswer && idx === questions[currentQuestion].correctAnswer && (
                          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        )}
                        {showAnswer && selectedAnswer === idx && idx !== questions[currentQuestion].correctAnswer && (
                          <HelpCircle className="h-5 w-5 text-red-600 mr-2" />
                        )}
                        <span>{option}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {showAnswer && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                    <h4 className="font-medium mb-1">Explanation:</h4>
                    <p>{questions[currentQuestion].explanation}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  {selectedAnswer !== null && !showAnswer && (
                    <Button className="flex-1" onClick={() => setShowAnswer(true)}>
                      Check Answer
                    </Button>
                  )}

                  {showAnswer && (
                    <Button className="flex-1" onClick={handleNextQuestion}>
                      {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
                    </Button>
                  )}

                  <Button variant="outline" className="flex-1" onClick={() => setShowQuestionBank(false)}>
                    Exit Quiz
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button className="mb-6 bg-indigo-600 hover:bg-indigo-700" onClick={() => setShowQuestionBank(true)}>
          <Brain className="mr-2 h-4 w-4" />
          Open AI Question Bank
        </Button>
      )}

      <Tabs defaultValue="cases" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="cases">Case Studies</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
        </TabsList>

        <TabsContent value="cases">
          <Card>
            <CardHeader>
              <CardTitle>Available Case Studies</CardTitle>
              <CardDescription>Real-world anonymized case studies for learning purposes.</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedCase ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">{selectedCase.title}</h2>
                    <Button variant="outline" onClick={() => setSelectedCase(null)}>
                      Back to List
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-indigo-50 rounded-lg">
                      <h3 className="font-medium text-indigo-700 mb-2">Patient Information</h3>
                      <p className="text-sm mb-1">
                        <span className="font-medium">Patient:</span> {selectedCase.patient}
                      </p>
                      <p className="text-sm mb-1">
                        <span className="font-medium">Attending Physician:</span> {selectedCase.doctor}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Date:</span> {selectedCase.date}
                      </p>
                    </div>

                    <div className="p-4 bg-indigo-50 rounded-lg">
                      <h3 className="font-medium text-indigo-700 mb-2">Vital Signs</h3>
                      <p className="text-sm">{selectedCase.details.vitals}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Presenting Symptoms</h3>
                      <p>{selectedCase.details.symptoms}</p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Laboratory Results</h3>
                      <p>{selectedCase.details.labResults}</p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Diagnosis</h3>
                      <p>{selectedCase.details.diagnosis}</p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Treatment Plan</h3>
                      <p>{selectedCase.details.treatment}</p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Follow-up Plan</h3>
                      <p>{selectedCase.details.followUp}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1">
                      <FileText className="mr-2 h-4 w-4" />
                      Download Case PDF
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Submit Case Analysis
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {caseStudies.map((caseStudy) => (
                    <div key={caseStudy.id} className="border rounded-lg overflow-hidden">
                      <div className="bg-muted p-4 flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{caseStudy.title}</h3>
                          <p className="text-sm text-gray-500">
                            {caseStudy.patient} • {caseStudy.doctor}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            caseStudy.status === "New"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : "bg-green-50 text-green-700 border-green-200"
                          }
                        >
                          {caseStudy.status}
                        </Badge>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-4">
                          <Badge variant="outline">{caseStudy.category}</Badge>
                          <span className="text-sm text-gray-500">Added on {caseStudy.date}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button className="flex-1" onClick={() => handleCaseSelect(caseStudy)}>
                            <BookOpen className="mr-2 h-4 w-4" />
                            Study Case
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <FileText className="mr-2 h-4 w-4" />
                            View Prescription
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments">
          <Card>
            <CardHeader>
              <CardTitle>Your Assignments</CardTitle>
              <CardDescription>Assignments related to prescription management and case studies.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-4 border rounded-lg bg-indigo-50">
                <h3 className="font-medium mb-2">Assignment Requirements by Year</h3>
                <div className="space-y-2">
                  {Object.entries(progressByYear).map(([year, progress]) => (
                    <div key={year} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm ${year === studentYear ? "font-bold" : ""}`}>{year}</span>
                        {year === studentYear && (
                          <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200">Current</Badge>
                        )}
                      </div>
                      <span className="text-sm">{progress.required} case studies/week</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-indigo-100">
                        <GraduationCap className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{assignment.title}</h4>
                        <p className="text-sm text-gray-500">Due: {assignment.dueDate}</p>
                      </div>
                    </div>
                    <div>
                      <Badge
                        variant="outline"
                        className={
                          assignment.status === "Overdue"
                            ? "bg-red-50 text-red-700 border-red-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }
                      >
                        {assignment.status}
                      </Badge>
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
