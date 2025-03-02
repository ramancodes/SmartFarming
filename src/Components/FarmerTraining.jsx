import React from 'react';
import { ArrowLeft } from "lucide-react";

const Card = ({ children, className = '' }) => (
  <div className={`rounded-lg p-6 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="mb-4">
    {children}
  </div>
);

const CardContent = ({ children }) => (
  <div>
    {children}
  </div>
);

const FarmerTraining = ({ onBack }) => {
  const courses = [
    {
      title: "What Is Sustainable Agriculture?",
      description: "Learn eco-friendly farming methods that improve soil health and crop yield while reducing environmental impact.",
      source: "Union of Concerned Scientists", // Fixed typo in property name
      link: "https://www.ucsusa.org/resources/what-sustainable-agriculture"
    },
    {
      title: "Organic Pest Control",
      description: "Discover natural methods to protect your crops from pests without using harmful chemicals.",
      source: "#", // Fixed typo in property name
      link: "#"
    },
    {
      title: "Water Management",
      description: "Master efficient irrigation techniques and water conservation strategies for your farm.",
      source: "#", // Fixed typo in property name
      link: "#"
    }
  ];

  const resources = [
    {
      title: "Farming Guides",
      description: "Access our collection of detailed guides covering various farming topics.",
      cta: "Download",
      link: "https://www.manage.gov.in/publications/farmerbook.pdf"
    }
  ];

  // Handle link clicks properly
  const handleLinkClick = (url) => {
    if (url && url !== "#") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="min-h-screen bg-green-50 w-full mt-14">
      {/* Header - Fixed positioning and improved mobile responsiveness */}
      <div className="w-full bg-green-800 sticky top-14 z-10">
        <header className="text-white py-4 px-4 max-w-6xl mx-auto">
          <div className="flex items-center">
            <button 
              onClick={onBack} 
              className=" p-2 flex items-center justify-center"
              aria-label="Go back"
            >
              <ArrowLeft size={24} className="text-white" />
            </button>
            <div className="text-center flex-1">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">Farmer Training Center</h1>
            </div>
          </div>
        </header>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-6 md:py-8">
        {/* Hero Section */}
        <section className="text-center mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-green-800 mb-2 md:mb-4">
            Learn Modern Farming Techniques
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Join our comprehensive training initiaves designed for both new and
            experienced farmers
          </p>
        </section>

        {/* Video Section */}
        <div className="relative w-full aspect-video mb-8 md:mb-12 rounded-lg overflow-hidden">
        <iframe 
        width="560" 
        height="315"
        className="absolute inset-0 w-full h-full object-cover"
        src="https://www.youtube.com/embed/JeU_EYFH1Jk?si=IrH02Br2Ky1fNfu2" 
        title="YouTube video player" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerPolicy="strict-origin-when-cross-origin" 
        allowFullScreen></iframe>
        </div>

        {/* Courses Section */}
        <section className="mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-green-800 mb-4 md:mb-6">
            Featured Courses
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {courses.map((course, index) => (
              <Card
                key={index}
                className="bg-white shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardHeader>
                  <h3 className="text-lg md:text-xl font-semibold text-green-700">
                    {course.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2 text-xs md:text-sm">Source: {course.source}</p>
                  <p className="text-gray-600 mb-4 text-sm md:text-base">{course.description}</p>
                  <button 
                    className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors w-full"
                    onClick={() => handleLinkClick(course.link)}
                  >
                    Learn More
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Resources Section */}
        <section>
          <h2 className="text-xl md:text-2xl font-bold text-green-800 mb-4 md:mb-6">
            Free Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {resources.map((resource, index) => (
              <Card
                key={index}
                className="bg-white shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardHeader>
                  <h3 className="text-lg md:text-xl font-semibold text-green-700">
                    {resource.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 text-sm md:text-base">{resource.description}</p>
                  <button 
                    className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors w-full"
                    onClick={() => handleLinkClick(resource.link)}
                  >
                    {resource.cta}
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default FarmerTraining;