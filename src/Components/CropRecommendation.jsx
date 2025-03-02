import React, { useContext, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import FormatAndDisplayString from "./FormatString";

const RecommendationComponent = ({ onBack }) => {
  const { BACKEND_URL } = useContext(AppContext);
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: ""
  });
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(false);
  const [message, setMessage] = useState(false);
  const [explanation, setExplanation] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setShowRecommendation(false); // Hide prediction when inputs change
  };

  const handeRecommendation = async () => {
    try {
      const url = BACKEND_URL+'/crop_recommendation';
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // console.log(response);
      
      if(response.status === 200){
        if(response.data.success === true){
          setResult(response.data.result.charAt(0).toUpperCase() + response.data.result.slice(1))
          setExplanation(response.data.explanation)
        } else{
          setMessage(response.data.message)
        }
      } else {        
        setResult(false)
      }
    } catch (error) {
      console.log(error);
      setResult(false)
    }
  }

  const handlePredict = () => {
    setIsLoading(true);
    // API call delay
    setTimeout(async () => {
      setResult(false)
      setExplanation(false)
      setMessage(false)
      await handeRecommendation();
      setShowRecommendation(true);
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
        <h2 className="text-xl font-bold">Crop Recommendation</h2>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-2">
            <label className="font-medium">Ratio of Nitrogen Content in Soil</label>
            <input
              type="number"
              name="nitrogen"
              value={formData.nitrogen}
              onChange={handleInputChange}
              className="border rounded-md p-2"
              placeholder="Enter Soil Nitrogen Quantity"
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-medium">Ratio of Phosphorous content in Soil</label>
            <input
              type="number"
              name="phosphorus"
              value={formData.phosphorus}
              onChange={handleInputChange}
              className="border rounded-md p-2"
              placeholder="Enter soil Phosphorus Quantity"
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-medium">Ratio of Potassium content in Soil</label>
            <input
              type="number"
              name="potassium"
              value={formData.potassium}
              onChange={handleInputChange}
              className="border rounded-md p-2"
              placeholder="Enter soil Potassium Quantity"
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-medium">Soil Temperature (℃)</label>
            <input
              type="number"
              name="temperature"
              step={0.00000005}
              value={formData.temperature}
              max={50}
              min={5}
              onChange={handleInputChange}
              className="border rounded-md p-2"
              placeholder="Enter Temperature in celcius between 5℃ to 50℃"
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-medium">Soil Humidity (%)</label>
            <input
              type="number"
              step={0.00000005}
              name="humidity"
              value={formData.humidity}
              onChange={handleInputChange}
              max={100}
              min={0}
              className="border rounded-md p-2"
              placeholder="Enter humidity percentage 0% to 100%"
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-medium">ph Value of the Soil</label>
            <input
              type="number"
              step={0.00000005}
              name="ph"
              value={formData.ph}
              onChange={handleInputChange}
              max={14}
              min={0}
              className="border rounded-md p-2"
              placeholder="Enter soil ph value between 0 to 14"
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-medium">Rainfall (mm)</label>
            <input
              type="number"
              step={0.00000005}
              name="rainfall"
              value={formData.rainfall}
              onChange={handleInputChange}
              max={300}
              min={0}
              className="border rounded-md p-2"
              placeholder="Enter rainfall measurement between 0mm to 300mm"
              required
            />
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

        {showRecommendation && result && (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Recommended Crop</h3>
                <p className="text-2xl text-green-600">{result}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Soil Data Summary</h3>
              <ul className="space-y-2">
                <li className="flex flex-col md:flex-row justify-between p-2 bg-gray-50 rounded">
                  <span className="font-medium">Soil Temperature</span>
                  <span className="text-orange-600">{formData.temperature} ℃</span>
                </li>
                <li className="flex flex-col md:flex-row justify-between p-2 bg-gray-50 rounded">
                  <span className="font-medium">Soil Humidity</span>
                  <span className="text-blue-600">{formData.humidity} %</span>
                </li>
                <li className="flex flex-col md:flex-row justify-between p-2 bg-gray-50 rounded">
                  <span className="font-medium">Soil pH Value</span>
                  <span className="text-green-600">{formData.ph}</span>
                </li>
                <li className="flex flex-col md:flex-row justify-between p-2 bg-gray-50 rounded">
                  <span className="font-medium">Nitrogen : Phosphorous : Potassium Ratio</span>
                  <span className="text-green-600">{formData.nitrogen} : {formData.phosphorus} : {formData.potassium}</span>
                </li>
                <li className="flex flex-col md:flex-row justify-between p-2 bg-gray-50 rounded">
                  <span className="font-medium">Rainfall</span>
                  <span className="text-blue-600">{formData.rainfall} mm</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Explanation</h3>
              <div className="p-4 bg-blue-50 rounded-lg">
                <ul className="space-y-2">
                  <li className={explanation ? "text-blue-800" : "text-red-600"}>{explanation?`${explanation}`:'No explanation available at this moment'}</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {showRecommendation && !result && (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-red-600">Response</h3>
                <p className="text-xl">{message? message:"Cannot determine recommended crop at this time."}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Soil Data Summary</h3>
              <ul className="space-y-2">
                <li className="flex flex-col md:flex-row justify-between p-2 bg-gray-50 rounded">
                  <span className="font-medium">Soil Temperature</span>
                  <span className="text-orange-600">{formData.temperature} ℃</span>
                </li>
                <li className="flex flex-col md:flex-row justify-between p-2 bg-gray-50 rounded">
                  <span className="font-medium">Soil Humidity</span>
                  <span className="text-blue-600">{formData.humidity} %</span>
                </li>
                <li className="flex flex-col md:flex-row justify-between p-2 bg-gray-50 rounded">
                  <span className="font-medium">Soil pH Value</span>
                  <span className="text-green-600">{formData.ph}</span>
                </li>
                <li className="flex flex-col md:flex-row justify-between p-2 bg-gray-50 rounded">
                  <span className="font-medium">Soil Nitrogen Quantity</span>
                  <span className="text-green-600">{formData.nitrogen}</span>
                </li>
                <li className="flex flex-col md:flex-row justify-between p-2 bg-gray-50 rounded">
                  <span className="font-medium">Soil Phosphorus Quantity</span>
                  <span className="text-green-600">{formData.phosphorus}</span>
                </li>
                <li className="flex flex-col md:flex-row justify-between p-2 bg-gray-50 rounded">
                  <span className="font-medium">Soil Potassium Quantity</span>
                  <span className="text-green-600">{formData.potassium}</span>
                </li>
                <li className="flex flex-col md:flex-row justify-between p-2 bg-gray-50 rounded">
                  <span className="font-medium">Rainfall</span>
                  <span className="text-blue-600">{formData.rainfall} mm</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationComponent;