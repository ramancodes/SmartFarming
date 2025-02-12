import React, { useContext, useState } from "react";
import { ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";
import { AppContext } from "../Context/AppContext";
import WeatherComponent from "./WeatherForcasting";
import RecommendationComponent from "./CropRecommendation";
import DiseaseDetectionComponent from "./CropDieseaseDetection";

const Services = () => {
  const {handleBack, selectedService, setSelectedService, activeComponent, setActiveComponent} = useContext(AppContext);

  const services = [
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
        }
      ],
    },
    {
      title: "Smart Crop Recommendation",
      shortDescription: "Choose the perfect crops for your farm",
      fullDescription:
      "Using advanced technology, we help farmers select the most suitable crops based on soil composition, climate conditions, and regional growing patterns.",
      features: [
      "Soil analysis interpretation",
      "Climate suitability mapping",
      "Season-wise crop suggestions"
      ],
      actionButtons: [
        {
          label: "View Recommendation",
          action: () => setActiveComponent("recommendation"),
          color: "bg-green-500",
        }
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
        }
      ],
    },
  ];

  if (activeComponent === "recommendation") {
    return <RecommendationComponent onBack={handleBack} />;
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
