import React, { useContext, useState } from "react";
import { ChevronDown, ChevronUp, ArrowRight, Cloud, Leaf, Bug, Droplet, FlaskConical, BookOpen, ArrowLeft } from "lucide-react";
import { AppContext } from "../Context/AppContext";
import WeatherComponent from "./WeatherForcasting";
import RecommendationComponent from "./CropRecommendation";
import DiseaseDetectionComponent from "./CropDieseaseDetection";
import { toast } from "react-toastify";
import FarmerTraning from "./FarmerTraining";
import SoilHealth from "./SoilHealth";
import IrrigationManagement from "./IrrigationManagement";

const ServiceCard = ({ service, index, isSelected, onSelect, onAction }) => {
  const icons = {
    "Weather Forecasting": Cloud,
    "Smart Crop Recommendation": Leaf,
    "Plant Disease Detection": Bug,
    "Irrigation Management": Droplet,
    "Soil Health Analysis": FlaskConical,
    "Farmer Training": BookOpen,
  };
  const IconComponent = icons[service.title];
  
  return (
    <div 
      className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ${
        isSelected ? 'ring-2 ring-green-500' : 'hover:shadow-lg'
      }`}
    >
      <div
        className="p-6 cursor-pointer"
        onClick={onSelect}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className={`p-3 rounded-lg ${
              isSelected ? 'bg-green-100' : 'bg-gray-100'
            }`}>
              <IconComponent className={`w-6 h-6 ${
                isSelected ? 'text-green-600' : 'text-gray-600'
              }`} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{service.title}</h2>
              <p className="text-gray-600 mt-1">{service.shortDescription}</p>
            </div>
          </div>
          <div className={`text-gray-400 transition-transform duration-300 ${
            isSelected ? 'rotate-180' : ''
          }`}>
            <ChevronDown size={24} />
          </div>
        </div>

        <div className={`mt-6 transition-all duration-300 ${
          isSelected ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'
        }`}>
          <div className="border-t pt-4">
            <p className="text-gray-700 mb-6 leading-relaxed">
              {service.fullDescription}
            </p>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Key Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {service.features.map((feature, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center space-x-2 text-gray-600 bg-gray-50 p-3 rounded-lg"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {service.actionButtons.map((button, idx) => (
              <button
                key={idx}
                onClick={button.action}
                className="w-full md:w-auto bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-300 flex items-center justify-center space-x-2 group"
              >
                <span>{button.label}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  const {
    handleBack,
    selectedService,
    setSelectedService,
    activeComponent,
    setActiveComponent,
    token
  } = useContext(AppContext);

  const services = [
    {
      title: "Weather Forecasting",
      shortDescription: "Real-time weather forecasting for precise farming decisions",
      fullDescription:
        "Our advanced weather forecasting system provides accurate, location-based predictions to help farmers plan their activities effectively. Stay ahead of weather changes and protect your crops.",
      features: [
        "Real-time weather updates",
        "Localized forecasts",
        "Precipitation prediction",
        "Temperature tracking",
        "Severe weather alerts",
      ],
      actionButtons: [{
        label: "View Forecast",
        action: () => {
          if(!token) {
            toast.warn('Login to continue')
          } else {
            setActiveComponent("weather")
          }
        },
      }],
    },
    {
      title: "Smart Crop Recommendation",
      shortDescription: "AI-powered crop selection for optimal yields",
      fullDescription:
        "Using advanced technology, we help farmers select the most suitable crops based on soil composition, climate conditions, and regional growing patterns.",
      features: [
        "Soil analysis interpretation",
        "Climate suitability mapping",
        "Season-wise crop suggestions",
      ],
      actionButtons: [{
        label: "View Recommendation",
        action: () => {
          if(!token) {
            toast.warn('Login to continue')
          } else {
            setActiveComponent("recommendation")
          }
        },
      }],
    },
    {
      title: "Plant Disease Detection",
      shortDescription: "Early detection and prevention of plant diseases",
      fullDescription:
        "Our system detects plant diseases early, providing you with insights on pest control, watering schedules, and optimal treatment to prevent the spread.",
      features: [
        "Disease identification",
        "Treatment recommendations",
        "Spread prevention",
        "Historical tracking",
      ],
      actionButtons: [{
        label: "Scan Plants",
        action: () => {
          if(!token) {
            toast.warn('Login to continue')
          } else {
            setActiveComponent("disease")
          }
        },
      }],
    },
    {
      title: "Irrigation Management",
      shortDescription: "Smart irrigation solutions for efficient water usage",
      fullDescription:
        "Optimize your water usage with our intelligent irrigation solutions. Get precise recommendations based on soil moisture, weather conditions, and crop requirements.",
      features: [
        "Crop-specific irrigation tips",
        "Water usage trends",
        "Drought risk guidance",
        "Water conservation practices",
      ],
      actionButtons: [{
        label: "Manage Irrigation",
        action: () => {
          if(!token) {
            toast.warn('Login to continue')
          } else {
            setActiveComponent("irrigation")
          }
        },
      }],
    },
    // {
    //   title: "Soil Health Analysis",
    //   shortDescription: "Comprehensive soil testing and management solutions",
    //   fullDescription:
    //     "Get detailed insights into your soil's health with our advanced analysis tools. Receive personalized recommendations for soil improvement and maintenance.",
    //   features: [
    //     "Detailed nutrient analysis",
    //     "pH level monitoring",
    //     "Organic matter content assessment",
    //     "Fertilizer recommendations",
    //     "Soil improvement tracking",
    //   ],
    //   actionButtons: [{
    //     label: "Analyze Soil",
    //     action: () => {
    //       if(!token) {
    //         toast.warn('Login to continue')
    //       } else {
    //         setActiveComponent("soil")
    //       }
    //     },
    //   }],
    // },
    {
      title: "Farmer Training",
      shortDescription: "Educational resources and training programs for farmers",
      fullDescription:
        "Access comprehensive training materials and expert guidance to enhance your farming knowledge and skills. Learn about modern farming techniques, sustainable practices, and agricultural innovations.",
      features: [
        "Video tutorials",
        "Interactive workshops",
        "Expert consultations",
        "Best practices guides",
        "Community forums",
      ],
      actionButtons: [{
        label: "Start Learning",
        action: () => {
          if(!token) {
            toast.warn('Login to continue')
          } else {
            setActiveComponent("training")
          }
        },
      }],
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

  if (activeComponent === "irrigation") {
    return <IrrigationManagement onBack={handleBack} />;
  }

  if (activeComponent === "soil") {
    return <SoilHealth onBack={handleBack} />;
  }

  if (activeComponent === "training") {
    return <FarmerTraning onBack={handleBack} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4 mt-14">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Our Services</h1>
          <p className="text-gray-600">Discover our range of smart farming solutions</p>
        </div>
        
        <div className="space-y-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
              isSelected={selectedService === index}
              onSelect={() => setSelectedService(selectedService === index ? null : index)}
              onAction={(action) => action()}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;