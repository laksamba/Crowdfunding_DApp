import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { FundingFactoryAbi, CrowdFundingAbi } from "../ContractAbi/ContractABI";
import MetricBar from "./MetricBar";
import Donate from "./Donate"; 
import image from "./../assets/help.png";

const FACTORY_ADDRESS = "0xB0Ac99f1181a069E1293d76468aa3211db1a8B35";

const Donationcard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [userAddress, setUserAddress] = useState(null);

  const fetchCampaigns = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      setLoading(true);

      const providerInstance = new ethers.BrowserProvider(window.ethereum);
      const signerInstance = await providerInstance.getSigner();
      const userAddr = await signerInstance.getAddress();

      setProvider(providerInstance);
      setSigner(signerInstance);
      setUserAddress(userAddr);

      const factory = new ethers.Contract(
        FACTORY_ADDRESS,
        FundingFactoryAbi,
        signerInstance
      );

      const campaignAddresses = await factory.getCampaigns();
      const uniqueAddresses = [
        ...new Set(campaignAddresses.map((addr) => addr.toLowerCase())),
      ];

      const campaignsData = await Promise.all(
        uniqueAddresses.map(async (addr) => {
          const campaign = new ethers.Contract(
            addr,
            CrowdFundingAbi,
            signerInstance
          );
          const [
            title,
            description,
            beneficiary,
            goal,
            totalRaised,
            deadline,
            ended,
          ] = await Promise.all([
            campaign.title(),
            campaign.description(),
            campaign.beneficiary(),
            campaign.goal(),
            campaign.totalRaised(),
            campaign.deadline(),
            campaign.ended(),
          ]);

          const currentTime = Math.floor(Date.now() / 1000);
          const remainingSeconds = Number(deadline) - currentTime;
          const remainingDays =
            remainingSeconds > 0
              ? Math.ceil(remainingSeconds / (60 * 60 * 24))
              : 0;

          return {
            address: addr,
            title,
            description,
            beneficiary,
            goal: Number(ethers.formatEther(goal)),
            raisedAmount: Number(ethers.formatEther(totalRaised)),
            deadline: new Date(Number(deadline) * 1000).toLocaleDateString(),
            remainingDays,
            ended,
          };
        })
      );

      setCampaigns(campaignsData);
    } catch (err) {
      console.error("❌ Error fetching campaigns:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg text-gray-600">
        Fetching campaigns from blockchain...
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-600">No campaigns found.</div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl md:text-6xl font-caveat font-bold text-center text-green-700 mb-8">
        🌍 Active Fundraising Campaigns
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((c) => (
          <div
            key={c.address}
            className="p-4 shadow-lg rounded-xl bg-white hover:shadow-2xl transition-all"
          >
            <img
              src={image}
              alt={c.title}
              className="h-48 w-full object-cover rounded-lg"
            />

            <h2
              className="mt-3 text-lg sm:text-xl md:text-xl lg:text-xl font-extrabold  
               truncate    uppercase"
            >
              {c.title}
            </h2>

            <MetricBar goal={c.goal} raised={c.raisedAmount} />

            <div className="text-gray-700 mt-3">
              <h1 className="text-lg font-bold ">Description</h1>
              <p className="text-sm">
                {c.description.length > 100
                  ? c.description.slice(0, 100) + "..."
                  : c.description}
              </p>
            </div>

            <div className="mt-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
                🎯 Campaign Details
              </h3>

              <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700 dark:text-gray-300">
                <div>
                  <span className="font-medium text-gray-500">Goal:</span>
                  <p className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    {c.goal} ETH
                  </p>
                </div>

                <div>
                  <span className="font-medium text-gray-500">Raised:</span>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold">
                    {c.raisedAmount} ETH
                  </p>
                </div>

                <div>
                  <span className="font-medium text-gray-500">Deadline:</span>
                  <p className="text-gray-700 dark:text-gray-300">
                    {c.deadline}
                  </p>
                </div>

                <div>
                  <span className="font-medium text-gray-500">Time Left:</span>
                  <p className="text-gray-700 dark:text-gray-300">
                    {c.remainingDays} days
                  </p>
                </div>

                <div>
                  <span className="font-medium text-gray-500">Status:</span>
                  <p
                    className={`font-semibold ${
                      c.ended
                        ? "text-red-500 dark:text-red-400"
                        : "text-green-600 dark:text-green-400"
                    }`}
                  >
                    {c.ended ? "Ended ❌" : "Active ✅"}
                  </p>
                </div>

                {/* Beneficiary spans full width */}
                <div className="col-span-2 mt-2">
                  <span className="font-medium text-gray-500">
                    Beneficiary:
                  </span>
                  <p className="text-gray-800 dark:text-gray-100 truncate">
                    {c.beneficiary}
                  </p>
                </div>
              </div>
            </div>

            <Donate
              campaignAddress={c.address}
              isEnded={c.ended}
              isBeneficiary={
                userAddress?.toLowerCase() === c.beneficiary.toLowerCase()
              }
              provider={provider}
              signer={signer}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Donationcard;
