import React, { useContext, useState, useCallback, useEffect } from "react";
import { 
  ArrowLeft, 
  Leaf, 
  Thermometer, 
  Droplet, 
  CloudRain, 
  FlaskConical, 
  Sprout 
} from "lucide-react";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const RecommendationComponent = ({ onBack }) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const [isIOTLoading, setIsIOTLoading] = useState(false);
  const [isPredictLoading, setIsPredictLoading] = useState(false);

  // Result and visibility states
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState(null);
  const [explanation, setExplanation] = useState(null);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setShowRecommendation(false);
  }, []);

  // Fetch IOT Data
  // const handleFetchIOTData = async () => {
  //   setIsIOTLoading(true);
  //   try {
  //     const url = `${BACKEND_URL}/get-senor-data`;
  //     const response = await axios.get(url);
      
  //     if (response.status === 200 && response.data.success) {
  //       setFormData(prevState => ({
  //         ...prevState,
  //         temperature: response.data.data.temperature,
  //         humidity: response.data.data.humidity
  //       }));
  //       toast.success("IOT Data Fetched Successfully!");
  //     } else {
  //       toast.error("Data Cannot Be Fetched At This Moment");
  //     }
  //   } catch (error) {
  //     toast.error("Network Error. Please try again.");
  //   } finally {
  //     setIsIOTLoading(false);
  //   }
  // };

  // Prediction Handler
  const handlePredict = async () => {
    setIsPredictLoading(true);
    setResult(null);
    setExplanation(null);
    setMessage(null);

    try {
      const url = `${BACKEND_URL}/crop_recommendation`;
      const response = await axios.post(url, formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.status === 200 && response.data.success) {
        setResult(response.data.result.charAt(0).toUpperCase() + response.data.result.slice(1));
        setExplanation(response.data.explanation);
      } else {
        setMessage(response.data.message || "Prediction failed");
      }
      
      setShowRecommendation(true);
    } catch (error) {
      toast.error("Prediction Error. Please try again.");
      setMessage("Unable to process prediction");
    } finally {
      setIsPredictLoading(false);
    }
  };

  // Check if all fields are filled
  const allFieldsFilled = Object.values(formData).every(value => value !== "");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4 mt-14">
      <div className="container mx-auto max-w-lg">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button 
            onClick={onBack} 
            className="mr-4 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition"
          >
            <ArrowLeft size={24} className="text-blue-600" />
          </button>
          <h2 className="text-2xl font-bold text-gray-800">Crop Recommendation</h2>
        </div>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-6 space-y-6">
          {/* IOT Data Fetch Section */}
          <div className="bg-green-50 rounded-xl p-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Sprout className="text-green-600" />
              <span className="font-medium text-green-900">
                Get Current Soil Parameters
              </span>
            </div>
            {/* <button
              onClick={handleFetchIOTData}
              disabled={isIOTLoading}
              className={`
                px-4 py-2 rounded-lg text-white font-medium transition-all
                ${!isIOTLoading 
                  ? 'bg-green-600 hover:bg-green-700 active:scale-95' 
                  : 'bg-green-400 cursor-not-allowed'}
              `}
            >
              {isIOTLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Fetching...
                </div>
              ) : (
                "Fetch Data"
              )}
            </button> */}
          </div>

          {/* Input Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "temperature", label: "Soil Temperature (℃)", icon: Thermometer, min: 5, max: 50 },
              { name: "humidity", label: "Soil Humidity (%)", icon: Droplet, min: 0, max: 100 },
              { name: "nitrogen", label: "Nitrogen Content", icon: FlaskConical },
              { name: "phosphorus", label: "Phosphorus Content", icon: FlaskConical },
              { name: "potassium", label: "Potassium Content", icon: FlaskConical },
              { name: "ph", label: "Soil pH Value", icon: Leaf, min: 0, max: 14 },
              { name: "rainfall", label: "Rainfall (mm)", icon: CloudRain, min: 0, max: 300 }
            ].map(({ name, label, icon: Icon, min, max }) => (
              <div key={name} className="flex flex-col space-y-2">
                <label className="flex items-center space-x-2 font-medium text-green-900">
                  <Icon className="text-green-600" size={18} />
                  <span>{label}</span>
                </label>
                <input
                  type="number"
                  name={name}
                  value={formData[name]}
                  onChange={handleInputChange}
                  min={min}
                  max={max}
                  step={0.00000005}
                  className="border-2 border-green-200 rounded-lg p-2 focus:ring-2 focus:ring-green-500 transition-all"
                  placeholder={`Enter ${label}`}
                  required
                />
              </div>
            ))}
          </div>

          {/* Predict Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={handlePredict}
              disabled={!allFieldsFilled || isPredictLoading}
              className={`
                px-8 py-3 rounded-lg text-white font-bold transition-all
                ${allFieldsFilled && !isPredictLoading 
                  ? 'bg-green-600 hover:bg-green-700 active:scale-95' 
                  : 'bg-gray-400 cursor-not-allowed'}
              `}
            >
              {isPredictLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Predicting...
                </div>
              ) : (
                "Predict Crop"
              )}
            </button>
          </div>

          {/* Result Section */}
          {showRecommendation && (
            <div className="bg-green-50 rounded-xl p-6 space-y-4">
              {result ? (
                <>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-green-800 mb-2">Recommended Crop</h3>
                    <p className="text-4xl text-green-600 font-extrabold">{result}</p>
                  </div>

                  <div className="bg-white rounded-xl p-4 shadow-md">
                    <h4 className="text-lg font-semibold text-green-900 mb-3">Soil Analysis</h4>
                    {Object.entries(formData).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b last:border-b-0 border-green-200">
                        <span className="text-green-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="font-bold text-green-900">{value}</span>
                      </div>
                    ))}
                  </div>

                  {explanation && (
                    <div className="bg-blue-50 rounded-xl p-4">
                      <h4 className="text-lg font-semibold text-blue-900 mb-2">Explanation</h4>
                      <p className="text-blue-800">{explanation}</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center">
                  <h3 className="text-xl font-bold text-red-600 mb-2">Prediction Failed</h3>
                  <p className="text-red-800">{message || "Unable to determine crop recommendation"}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendationComponent;