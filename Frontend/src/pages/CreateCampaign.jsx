import React, { useState } from "react";

const CreateCampaign = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    goal: " ",
    duration: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
    setErrors((prev)=>({...prev, [name]: ""}))
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.address) newErrors.address = "Beneficiary account is required";
    if (!formData.goal || formData.goal <= 0) newErrors.goal = "Valid goal amount is required";
    if (!formData.duration || formData.duration <= 0) newErrors.duration = "Valid duration is required";
    return newErrors;
  };


     const handleSubmit = (e)=>{
      e.preventDefault();
      const validationErrors = validateForm();
      if(Object.keys(validationErrors).length >0){
          setErrors(validationErrors);
          return;
      }

    //   actual api call logic
     console.log("Form submitted:", {
      ...formData,
      image: formData.image ? formData.image.name : null,
    });

    // reset formData
     setFormData({
      title: "",
      description: "",
      address: "",
      goal: "",
      duration: "",
      image: null,
    });
     }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4 ">
      <h1 className="p-8 m-5 text-center text-gray-700 "><span className="text-4xl font-bold block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 pb-1 ">Create New Campaign</span> <br />You’re not just creating a campaign — you’re starting a movement.</h1>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter Purpose of Raising Fund"
              className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

         

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Beneficiary Account
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter Receiver Account"
              className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>

          <div>
            <label htmlFor="goal" className="block text-sm font-medium text-gray-700">
              Goal ($)
            </label>
            <input
              type="number"
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              placeholder="Enter Amount Needed"
              className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 ${
                errors.goal ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.goal && <p className="text-red-500 text-xs mt-1">{errors.goal}</p>}
          </div>

          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
              Duration (Days)
            </label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Enter Days to Run Campaign"
              className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 ${
                errors.duration ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration}</p>}
          </div>

           <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter Detailed Information..."
              className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              rows="4"
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Create Campaign
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign;
