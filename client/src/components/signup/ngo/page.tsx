import { SignUpForm } from "@/pages/signup-form"

const userType = {
  id: "ngo",
  title: "NGO",
  description: "Non-governmental organizations supporting communities in forest rights processes",
  color: "bg-purple-50 border-purple-200",
  iconColor: "text-purple-600",
}

export default function NGOSignUp() {
  return <SignUpForm userType={userType} />
}
