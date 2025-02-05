import React from "react";
import {aboutpic1 ,aboutpic2} from "../Assests/assets.js";  // Example path to farm image

const About = () => {
  return (
    <div className="p-4 mt-14">
      <h1 className="text-2xl font-bold mb-4">About Us</h1>
      {/* About Us Introduction Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <img src={aboutpic2} alt="Farming Landscape" className="w-full h-auto rounded-md" />
        <p className="text-gray-600 mb-4 mt-4">
          We are dedicated to bringing smart technology solutions to modern farming.
          Our platform helps farmers optimize their operations and increase yield
          through data-driven decisions.
        </p>
      </div>

      {/* Section 1: Our Mission */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-600">
            Our mission is to provide farmers with innovative tools and insights
            to enhance agricultural productivity while ensuring sustainability. 
            Through technology, we aim to create smarter, more efficient farming methods.
          </p>
        </div>
        
      </div>

      {/* Section 2: Our Technology */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Our Technology</h2>
          <p className="text-gray-600">
            We leverage cutting-edge technology, including IoT sensors, data analytics,
            and machine learning, to offer real-time insights into soil health, climate conditions, 
            and crop growth. This allows farmers to make informed decisions for better yields.
          </p>
        </div>
      </div>

      {/* Section 3: Why Choose Us */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Why Choose Us?</h2>
        <img src={aboutpic1} alt="Smart Farming Technology" className="w-full h-auto rounded-md" />
        <p className="text-gray-600 mt-4">
          Our platform offers a comprehensive solution for all aspects of farm management, 
          from crop health monitoring to automated irrigation. We aim to enhance farm efficiency, 
          reduce costs, and support sustainable practices.
        </p>
        <ul className="list-disc pl-5 mt-4">
          <li>Data-driven insights for better decision-making</li>
          <li>Real-time monitoring for early problem detection</li>
          <li>Customizable solutions based on farm needs</li>
          <li>Optimized resource usage, including water and fertilizers</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
