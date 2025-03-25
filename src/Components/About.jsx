import React, { useEffect } from "react";
import { aboutpic1, aboutpic2 } from "../Assests/assets.js";
import { 
  Leaf, 
  Lightbulb, 
  Sprout, 
  Droplets, 
  Target, 
  ChevronRight, 
  Activity,
  LineChart,
  Clock,
  Shield,
  Satellite,
  Cloud,
  Globe
} from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
      <Icon className="w-7 h-7 text-green-600" />
    </div>
    <h3 className="text-lg font-semibold mb-2 text-center">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </div>
);

const TechnologyCard = ({ icon: Icon, title, description, bgColor, iconColor }) => (
  <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
    <div className={`w-16 h-16 ${bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
      <Icon className={`w-8 h-8 ${iconColor}`} />
    </div>
    <h3 className="font-semibold mb-2 text-center">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </div>
);

const About = () => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-screen md:h-[600px] overflow-hidden">
        <img 
          src={aboutpic2} 
          alt="Farming Landscape" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Transforming Agriculture with Smart Technology
              </h1>
              <p className="text-xl text-gray-200 leading-relaxed">
                Empowering farmers worldwide with cutting-edge AI, IoT, and data-driven solutions 
                that optimize crop yield, reduce resource waste, and create sustainable farming practices.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="inline-block px-4 py-2 bg-green-100 rounded-full text-green-600 font-semibold mb-4">
              Our Vision
            </div>
            <h2 className="text-3xl font-bold mb-6">
              Cultivating a Sustainable Agricultural Future
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              We're not just developing technology; we're pioneering a revolution in agriculture. 
              By combining advanced AI, machine learning, and IoT sensors, we're creating 
              intelligent farming ecosystems that adapt, predict, and optimize in real-time.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Leaf className="text-green-500 w-6 h-6" />
                <span>Sustainable Practices</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="text-blue-500 w-6 h-6" />
                <span>Global Impact</span>
              </div>
            </div>
          </div>
          <div className="relative order-1 md:order-2">
            <img 
              src={aboutpic1} 
              alt="Smart Farming Technology" 
              className="rounded-lg shadow-xl w-full"
            />
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Innovative Solutions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Breakthrough technologies designed to revolutionize modern agriculture
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={Lightbulb}
              title="Smart Insights"
              description="Advanced data analytics for precision farming and strategic decision-making"
            />
            <FeatureCard 
              icon={Clock}
              title="Real-time Monitoring"
              description="Continuous farm surveillance with instant alerts and comprehensive tracking"
            />
            <FeatureCard 
              icon={LineChart}
              title="Predictive Analytics"
              description="Machine learning models that forecast crop health, yield, and potential challenges"
            />
            <FeatureCard 
              icon={Shield}
              title="Resource Optimization"
              description="Intelligent resource allocation to maximize efficiency and minimize waste"
            />
          </div>
        </div>
      </div>

      {/* Technology Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Our Breakthrough Technologies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TechnologyCard 
              icon={Sprout}
              title="IoT Sensors"
              description="Next-gen sensing technology for comprehensive farm monitoring"
              bgColor="bg-blue-100"
              iconColor="text-blue-600"
            />
            <TechnologyCard 
              icon={Target}
              title="AI Analytics"
              description="Intelligent algorithms transforming raw data into actionable insights"
              bgColor="bg-purple-100"
              iconColor="text-purple-600"
            />
            <TechnologyCard 
              icon={Droplets}
              title="Smart Irrigation"
              description="Precision water management for optimal crop health and conservation"
              bgColor="bg-orange-100"
              iconColor="text-orange-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;