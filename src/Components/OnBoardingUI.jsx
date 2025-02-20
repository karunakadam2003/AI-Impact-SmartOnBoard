import React, { useState } from "react";
import axios from "axios"; // Make sure axios is installed

export default function OnboardingForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    address: "",
    idNumber: ""
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    setShowSuccess(true);
    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const fillFormWithExtractedData = async (extractedData) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/fill-onboarding-form",
        extractedData
      );
      console.log("Form filling initiated:", response.data);
    } catch (error) {
      console.error("Error starting form fill:", error);
    }
  };

  // You can call fillFormWithExtractedData when you receive data from document processing
  // For example, add a button for testing:
  const testData = {
    fullName: "John Doe",
    dateOfBirth: "1990-01-01",
    address: "123 Main St",
    idNumber: "ID123456"
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <h2 className="text-xl font-bold mb-4">Onboarding Form</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="text"
            id="idNumber"
            name="idNumber"
            placeholder="ID Number"
            value={formData.idNumber}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        
        {showSuccess && (
          <div className="success-message mt-4 p-2 bg-green-100 text-green-700 rounded">
            Form Submitted Successfully!
          </div>
        )}

        {/* Add a test button */}
        <button
          onClick={() => fillFormWithExtractedData(testData)}
          className="mt-4 w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Test Auto-Fill
        </button>
      </div>
    </div>
  );
}
