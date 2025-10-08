import { SignUpForm } from "@/pages/signup-form"

const userType = {
  id: "planning-development",
  title: "Planning & Development Authorities",
  description: "Regional planning bodies coordinating development projects with forest conservation",
  color: "bg-orange-50 border-orange-200",
  iconColor: "text-orange-600",
}

export default function PlanningDevelopmentSignUp() {
  return <SignUpForm userType={userType} />
}
