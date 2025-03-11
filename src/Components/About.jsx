import React from "react";
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
  Shield
} from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-green-600" />
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[500px] overflow-hidden">
        <img 
          src={aboutpic2} 
          alt="Farming Landscape" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center">
            <div className="max-w-2xl mt-20">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Revolutionizing Agriculture Through Technology
              </h1>
              <p className="text-xl text-gray-200">
                We're dedicated to bringing smart technology solutions to modern farming,
                helping farmers optimize their operations through data-driven decisions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-4 py-2 bg-green-100 rounded-full text-green-600 font-semibold mb-4">
              Our Mission
            </div>
            <h2 className="text-3xl font-bold mb-6">
              Creating a Sustainable Future for Agriculture
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Our mission is to empower farmers with innovative tools and insights
              that enhance agricultural productivity while ensuring sustainability.
              Through technology, we aim to create smarter, more efficient farming methods.
            </p>
            {/* <div className="flex items-center text-green-600 font-semibold cursor-pointer group">
              Learn more about our approach
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </div> */}
          </div>
          <div className="relative">
            <img 
              src={aboutpic1} 
              alt="Smart Farming Technology" 
              className="rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Activity className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Actively Growing</p>
                  {/* <p className="text-xl font-bold">10,000+</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform offers cutting-edge solutions for modern farming challenges
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={Lightbulb}
              title="Smart Insights"
              description="Data-driven analytics for better decision-making and improved crop yields"
            />
            <FeatureCard 
              icon={Clock}
              title="Real-time Monitoring"
              description="24/7 monitoring of your farm's vital parameters for early problem detection"
            />
            <FeatureCard 
              icon={LineChart}
              title="Predictive Analytics"
              description="Advanced forecasting to help you prepare for changing conditions"
            />
            <FeatureCard 
              icon={Shield}
              title="Resource Optimization"
              description="Efficient use of water, fertilizers, and other resources to maximize ROI"
            />
          </div>
        </div>
      </div>

      {/* Technology Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Our Technology</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sprout className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">IoT Sensors</h3>
              <p className="text-gray-600">Advanced sensing technology for real-time monitoring</p>
            </div>
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">AI Analytics</h3>
              <p className="text-gray-600">Machine learning algorithms for predictive insights</p>
            </div>
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplets className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Smart Irrigation</h3>
              <p className="text-gray-600">Smart Solutions for water management Systems</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;