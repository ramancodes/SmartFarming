import React, { useEffect, useState } from "react";
import { 
  ArrowLeft, Droplets, Cloud, Sun, Clock, 
  InfoIcon, ExternalLink, ChevronDown 
} from "lucide-react";

const IrrigationManagement = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState("basics");
  const [isTabsExpanded, setIsTabsExpanded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tabs = [
    { id: "basics", label: "Basics", icon: <Droplets size={20} /> },
    { id: "techniques", label: "Techniques", icon: <Cloud size={20} /> },
    { id: "efficiency", label: "Efficiency", icon: <Sun size={20} /> },
    { id: "schedule", label: "Scheduling", icon: <Clock size={20} /> },
  ];

  // Handle link clicks properly
  const handleLinkClick = (url) => {
    if (url && url !== "#") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-4 px-4 mt-14">
      <div className="max-w-2xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button 
            onClick={onBack} 
            className="mr-4 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition"
          >
            <ArrowLeft size={24} className="text-blue-600" />
          </button>
          <h2 className="text-2xl font-bold text-gray-800">Irrigation Management</h2>
        </div>

        {/* Navigation Tabs - Mobile Friendly */}
        <div className="mb-4">
          {/* Mobile Dropdown */}
          <div className="md:hidden">
            <div 
              onClick={() => setIsTabsExpanded(!isTabsExpanded)}
              className="bg-white p-3 rounded-xl flex items-center justify-between shadow-md cursor-pointer"
            >
              <span className="font-medium">
                {tabs.find(tab => tab.id === activeTab).label}
              </span>
              <ChevronDown 
                size={20} 
                className={`transition-transform ${isTabsExpanded ? 'rotate-180' : ''}`} 
              />
            </div>
            {isTabsExpanded && (
              <div className="bg-white rounded-b-xl shadow-md">
                {tabs.map((tab) => (
                  <div
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setIsTabsExpanded(false);
                    }}
                    className={`p-3 hover:bg-green-50 flex items-center ${
                      activeTab === tab.id ? 'bg-green-100' : ''
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Tabs */}
          <div className="hidden md:block overflow-x-auto">
            <div className="flex space-x-2 pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`ml-4 flex items-center px-4 py-2 whitespace-nowrap rounded-full text-sm font-medium transition-all shadow-sm ${
                    activeTab === tab.id
                      ? "bg-green-500 text-white scale-105"
                      : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  <span className="mr-1.5">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Content Container with Scrollable Area */}
          <div className="p-4 md:p-6 max-h-[70vh] overflow-y-auto">
            {activeTab === "basics" && (
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-green-700 mb-4 border-b pb-2 border-green-200">
                  Irrigation Basics
                </h3>
                
                <div className="relative w-full aspect-video mb-6 rounded-xl overflow-hidden shadow-md">
                  <iframe 
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/K0ViMFTenDw?si=Lj5i8f6MqSlT7uZE" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen
                  ></iframe>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                  <h4 className="font-semibold text-green-800 mb-3 flex items-center text-base md:text-lg">
                    <InfoIcon size={20} className="mr-2 text-green-600" />
                    Key Components
                  </h4>
                  <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                    {[
                      "Water source (wells, rivers, reservoirs)",
                      "Distribution system (canals, pipes)",
                      "Application devices (sprinklers, drip emitters)",
                      "Drainage system",
                      "Control systems (timers, sensors, valves)"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2 text-base md:text-lg">Did You Know?</h4>
                  <p className="text-gray-700 text-sm md:text-base">
                    Modern irrigation systems can reduce water usage by 30-50% compared 
                    to traditional flooding methods while improving crop yield and quality.
                  </p>
                </div>
              </div>
            )}
            {/* Other tab content remains similar, with responsive text sizing */}
            {activeTab === "techniques" && (
              <div>
                <h3 className="text-2xl font-bold text-green-700 mb-4 border-b pb-2 border-green-200">
                  Irrigation Techniques
                </h3>

                <div className="space-y-4 mb-6">
                  {[
                    {
                      title: "Drip Irrigation",
                      description: "Delivers water directly to the plant's root zone through emitters. Highly efficient with 90-95% water use efficiency."
                    },
                    {
                      title: "Sprinkler Irrigation",
                      description: "Simulates rainfall by spraying water through the air. Good for larger areas with 70-80% efficiency."
                    },
                    {
                      title: "Center Pivot",
                      description: "A movable pipe with sprinklers rotates around a central pivot point. Excellent for large, flat fields."
                    },
                    {
                      title: "Furrow Irrigation",
                      description: "Water flows down small trenches running alongside crop rows. Traditional method with 50-60% efficiency."
                    }
                  ].map((technique, index) => (
                    <div 
                      key={index} 
                      className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-green-700">{technique.title}</h4>
                      </div>
                      <p className="text-sm text-gray-600">{technique.description}</p>
                    </div>
                  ))}
                </div>

                <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-md">
                  <iframe 
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/Ulf8E1XnhgI?si=UH3V2wsjhCbRBhy_" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            {/* Other tabs remain similar in design, with enhanced visual hierarchy */}
            {activeTab === "efficiency" && (
              <div>
                <h3 className="text-2xl font-bold text-green-700 mb-4 border-b pb-2 border-green-200">
                  Water Efficiency
                </h3>
                
                <div className="space-y-4 mb-6">
                  {[
                    {
                      icon: <Droplets size={24} className="text-green-600" />,
                      title: "Soil Moisture Monitoring",
                      description: "Using sensors to measure soil moisture and irrigate only when necessary."
                    },
                    {
                      icon: <Clock size={24} className="text-green-600" />,
                      title: "Precision Timing",
                      description: "Irrigating during cooler parts of the day to reduce evaporation loss."
                    },
                    {
                      icon: <Sun size={24} className="text-green-600" />,
                      title: "Weather-Based Control",
                      description: "Adjusting irrigation schedules based on weather forecasts and evapotranspiration data."
                    },
                    {
                      icon: <Cloud size={24} className="text-green-600" />,
                      title: "Deficit Irrigation",
                      description: "Strategic under-irrigation during less sensitive growth stages to maximize water productivity."
                    }
                  ].map((strategy, index) => (
                    <div 
                      key={index} 
                      className="bg-green-50 rounded-xl p-4 border border-green-200 flex items-start hover:shadow-md transition-all"
                    >
                      <div className="bg-green-100 p-3 rounded-full mr-4">
                        {strategy.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-800 mb-1">{strategy.title}</h4>
                        <p className="text-sm text-gray-700">{strategy.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                    <InfoIcon size={20} className="mr-2 text-blue-600" />
                    Global Impact
                  </h4>
                  <p className="text-gray-700">
                    Agriculture accounts for about 70% of all freshwater withdrawals globally. 
                    Improving irrigation efficiency by just 10% could save enough water to supply 
                    many of the world's largest cities.
                  </p>
                </div>
              </div>
            )}

            {/* Scheduling tab with similar enhanced design */}
            {activeTab === "schedule" && (
              <div>
                <h3 className="text-2xl font-bold text-green-700 mb-4 border-b pb-2 border-green-200">
                  Irrigation Scheduling
                </h3>
                
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 mb-6">
                  <h4 className="font-semibold text-green-800 mb-3">Scheduling Methods</h4>
                  {[
                    {
                      title: "Soil-Based Scheduling",
                      methods: [
                        "Monitoring soil moisture with sensors",
                        "Feel and appearance method",
                        "Gravimetric sampling"
                      ]
                    },
                    {
                      title: "Plant-Based Scheduling",
                      methods: [
                        "Monitoring plant stress indicators",
                        "Leaf temperature measurements",
                        "Visual observation of wilting"
                      ]
                    },
                    {
                      title: "Weather-Based Scheduling",
                      methods: [
                        "Evapotranspiration (ET) models",
                        "Weather station data integration",
                        "Historical climate patterns"
                      ]
                    }
                  ].map((method, index) => (
                    <div key={index} className="mb-3">
                      <h5 className="font-medium text-green-700 mb-2">{method.title}</h5>
                      <ul className="space-y-1 text-sm text-gray-700 pl-4 list-disc">
                        {method.methods.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <h4 className="font-semibold text-green-800 mb-3">Optimal Irrigation Factors</h4>
                  <div className="space-y-2">
                    {[
                      "Crop type and growth stage",
                      "Root zone depth and soil type",
                      "Current weather conditions",
                      "Irrigation system efficiency",
                      "Water quality and availability"
                    ].map((factor, index) => (
                      <div key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        <span className="text-gray-700">{factor}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Resources Section */}
        <div className="bg-white rounded-b-2xl shadow-lg p-4 md:p-6 mt-4">
          <h3 className="font-semibold text-lg mb-4 text-green-800 border-b pb-2">
            Helpful Resources
          </h3>
          <div className="space-y-4">
            {[
              {
                title: "Local Extension Services",
                description: "Contact your local agricultural extension office for region-specific irrigation recommendations.",
                borderColor: "border-green-500",
                onClick: () => {}
              },
              {
                title: "Water Resources",
                description: "Access government resources for irrigation best practices and potential funding assistance.",
                borderColor: "border-blue-500",
                onClick: () => handleLinkClick('https://jalshakti-dowr.gov.in/')
              }
            ].map((resource, index) => (
              <div 
                key={index} 
                onClick={resource.onClick} 
                className={`p-4 bg-gray-50 rounded-xl border-l-4 ${resource.borderColor} hover:shadow-md transition-all cursor-pointer`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1 text-base md:text-lg">{resource.title}</h4>
                    <p className="text-sm text-gray-600">{resource.description}</p>
                  </div>
                  {resource.title === "Water Resources" && <ExternalLink size={20} className="text-blue-500" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IrrigationManagement;