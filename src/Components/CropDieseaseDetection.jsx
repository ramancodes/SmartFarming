import React, { useContext, useState } from "react";
import { ArrowLeft, Camera, X, Scan } from "lucide-react";
import FormatAndDisplayString from "./FormatString";
import { AppContext } from "../Context/AppContext";
import axios from "axios";

const DiseaseDetectionComponent = ({ onBack }) => {
  const { BACKEND_URL } = useContext(AppContext);
  const [selectedImage, setSelectedImage] = useState(null);
  // const [fileName, setFileName] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [detectionData, setDetectionData] = useState(null);
  const [file, setFile] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      // setFileName(file.name);
      setFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
      setScanResult(null);
      setError(null);
      setDetectionData(null);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    // setFileName(null);
    setScanResult(null);
    setError(null);
    setDetectionData(null);
    setFile(null);
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
      
      if (responseData.status==200) {
        setScanResult(responseData.data.result);
        setDetectionData(responseData.data);
      } else {
        setError("Detection failed.", responseData.data.message);
      }
    } catch (err) {
      setError("An error occurred while processing the image. Please try again.");
      console.error("Scan error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-14 min-h-screen bg-gray-50">
      <div className="p-4 max-w-lg mx-auto">
        <div className="flex items-center mb-4">
          <button onClick={onBack} className="mr-2">
            <ArrowLeft size={24} className="text-green-600" />
          </button>
          <h2 className="text-xl font-bold">Disease Detection</h2>
        </div>
        
        {/* Image Upload Section */}
        <div className="bg-white rounded-xl shadow p-4 mb-4">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-4">
            {selectedImage ? (
              <div className="relative mb-4">
                <img
                  src={selectedImage}
                  alt="Selected plant"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <div className="h-48 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg mb-4">
                <p className="text-gray-500 text-center">No image selected</p>
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg">
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            {scanResult && (
              <div className="mb-4 p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-700">
                  Detected: {scanResult.replace(/_/g, ' ')}
                </p>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              id="image-upload"
              className="hidden"
              onChange={handleImageUpload}
              capture="environment"
            />

            <div className="flex flex-col gap-3">
              <label
                htmlFor="image-upload"
                className="w-full flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-4 rounded-xl cursor-pointer hover:bg-green-600 active:bg-green-700 transition-colors text-lg font-medium"
              >
                <Camera size={24} />
                Upload Image
              </label>

              <button
                onClick={handleScan}
                disabled={!selectedImage || loading}
                className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-lg font-medium transition-colors
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
                    Scan
                  </>
                )}
              </button>

              <p className="text-sm text-gray-500 text-center">
                Tap to scan your plants for diseases
              </p>
            </div>
          </div>
        </div>

        {/* Disease Explanation Section */}
        {detectionData && detectionData.success && detectionData.explanation && (
          <div className="bg-white rounded-xl shadow p-4 mb-4 overflow-hidden">
            <h3 className="font-semibold text-lg mb-3">Disease Information</h3>
            <FormatAndDisplayString inputString={detectionData.explanation} />
          </div>
        )}

        {/* Recent Scans Section */}
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-semibold text-lg mb-3">Recent Scans</h3>
          <div className="space-y-3">
            {scanResult ? (
              <div className="p-4 bg-gray-50 rounded-xl active:bg-gray-100 transition-colors">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{scanResult.replace(/_/g, ' ')}</span>
                  <span className="text-yellow-600">Just now</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Detected issue</p>
              </div>
            ) : (
              <div className="p-4 bg-gray-50 rounded-xl active:bg-gray-100 transition-colors">
                <div className="flex justify-between items-center">
                  <span className="font-medium">No Data Available</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetectionComponent;