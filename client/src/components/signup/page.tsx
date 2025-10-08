import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, UserCheck, Users, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const userTypes = [
  {
    id: "central-agency",
    title: "Central Agency",
    description:
      "Government officials and policy makers managing forest rights at the central level",
    icon: Building2,
    color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: "field-officer",
    title: "Field Officer",
    description:
      "Ground-level officers implementing forest rights policies and conducting field surveys",
    icon: UserCheck,
    color: "bg-green-50 border-green-200 hover:bg-green-100",
    iconColor: "text-green-600",
  },
  {
    id: "ngo",
    title: "NGO",
    description:
      "Non-governmental organizations supporting communities in forest rights processes",
    icon: Users,
    color: "bg-purple-50 border-purple-200 hover:bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    id: "planning-development",
    title: "Planning & Development Authorities",
    description:
      "Regional planning bodies coordinating development projects with forest conservation",
    icon: MapPin,
    color: "bg-orange-50 border-orange-200 hover:bg-orange-100",
    iconColor: "text-orange-600",
  },
];

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 overflow-y-auto">
      <div className="w-full max-w-4xl mx-auto py-10 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Your Account
          </h1>
          <p className="text-gray-600 text-lg">
            Select your user type to register
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userTypes.map((userType) => {
            const IconComponent = userType.icon;
            return (
              <Card
                key={userType.id}
                className={`${userType.color} transition-all duration-200 cursor-pointer hover:shadow-lg hover:-translate-y-1`}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md">
                    <IconComponent
                      className={`w-8 h-8 ${userType.iconColor}`}
                    />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {userType.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-sm leading-relaxed">
                    {userType.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Link to={`/signup/${userType.id}`} className="w-full">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Register as {userType.title}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 mb-4">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary hover:text-primary/80 font-medium"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
