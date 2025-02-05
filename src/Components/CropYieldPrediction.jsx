import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";

const PredictionComponent = ({ onBack }) => {
  const [formData, setFormData] = useState({
    soilInfo: "",
    soilHumidity: "",
    weather: "",
    waterLevel: ""
  });
  const [showPrediction, setShowPrediction] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setShowPrediction(false); // Hide prediction when inputs change
  };

  const handlePredict = () => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setShowPrediction(true);
      setIsLoading(false);
    }, 1000);
  };

  const allFieldsFilled = Object.values(formData).every(value => value !== "");

  return (
    <div className="p-4 mt-14">
      <div className="flex items-center mb-4">
        <button onClick={onBack} className="mr-2">
          <ArrowLeft size={24} className="text-green-600" />
        </button>
        <h2 className="text-xl font-bold">Crop Yield Prediction</h2>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-2">
            <label className="font-medium">Soil Information</label>
            <input
              type="text"
              name="soilInfo"
              value={formData.soilInfo}
              onChange={handleInputChange}
              className="border rounded-md p-2"
              placeholder="Enter soil information"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-medium">Soil Humidity (%)</label>
            <input
              type="number"
              name="soilHumidity"
              value={formData.soilHumidity}
              onChange={handleInputChange}
              className="border rounded-md p-2"
              placeholder="Enter humidity percentage"
              min="0"
              max="100"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-2">
            <label className="font-medium">Weather Condition</label>
            <select
              name="weather"
              value={formData.weather}
              onChange={handleInputChange}
              className="border rounded-md p-2"
            >
              <option value="">Select weather condition</option>
              <option value="sunny">Sunny</option>
              <option value="cloudy">Cloudy</option>
              <option value="rainy">Rainy</option>
              <option value="stormy">Stormy</option>
            </select>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-medium">Water Level</label>
            <select
              name="waterLevel"
              value={formData.waterLevel}
              onChange={handleInputChange}
              className="border rounded-md p-2"
            >
              <option value="">Select water level</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handlePredict}
            disabled={!allFieldsFilled || isLoading}
            className={`px-6 py-2 rounded-md text-white font-medium transition-colors
              ${allFieldsFilled && !isLoading 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-gray-400 cursor-not-allowed'}`}
          >
            {isLoading ? 'Predicting...' : 'Predict'}
          </button>
        </div>

        {showPrediction && (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Current Yield</h3>
                <p className="text-2xl text-green-600">Not Generated</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Predicted Yield</h3>
                <p className="text-2xl text-blue-600">Not Generated</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Entered Data Summary</h3>
              <ul className="space-y-2">
                <li className="flex flex-col md:flex-row justify-between p-2 bg-gray-50 rounded">
                  <span className="font-medium">Soil Health</span>
                  <span className="text-green-600">{formData.soilInfo}</span>
                </li>
                <li className="flex flex-col md:flex-row justify-between p-2 bg-gray-50 rounded">
                  <span className="font-medium">Soil Humidity</span>
                  <span className="text-blue-600">{formData.soilHumidity}%</span>
                </li>
                <li className="flex flex-col md:flex-row justify-between p-2 bg-gray-50 rounded">
                  <span className="font-medium">Weather</span>
                  <span className="text-yellow-600">{formData.weather}</span>
                </li>
                <li className="flex flex-col md:flex-row justify-between p-2 bg-gray-50 rounded">
                  <span className="font-medium">Water Level</span>
                  <span className="text-green-600">{formData.waterLevel}</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Recommendations</h3>
              <div className="p-4 bg-blue-50 rounded-lg">
                <ul className="space-y-2">
                  <li className="text-blue-800">Consider increasing irrigation frequency based on current soil humidity.</li>
                  <li className="text-blue-800">Monitor weather conditions closely for optimal crop management.</li>
                  <li className="text-blue-800">Maintain current soil health practices as they are showing positive results.</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionComponent;