import {
  DocumentTextIcon,
  GlobeAltIcon,
  LinkIcon,
  BoltIcon,
} from "@heroicons/react/24/solid"; // <-- Note: 'solid' = filled icons

export function StatsSection() {
  const stats = [
    {
      icon: DocumentTextIcon,
      number: "12,000+",
      label: "Claims Digitized",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: GlobeAltIcon,
      number: "5,000+",
      label: "Hectares Mapped",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: LinkIcon,
      number: "20+",
      label: "Govt. Schemes Linked",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      icon: BoltIcon,
      number: "Real-time",
      label: "Asset Insights",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="flex justify-center">
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center ${stat.iconBg}`}
                >
                  <stat.icon className={`w-8 h-8 ${stat.iconColor}`} />
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {stat.number}
                </div>
                <div className="text-sm font-semibold text-gray-600">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
