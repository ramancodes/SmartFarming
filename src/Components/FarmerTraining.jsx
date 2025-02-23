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
      sourse: "Union of Concerned Scientists",
      link: "https://www.ucsusa.org/resources/what-sustainable-agriculture"
    },
    {
      title: "Organic Pest Control",
      description: "Discover natural methods to protect your crops from pests without using harmful chemicals.",
      sourse: "#",
      link: "#"
    },
    {
      title: "Water Management",
      description: "Master efficient irrigation techniques and water conservation strategies for your farm.",
      sourse: "#",
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

  return (
    <div className="min-h-screen bg-green-50 mt-14">
      {/* Header */}
      <div className="flex flex-col items-center mb-4 bg-green-800">
        <header className="text-white pb-8 px-4 text-center">
          <button onClick={onBack} className="mr-2 p-4 flex item-center justify-center mb-2">
            <ArrowLeft size={30} className="text-white" />
            <h1 className="text-3xl font-bold">Farmer Training Center</h1>
          </button>
          <p className="text-lg">
            Empowering farmers with knowledge and skills
          </p>
        </header>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            Learn Modern Farming Techniques
          </h2>
          <p className="text-gray-600">
            Join our comprehensive training programs designed for both new and
            experienced farmers
          </p>
        </section>

        {/* Video Section */}
        <div className="relative w-full aspect-video mb-12 rounded-lg overflow-hidden">
          <iframe
            className="absolute inset-0 w-full h-full object-cover"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/O0iQbCf-A_M?si=ShnDwnbXCrUWZxCV"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>

        {/* Courses Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-green-800 mb-6">
            Featured Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <Card
                key={index}
                className="bg-white shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardHeader>
                  <h3 className="text-xl font-semibold text-green-700">
                    {course.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 text-sm">Source: {course.sourse}</p>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <button className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors w-full" onClick={course.link}>
                    Learn More
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Resources Section */}
        <section>
          <h2 className="text-2xl font-bold text-green-800 mb-6">
            Free Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource, index) => (
              <Card
                key={index}
                className="bg-white shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardHeader>
                  <h3 className="text-xl font-semibold text-green-700">
                    {resource.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  <button className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors w-full" onClick={resource.link}>
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