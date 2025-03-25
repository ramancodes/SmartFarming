import React, { useContext, useEffect, useState } from "react";
import { ArrowLeft, Camera, X, Scan, AlertCircle, CheckCircle } from "lucide-react";
import FormatAndDisplayString from "./FormatString";
import { AppContext } from "../Context/AppContext";
import axios from "axios";

const DiseaseDetectionComponent = ({ onBack }) => {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  const { BACKEND_URL } = useContext(AppContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [detectionData, setDetectionData] = useState(null);
  const [file, setFile] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
      resetState();
    }
  };

  const resetState = () => {
    setScanResult(null);
    setError(null);
    setDetectionData(null);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setFile(null);
    resetState();
  };

  const handleScan = async () => {
    if (!file) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append("file", file);

      const url = BACKEND_URL + '/disease_detection'; 
      const responseData = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (responseData.status === 200) {
        setScanResult(responseData.data.result);
        setDetectionData(responseData.data);
      } else {
        setError("Detection failed: " + (responseData.data.message || "Unknown error"));
      }
    } catch (err) {
      setError("An error occurred while processing the image. Please try again.");
      console.error("Scan error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-6 px-4 mt-14">
      {/* Header */}

      <div className="max-w-md mx-auto  overflow-hidden">
        <div className="flex items-center mb-6">
          <button 
            onClick={onBack} 
            className="mr-4 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition"
          >
            <ArrowLeft size={24} className="text-blue-600" />
          </button>
          <h2 className="text-2xl font-bold text-gray-800">Plant Disease Detection</h2>
        </div>
        {/* Image Upload Section */}
        <div className="p-6 bg-white rounded-2xl shadow-2xl">
          {/* Image Preview */}
          <div className="mb-6 relative">
            {selectedImage ? (
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Selected plant"
                  className="w-full h-64 object-cover rounded-xl shadow-lg"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-3 right-3 bg-red-500/80 p-2 rounded-full text-white hover:bg-red-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <div className="h-48 flex items-center justify-center border-2 border-dashed border-green-300 rounded-xl bg-green-50">
                <p className="text-green-600 text-center">Upload a plant image for disease detection</p>
              </div>
            )}
          </div>

          {/* Error and Result Alerts */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center">
              <AlertCircle className="mr-3 text-red-500" size={24} />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {scanResult && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl flex items-center">
              <CheckCircle className="mr-3 text-green-500" size={24} />
              <p className="text-sm font-medium">
                Detected: {scanResult.replace(/_/g, ' ')}
              </p>
            </div>
          )}

          {/* File Input */}
          <input
            type="file"
            accept="image/*"
            id="image-upload"
            className="hidden"
            onChange={handleImageUpload}
            capture="environment"
          />

          {/* Action Buttons */}
          <div className="space-y-4">
            <label
              htmlFor="image-upload"
              className="w-full flex items-center justify-center gap-3 bg-green-500 text-white px-6 py-4 rounded-xl cursor-pointer hover:bg-green-600 active:bg-green-700 transition-colors text-lg font-medium shadow-md"
            >
              <Camera size={24} />
              Choose Image
            </label>

            <button
              onClick={handleScan}
              disabled={!selectedImage || loading}
              className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-lg font-medium transition-all shadow-md
                ${
                  selectedImage && !loading
                    ? "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <>
                  <Scan size={24} />
                  Scan Plant
                </>
              )}
            </button>
          </div>
        </div>

        {/* Disease Explanation Section */}
        {detectionData && detectionData.success && detectionData.explanation && (
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <h3 className="font-semibold text-lg mb-3 text-green-800">Disease Information</h3>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <FormatAndDisplayString inputString={detectionData.explanation} />
            </div>
          </div>
        )}

        {/* Recent Scans Section */}
        <div className="p-6 bg-gray-100 border-t border-gray-200">
          <h3 className="font-semibold text-lg mb-3 text-green-800">Recent Scan</h3>
          <div className="space-y-3">
            {scanResult ? (
              <div className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-green-800">{scanResult.replace(/_/g, ' ')}</span>
                  <span className="text-yellow-600 text-sm">Just now</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Detected plant issue</p>
              </div>
            ) : (
              <div className="p-4 bg-white rounded-xl text-center text-gray-500">
                No scan data available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetectionComponent;