import { SignUpForm } from "@/pages/signup-form"

const userType = {
  id: "field-officer",
  title: "Field Officer",
  description: "Ground-level officers implementing forest rights policies and conducting field surveys",
  color: "bg-green-50 border-green-200",
  iconColor: "text-green-600",
}

export default function FieldOfficerSignUp() {
  return <SignUpForm userType={userType} />
}
