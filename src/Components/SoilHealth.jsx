import React, { useState } from "react";
import { ArrowLeft, Camera, X, Scan } from "lucide-react";

const SoilHealth = ({ onBack }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [scanResult, setScanResult] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
      setScanResult(null);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setFileName(null);
    setScanResult(null);
  };

  const handleScan = () => {
    if (fileName) {
      setScanResult(fileName);
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

            {scanResult && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium">File: {scanResult}</p>
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
                disabled={!selectedImage}
                className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-lg font-medium transition-colors
                  ${
                    selectedImage
                      ? "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
              >
                <Scan size={24} />
                Scan
              </button>

              <p className="text-sm text-gray-500 text-center">
                Tap to scan your plants
              </p>
            </div>
          </div>
        </div>

        {/* Recent Scans Section */}
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-semibold text-lg mb-3">Recent Scans</h3>
          <div className="space-y-3">
          <div className="p-4 bg-gray-50 rounded-xl active:bg-gray-100 transition-colors">
                <div className="flex justify-between items-center">
                  <span className="font-medium">No Data Avilable</span>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoilHealth;
