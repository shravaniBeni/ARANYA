import { SignUpForm } from "@/pages/signup-form"

const userType = {
  id: "central-agency",
  title: "Central Agency",
  description: "Government officials and policy makers managing forest rights at the central level",
  color: "bg-blue-50 border-blue-200",
  iconColor: "text-blue-600",
}

export default function CentralAgencySignUp() {
  return <SignUpForm userType={userType} />
}
