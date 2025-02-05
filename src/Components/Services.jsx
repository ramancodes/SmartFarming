import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Using FontAwesome icons for dropdown and up arrows

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      title: "Crop Yield Prediction",
      shortDescription: "Real-time monitoring of crop health and growth stages.",
      fullDescription:
        "Using advanced technology, we predict the crop yield based on various environmental factors like soil health, weather patterns, and plant growth stages.",
    },
    {
      title: "Plant Disease Detection",
      shortDescription: "Smart irrigation systems with automated scheduling.",
      fullDescription:
        "Our system detects plant diseases early, providing you with insights on pest control, watering schedules, and optimal treatment to prevent the spread.",
    },
  ];

  const handleSelectService = (service) => {
    // Toggle the visibility of the service details by checking if it's already selected
    setSelectedService(selectedService === service ? null : service);
  };

  return (
    <div className="p-4 mt-14">
      <h1 className="text-2xl font-bold mb-4">Our Services</h1>

      <div className="space-y-4">
        {services.map((service, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => handleSelectService(service)} // Toggle service visibility on click
            >
              <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
              <div className="text-xl">
                {selectedService === service ? (
                  <FaChevronUp /> // Show up icon when expanded
                ) : (
                  <FaChevronDown /> // Show down icon when collapsed
                )}
              </div>
            </div>

            {selectedService === service && (
              <div>
                <p className="text-gray-600 mb-2">{service.shortDescription}</p>
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={() => alert("Getting more details...")}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg"
                  >
                    Get More Details
                  </button>
                  <button
                    onClick={() => alert(`Scanning ${service.title}...`)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                  >
                    Scan Plant
                  </button>
                </div>

                {selectedService === service && (
                  <div className="mt-4 text-gray-600">
                    <p>{service.fullDescription}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
