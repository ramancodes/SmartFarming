import React, { useEffect } from 'react';
import { ArrowLeft, Play } from "lucide-react";

const Card = ({ children, className = '', hover = true }) => (
  <div className={`rounded-lg p-6 bg-white shadow-md ${hover ? 'hover:shadow-xl transition-all duration-300 hover:-translate-y-2' : ''} ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`mb-4 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`${className}`}>
    {children}
  </div>
);

const FarmerTraining = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const courses = [
    {
      title: "What Is Sustainable Agriculture?",
      description: "Learn eco-friendly farming methods that improve soil health and crop yield while reducing environmental impact.",
      source: "Union of Concerned Scientists",
      link: "https://www.ucsusa.org/resources/what-sustainable-agriculture",
      icon: "🌱"
    },
    {
      title: "Organic Pest Control",
      description: "Discover natural methods to protect your crops from pests without using harmful chemicals.",
      source: "South Dakota State University",
      link: "https://extension.sdstate.edu/organic-pest-control-methods",
      icon: "🐞"
    },
    {
      title: "Water Management",
      description: "Master efficient irrigation techniques and water conservation strategies for your farm.",
      source: "Shegal Foundation",
      link: "https://www.smsfoundation.org/water-management/",
      icon: "💧"
    }
  ];

  const resources = [
    {
      title: "Farming Guides",
      description: "Access our collection of detailed guides covering various farming topics.",
      source: "National Institute of Agricultural Management",
      cta: "Download Guide",
      link: "https://www.manage.gov.in/publications/farmerbook.pdf"
    }
  ];

  const handleLinkClick = (url) => {
    if (url && url !== "#") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 w-full">
      {/* Sticky Header */}
      <div className="w-full bg-green-800 sticky top-14 z-50 shadow-md">
        <header className="text-white py-4 px-4 max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <button 
              onClick={onBack} 
              className="p-2 hover:bg-green-700 rounded-full transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft size={24} className="text-white" />
            </button>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold flex-1 text-center">
              Farmer Training Center
            </h1>
          </div>
        </header>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6 md:py-8 space-y-12 mt-14">
        {/* Hero Section */}
        <section className="text-center bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-green-800">
            Learn Modern Farming Techniques
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Join our comprehensive training initiatives designed for both new and experienced farmers. 
            Empower yourself with knowledge and innovative agricultural practices.
          </p>
        </section>

        {/* Video Section */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg group">
          <iframe 
            width="560" 
            height="315"
            className="absolute inset-0 w-full h-full object-cover"
            src="https://www.youtube.com/embed/JeU_EYFH1Jk?si=IrH02Br2Ky1fNfu2" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
          ></iframe>
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Play size={64} className="text-white" />
          </div>
        </div>

        {/* Courses Section */}
        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-green-800 text-center">
            Featured Courses
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <Card key={index} className="flex flex-col">
                <CardHeader className="flex items-center space-x-4">
                  <div className="text-4xl">{course.icon}</div>
                  <h3 className="text-xl font-semibold text-green-700">
                    {course.title}
                  </h3>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <p className="text-gray-600 mb-4 flex-grow text-sm">
                    {course.description}
                  </p>
                  <div className="space-y-2">
                    <p className="text-xs text-gray-500">
                      Source: {course.source}
                    </p>
                    <button 
                      className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors w-full flex items-center justify-center space-x-2"
                      onClick={() => handleLinkClick(course.link)}
                    >
                      <span>Learn More</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Resources Section */}
        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-green-800 text-center">
            Free Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource, index) => (
              <Card key={index} hover={false} className="bg-gradient-to-r from-green-50 to-green-100">
                <CardHeader>
                  <h3 className="text-xl font-semibold text-green-800">
                    {resource.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4 text-sm">
                    {resource.description}
                  </p>
                  <p className="text-xs text-gray-600 mb-4">
                    Source: {resource.source}
                  </p>
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