import React, { useState } from "react";
import { ArrowLeft, Droplets, Cloud, Sun, Clock, InfoIcon } from "lucide-react";

const IrrigationManagement = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState("basics");

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
    <div className="mt-14 min-h-screen bg-gray-50">
      <div className="p-4 max-w-lg mx-auto">
        <div className="flex items-center mb-4">
          <button onClick={onBack} className="mr-2">
            <ArrowLeft size={24} className="text-green-600" />
          </button>
          <h2 className="text-xl font-bold">Irrigation Management</h2>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto mb-4 pb-1 scrollbar-hide">
          <div className="flex space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-green-500 text-white"
                    : "bg-white text-gray-600 border border-gray-200"
                }`}
              >
                <span className="mr-1.5">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Section */}
        <div className="bg-white rounded-xl shadow p-4 mb-4">
          {activeTab === "basics" && (
            <div>
              <h3 className="text-lg font-semibold text-green-700 mb-3">
                Irrigation Basics
              </h3>
              <p className="mb-3 text-gray-700">
                Irrigation is the controlled application of water to crops to support 
                plant growth. Without proper irrigation, crop yields can be 
                significantly reduced, especially in arid or semi-arid regions.
              </p>

              <div className="relative w-full aspect-video mb-8 md:mb-12 rounded-lg overflow-hidden">
              <iframe 
                className="absolute inset-0 w-full h-full object-cover"
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/K0ViMFTenDw?si=Lj5i8f6MqSlT7uZE" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen></iframe>
              </div>

              <h4 className="font-medium text-green-600 mt-4 mb-2">Key Components</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                <li>Water source (wells, rivers, reservoirs)</li>
                <li>Distribution system (canals, pipes)</li>
                <li>Application devices (sprinklers, drip emitters)</li>
                <li>Drainage system</li>
                <li>Control systems (timers, sensors, valves)</li>
              </ul>

              <div className="bg-green-50 p-3 rounded-lg flex items-start mb-4">
                <InfoIcon size={20} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">
                  Modern irrigation systems can reduce water usage by 30-50% compared 
                  to traditional flooding methods while improving crop yield and quality.
                </p>
              </div>
            </div>
          )}

          {activeTab === "techniques" && (
            <div>
              <h3 className="text-lg font-semibold text-green-700 mb-3">
                Irrigation Techniques
              </h3>

              <div className="relative w-full aspect-video mb-8 md:mb-12 rounded-lg overflow-hidden">
                <iframe 
                  className="absolute inset-0 w-full h-full object-cover"
                  width="560" 
                  height="315" 
                  src="https://www.youtube.com/embed/Z9HAy9EYKKs?si=YkucJxZf0YLld87U" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen></iframe>
              </div>
              
              <div className="space-y-4 mb-4">
                <div className="border border-gray-200 rounded-lg p-3">
                  <h4 className="font-medium text-green-600 mb-1">Drip Irrigation</h4>
                  <p className="text-sm text-gray-700">
                    Delivers water directly to the plant's root zone through emitters. 
                    Highly efficient with 90-95% water use efficiency.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-3">
                  <h4 className="font-medium text-green-600 mb-1">Sprinkler Irrigation</h4>
                  <p className="text-sm text-gray-700">
                    Simulates rainfall by spraying water through the air. Good for larger areas 
                    with 70-80% efficiency.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-3">
                  <h4 className="font-medium text-green-600 mb-1">Center Pivot</h4>
                  <p className="text-sm text-gray-700">
                    A movable pipe with sprinklers rotates around a central pivot point. 
                    Excellent for large, flat fields.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-3">
                  <h4 className="font-medium text-green-600 mb-1">Furrow Irrigation</h4>
                  <p className="text-sm text-gray-700">
                    Water flows down small trenches running alongside crop rows. Traditional 
                    method with 50-60% efficiency.
                  </p>
                </div>
              </div>

              <div className="relative w-full aspect-video mb-8 md:mb-12 rounded-lg overflow-hidden">
              <iframe 
                className="absolute inset-0 w-full h-full object-cover"
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/Ulf8E1XnhgI?si=UH3V2wsjhCbRBhy_" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen></iframe>
              </div>
            </div>
          )}

          {activeTab === "efficiency" && (
            <div>
              <h3 className="text-lg font-semibold text-green-700 mb-3">
                Water Efficiency
              </h3>
              
              <p className="mb-4 text-gray-700">
                Water efficiency in irrigation is critical for sustainable agriculture, 
                especially in regions facing water scarcity. Modern techniques and technologies 
                can help maximize crop yield while minimizing water consumption.
              </p>
              
              <h4 className="font-medium text-green-600 mt-4 mb-2">Efficiency Strategies</h4>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-3 flex-shrink-0">
                    <Droplets size={18} className="text-green-600" />
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-800">Soil Moisture Monitoring</h5>
                    <p className="text-sm text-gray-600">Using sensors to measure soil moisture and irrigate only when necessary.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-3 flex-shrink-0">
                    <Clock size={18} className="text-green-600" />
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-800">Precision Timing</h5>
                    <p className="text-sm text-gray-600">Irrigating during cooler parts of the day to reduce evaporation loss.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-3 flex-shrink-0">
                    <Sun size={18} className="text-green-600" />
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-800">Weather-Based Control</h5>
                    <p className="text-sm text-gray-600">Adjusting irrigation schedules based on weather forecasts and evapotranspiration data.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-3 flex-shrink-0">
                    <Cloud size={18} className="text-green-600" />
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-800">Deficit Irrigation</h5>
                    <p className="text-sm text-gray-600">Strategic under-irrigation during less sensitive growth stages to maximize water productivity.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400">
                <h5 className="font-medium text-yellow-700">Did You Know?</h5>
                <p className="text-sm text-gray-700">
                  Agriculture accounts for about 70% of all freshwater withdrawals globally. 
                  Improving irrigation efficiency by just 10% could save enough water to supply 
                  many of the world's largest cities.
                </p>
              </div>
            </div>
          )}

          {activeTab === "schedule" && (
            <div>
              <h3 className="text-lg font-semibold text-green-700 mb-3">
                Irrigation Scheduling
              </h3>
              
              <p className="mb-4 text-gray-700">
                Irrigation scheduling determines when and how much water to apply to crops. 
                Proper scheduling maximizes yield while conserving water and energy.
              </p>
              
              <h4 className="font-medium text-green-600 mb-2">Scheduling Methods</h4>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h5 className="font-medium text-gray-800 mb-2">1. Soil-Based Scheduling</h5>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 mb-3">
                  <li>Monitoring soil moisture with sensors</li>
                  <li>Feel and appearance method</li>
                  <li>Gravimetric sampling</li>
                </ul>
                
                <h5 className="font-medium text-gray-800 mb-2">2. Plant-Based Scheduling</h5>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 mb-3">
                  <li>Monitoring plant stress indicators</li>
                  <li>Leaf temperature measurements</li>
                  <li>Visual observation of wilting</li>
                </ul>
                
                <h5 className="font-medium text-gray-800 mb-2">3. Weather-Based Scheduling</h5>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Evapotranspiration (ET) models</li>
                  <li>Weather station data integration</li>
                  <li>Historical climate patterns</li>
                </ul>
              </div>
              
              <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                <h4 className="font-medium text-green-700 mb-2">Optimal Irrigation Schedule Factors</h4>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    <span>Crop type and growth stage</span>
                  </p>
                  <p className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    <span>Root zone depth and soil type</span>
                  </p>
                  <p className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    <span>Current weather conditions</span>
                  </p>
                  <p className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    <span>Irrigation system efficiency</span>
                  </p>
                  <p className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    <span>Water quality and availability</span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Resources Section */}
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-semibold text-lg mb-3">Helpful Resources</h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg border-l-4 border-green-500">
              <h4 className="font-medium">Local Extension Services</h4>
              <p className="text-sm text-gray-600 mt-1">Contact your local agricultural extension office for region-specific irrigation recommendations.</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500" onClick={()=>handleLinkClick('https://jalshakti-dowr.gov.in/')}>
              <h4 className="font-medium">Water Resources</h4>
              <p className="text-sm text-gray-600 mt-1">Access government resources for irrigation best practices and potential funding assistance.</p>
            </div>
            {/* <div className="p-3 bg-gray-50 rounded-lg border-l-4 border-yellow-500">
              <h4 className="font-medium">Irrigation Associations</h4>
              <p className="text-sm text-gray-600 mt-1">Join professional networks to stay updated on the latest irrigation technologies and practices.</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IrrigationManagement;