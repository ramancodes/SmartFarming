import React, { useContext, useEffect, useState } from "react";
import { 
  ChevronDown, ChevronUp, ArrowRight, Cloud, Leaf, Bug, 
  Droplet, FlaskConical, BookOpen, ArrowLeft, Zap 
} from "lucide-react";
import { AppContext } from "../Context/AppContext";
import WeatherComponent from "./WeatherForcasting";
import RecommendationComponent from "./CropRecommendation";
import DiseaseDetectionComponent from "./CropDieseaseDetection";
import { toast } from "react-toastify";
import FarmerTraning from "./FarmerTraining";
import SoilHealth from "./SoilHealth";
import IrrigationManagement from "./IrrigationManagement";

const ServiceCard = ({ service, index, isSelected, onSelect, onAction }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
      className={`relative group transform transition-all duration-300 ${
        isSelected ? 'scale-[1.02] z-10 shadow-2xl' : 'hover:scale-[1.02]'
      } bg-white rounded-2xl overflow-hidden`}
    >
      {/* Gradient Background Overlay */}
      <div 
        className={`absolute inset-0 opacity-10 group-hover:opacity-20 transition-all duration-300 ${
          isSelected 
            ? 'bg-gradient-to-br from-green-400 to-blue-500' 
            : 'bg-gradient-to-br from-gray-100 to-gray-200'
        }`}
      />

      <div
        className="relative p-4 sm:p-6 cursor-pointer"
        onClick={onSelect}
      >
        <div className="flex flex-col sm:flex-row items-start justify-between space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 w-full">
            <div className={`self-start p-3 sm:p-4 rounded-xl shadow-md transition-all duration-300 ${
              isSelected 
                ? 'bg-green-100 sm:-translate-y-2 sm:rotate-6' 
                : 'bg-gray-100 group-hover:rotate-6'
            }`}>
              <IconComponent className={`w-6 h-6 sm:w-8 sm:h-8 ${
                isSelected ? 'text-green-600' : 'text-gray-600'
              }`} />
            </div>
            <div className="flex-1">
              <h2 className={`text-xl sm:text-2xl font-bold transition-colors duration-300 ${
                isSelected ? 'text-green-700' : 'text-gray-800 group-hover:text-green-600'
              }`}>
                {service.title}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-md">
                {service.shortDescription}
              </p>
            </div>
          </div>
          <div className={`text-gray-400 transition-transform duration-300 ${
            isSelected ? 'rotate-180' : ''
          }`}>
            <ChevronDown size={24} className="group-hover:text-green-600" />
          </div>
        </div>

        <div className={`mt-6 transition-all duration-300 ${
          isSelected ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'
        }`}>
          <div className="border-t border-dashed border-gray-200 pt-6">
            <p className="text-sm sm:text-base text-gray-700 mb-6 leading-relaxed">
              {service.fullDescription}
            </p>

            <div className="mb-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <Zap className="mr-2 sm:mr-3 text-yellow-500 w-5 h-5 sm:w-6 sm:h-6" />
                Key Features
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {service.features.map((feature, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center space-x-3 text-sm sm:text-base text-gray-700 bg-gray-50 p-3 rounded-xl hover:bg-green-50 transition-colors"
                  >
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {service.actionButtons.map((button, idx) => (
                <button
                  key={idx}
                  onClick={button.action}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white 
                  px-6 sm:px-8 py-3 sm:py-4 rounded-xl 
                  hover:from-green-600 hover:to-blue-600 transition-all duration-300 
                  flex items-center justify-center space-x-3 group shadow-lg hover:shadow-xl
                  text-sm sm:text-base"
                >
                  <span className="font-semibold">{button.label}</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-8 sm:py-16 mt-14">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-8 sm:mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text 
          bg-gradient-to-r from-green-600 to-blue-600 mb-3 sm:mb-4">
            Smart Farming Solutions
          </h1>
          <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Empowering farmers with cutting-edge technology and intelligent solutions 
            to optimize agricultural productivity and sustainability
          </p>
        </div>
        
        <div className="space-y-6 sm:space-y-8">
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