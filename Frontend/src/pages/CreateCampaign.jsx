import React, { useState } from "react";
import { ethers } from "ethers";
import { FundingFactoryAbi } from "../ContractAbi/ContractABI"; // ✅ Make sure this exports .abi
import { toast } from "react-toastify";

const FACTORY_ADDRESS = "0xB0Ac99f1181a069E1293d76468aa3211db1a8B35"; // ✅ Replace this

const CreateCampaign = () => {
  const [errors, setErrors] = useState({});
  const [newCampaign, setNewCampaign] = useState({
    title: "",
    description: "",
    address: "",
    goal: "",
    duration: "",
    image: null,
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setNewCampaign((prev) => ({ ...prev, [name]: files ? files[0] : value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};
    if (!newCampaign.title) newErrors.title = "Title is required";
    if (!newCampaign.description) newErrors.description = "Description is required";
    if (!newCampaign.address) newErrors.address = "Beneficiary address is required";
    if (!newCampaign.goal || newCampaign.goal <= 0) newErrors.goal = "Valid goal amount is required";
    if (!newCampaign.duration || newCampaign.duration <= 0)
      newErrors.duration = "Valid duration is required";
    return newErrors;
  };

 
  const getContract = async () => {
    if (!window.ethereum) {
      toast.error("MetaMask not found!");
      return null;
    }

    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(FACTORY_ADDRESS, FundingFactoryAbi, signer);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const { title, description, address, goal, duration } = newCampaign;

      if (!ethers.isAddress(address)) {
        toast.error("Invalid beneficiary address");
        return;
      }

      const factoryContract = await getContract();
      if (!factoryContract) return;

      const tx = await factoryContract.createCampaign(
        title,
        description,
        address,
        ethers.parseEther(goal.toString()),
        duration
      );

      toast.info("Creating campaign... please wait ⏳");
      await tx.wait();
      toast.success("✅ Campaign created successfully!");

      setNewCampaign({
        title: "",
        description: "",
        address: "",
        goal: "",
        duration: "",
        image: null,
      });
      document.querySelector('input[name="image"]').value = "";
    } catch (error) {
      console.error(error);
      toast.error("Error creating campaign: " + (error.message || "Transaction failed"));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      <h1 className="p-8 m-5 text-center text-gray-700">
        <span className="text-5xl font-caveat font-bold block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 pb-1">
          Create New Campaign
        </span>
        <br />
        You’re not just creating a campaign — you’re starting a movement.
      </h1>

      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col gap-4">
          
          {["title", "address", "goal", "duration", "description"].map((field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block text-sm font-medium text-gray-700 capitalize"
              >
                {field === "address"
                  ? "Beneficiary Account"
                  : field === "goal"
                  ? "Goal (ETH)"
                  : field === "duration"
                  ? "Duration (Days)"
                  : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>

              {field === "description" ? (
                <textarea
                  name={field}
                  value={newCampaign[field]}
                  onChange={handleChange}
                  placeholder="Enter detailed information..."
                  className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 ${
                    errors[field] ? "border-red-500" : "border-gray-300"
                  }`}
                  rows="4"
                />
              ) : (
                <input
                  type={field === "goal" || field === "duration" ? "number" : "text"}
                  name={field}
                  value={newCampaign[field]}
                  onChange={handleChange}
                  placeholder={
                    field === "goal"
                      ? "Enter amount in ETH"
                      : field === "duration"
                      ? "Enter campaign duration in days"
                      : `Enter ${field}`
                  }
                  className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 ${
                    errors[field] ? "border-red-500" : "border-gray-300"
                  }`}
                />
              )}
              {errors[field] && (
                <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
              )}
            </div>
          ))}

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
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
