import React, { useState } from "react";
import { ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";

// Prediction Component
const PredictionComponent = ({ onBack }) => (
  <div className="p-4 mt-14">
    <div className="flex items-center mb-4">
      <button onClick={onBack} className="mr-2">
        <ArrowLeft size={24} className="text-green-600" />
      </button>
      <h2 className="text-xl font-bold">Crop Yield Prediction</h2>
    </div>

    <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Current Yield</h3>
          <p className="text-2xl text-green-600">85%</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Predicted Yield</h3>
          <p className="text-2xl text-blue-600">92%</p>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Factors Affecting Yield</h3>
        <ul className="space-y-2">
          <li className="flex justify-between p-2 bg-gray-50 rounded">
            <span>Soil Health</span>
            <span className="text-green-600">Optimal</span>
          </li>
          <li className="flex justify-between p-2 bg-gray-50 rounded">
            <span>Weather</span>
            <span className="text-yellow-600">Fair</span>
          </li>
          <li className="flex justify-between p-2 bg-gray-50 rounded">
            <span>Water Level</span>
            <span className="text-green-600">Good</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

// Disease Detection Component
const DiseaseDetectionComponent = ({ onBack }) => (
  <div className="p-4  mt-14">
    <div className="flex items-center mb-4">
      <button onClick={onBack} className="mr-2">
        <ArrowLeft size={24} className="text-green-600" />
      </button>
      <h2 className="text-xl font-bold">Disease Detection</h2>
    </div>

    <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <button className="bg-green-500 text-white px-6 py-3 rounded-lg">
          Start Scanning
        </button>
        <p className="text-sm text-gray-500 mt-2">Tap to scan your plants</p>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Recent Scans</h3>
        <div className="space-y-2">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span>Wheat Field - Block A</span>
              <span className="text-green-600">Healthy</span>
            </div>
            <p className="text-sm text-gray-500">2 hours ago</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span>Corn Field - Block B</span>
              <span className="text-yellow-600">Minor Issues</span>
            </div>
            <p className="text-sm text-gray-500">1 day ago</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Weather Component
const WeatherComponent = ({ onBack }) => (
  <div className="p-4  mt-14">
    <div className="flex items-center mb-4">
      <button onClick={onBack} className="mr-2">
        <ArrowLeft size={24} className="text-green-600" />
      </button>
      <h2 className="text-xl font-bold">Weather Forecast</h2>
    </div>

    <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
      <div className="text-center p-4">
        <h3 className="text-2xl font-semibold">Today</h3>
        <p className="text-4xl font-bold text-blue-600 my-2">24°C</p>
        <p className="text-gray-600">Partly Cloudy</p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {["Mon", "Tue", "Wed"].map((day) => (
          <div key={day} className="bg-gray-50 p-2 rounded-lg text-center">
            <p className="font-semibold">{day}</p>
            <p className="text-sm">22°C</p>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Weather Alerts</h3>
        <div className="p-3 bg-yellow-50 rounded-lg">
          <p className="text-yellow-700">Light rain expected tomorrow</p>
        </div>
      </div>
    </div>
  </div>
);

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [activeComponent, setActiveComponent] = useState(null);

  const services = [
    {
      title: "Crop Yield Prediction",
      shortDescription: "Predict and optimize your crop yields",
      fullDescription:
        "Using advanced technology, we predict the crop yield based on various environmental factors like soil health, weather patterns, and plant growth stages.",
      features: [
        "Real-time monitoring",
        "Weather pattern analysis",
        "Soil health tracking",
        "Growth stage predictions",
      ],
      actionButtons: [
        {
          label: "Start Prediction",
          action: () => setActiveComponent("prediction"),
          color: "bg-green-500",
        },
        {
          label: "View History",
          action: () => setActiveComponent("prediction"),
          color: "bg-blue-500",
        },
      ],
    },
    {
      title: "Plant Disease Detection",
      shortDescription: "Early detection of plant diseases",
      fullDescription:
        "Our system detects plant diseases early, providing you with insights on pest control, watering schedules, and optimal treatment to prevent the spread.",
      features: [
        "Disease identification",
        "Treatment recommendations",
        "Spread prevention",
        "Historical tracking",
      ],
      actionButtons: [
        {
          label: "Scan Plants",
          action: () => setActiveComponent("disease"),
          color: "bg-green-500",
        },
        {
          label: "View Reports",
          action: () => setActiveComponent("disease"),
          color: "bg-blue-500",
        },
      ],
    },
    {
      title: "Weather Forecasting",
      shortDescription: "Real-time weather forecasting",
      fullDescription:
        "Our advanced weather forecasting system provides accurate, location-based predictions to help farmers plan their activities.",
      features: [
        "Real-time weather updates",
        "Localized forecasts",
        "Precipitation prediction",
        "Temperature tracking",
        "Severe weather alerts",
      ],
      actionButtons: [
        {
          label: "View Forecast",
          action: () => setActiveComponent("weather"),
          color: "bg-green-500",
        },
        {
          label: "View History",
          action: () => setActiveComponent("weather"),
          color: "bg-blue-500",
        },
      ],
    },
  ];

  const handleBack = () => {
    setActiveComponent(null);
    setSelectedService(null);
  };

  if (activeComponent === "prediction") {
    return <PredictionComponent onBack={handleBack} />;
  }

  if (activeComponent === "disease") {
    return <DiseaseDetectionComponent onBack={handleBack} />;
  }

  if (activeComponent === "weather") {
    return <WeatherComponent onBack={handleBack} />;
  }

  return (
    <div className="p-4 mt-14">
      <h1 className="text-2xl font-bold mb-4">Our Services</h1>
      <div className="space-y-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div
              className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
              onClick={() =>
                setSelectedService(selectedService === index ? null : index)
              }
            >
              <div>
                <h2 className="text-xl font-semibold">{service.title}</h2>
                <p className="text-gray-600 text-sm mt-1">
                  {service.shortDescription}
                </p>
              </div>
              <div className="text-gray-400">
                {selectedService === index ? (
                  <ChevronUp size={24} />
                ) : (
                  <ChevronDown size={24} />
                )}
              </div>
            </div>

            {selectedService === index && (
              <div className="px-4 pb-4">
                <div className="border-t pt-4">
                  <p className="text-gray-700 mb-4">
                    {service.fullDescription}
                  </p>

                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">
                      Key Features:
                    </h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="text-gray-600">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {service.actionButtons.map((button, idx) => (
                      <button
                        key={idx}
                        onClick={button.action}
                        className={`${button.color} text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity`}
                      >
                        {button.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
