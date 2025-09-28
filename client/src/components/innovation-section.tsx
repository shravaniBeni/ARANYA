import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mic, Search, Smartphone } from "lucide-react";

export function InnovationSection() {
  const innovations = [
    {
      icon: Mic,
      title: "Voice Feedback AI",
      description:
        "Advanced voice recognition system enabling community members to provide feedback and report issues in their native languages.",
    },
    {
      icon: Search,
      title: "Conflict Detection",
      description:
        "AI-powered system to identify potential conflicts in forest rights claims and suggest resolution pathways automatically.",
    },
    {
      icon: Smartphone,
      title: "Mobile Field Agent App",
      description:
        "Comprehensive mobile application enabling field agents to collect data, update records, and sync information in real-time.",
    },
  ];

  return (
    <section className="py-20 bg-[#2E7D32] text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance overflow-hidden">
            Innovation Highlights
          </h2>
          <p className="text-lg !text-[#DCFCE7] max-w-2xl mx-auto">
            Cutting-edge technology features that set Aranya apart
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {innovations.map((innovation, index) => (
            <Card
              key={index}
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
            >
              <CardHeader className="text-center pb-4 overflow-hidden">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                    <innovation.icon className="w-6 h-6 overflow-visible" />
                  </div>
                </div>
                <CardTitle className="text-2xl">{innovation.title}</CardTitle>
              </CardHeader>
              <CardContent className="overflow-hidden">
                <CardDescription className="text-center text-white/80 leading-relaxed text-base">
                  {innovation.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
