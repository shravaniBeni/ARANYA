import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Globe, Bot, TrendingUp } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Globe,
      title: "FRA Atlas Visualization",
      description:
        "Interactive mapping system providing comprehensive visualization of forest rights data, claims, and territorial boundaries with real-time updates.",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: Bot,
      title: "AI-Powered Asset Mapping",
      description:
        "Advanced machine learning algorithms automatically identify and map forest assets, providing accurate data for better decision-making processes.",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: TrendingUp,
      title: "DSS Recommendations",
      description:
        "Intelligent decision support system providing data-driven recommendations for policy implementation and resource allocation.",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 overflow-hidden">
            Powerful Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools designed to transform forest rights
            administration and community empowerment
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="rounded-xl shadow-sm bg-white hover:shadow-lg hover:-translate-y-1 transition duration-300 p-6 min-h-[320px] flex flex-col justify-start"
            >
              <CardHeader className="items-center text-center space-y-4">
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center ${feature.bgColor}`}
                >
                  <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                </div>
                <CardTitle className="text-2xl font-semi-bold text-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <CardDescription className="text-base text-muted-foreground leading-relaxed text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
