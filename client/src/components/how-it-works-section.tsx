import { Target, Map, BarChart3, HeadphonesIcon } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      icon: Target,
      title: "Digitize",
      description:
        "Convert physical documents and claims into digital format for easy processing and storage",
      color: "bg-green-500",
    },
    {
      icon: Map,
      title: "Map",
      description:
        "Create accurate geographical representations of forest areas and community territories",
      color: "bg-blue-500",
    },
    {
      icon: BarChart3,
      title: "Analyze",
      description:
        "Apply AI algorithms to extract insights and identify patterns in forest rights data",
      color: "bg-purple-500",
    },
    {
      icon: HeadphonesIcon,
      title: "Support",
      description:
        "Provide intelligent recommendations and support for informed decision-making",
      color: "bg-orange-500",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance overflow-hidden">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Simple, efficient workflow designed for seamless forest rights
            administration
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="flex justify-center">
                <div
                  className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center text-white shadow-lg`}
                >
                  <step.icon className="w-8 h-8" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed text-pretty">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
