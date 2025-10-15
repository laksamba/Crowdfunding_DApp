import React, { useState } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { CrowdFundingAbi } from "../ContractAbi/contractAbi.js";

const EndCampaign = ({ campaignAddress, signer }) => {
  const endCampaign = async () => {
    try {
      const contract = new ethers.Contract(
        campaignAddress,
        CrowdFundingAbi,
        signer
      );
      const tx = await contract.endCampaign();
      await tx.wait();
      toast.success(`sucessfully ended campaign`);
    } catch (error) {
      toast.error("endCampaign failed: " + error.message);
    }
  };

  return (
    <div className="mt-4 ">
      <button
        className="bg-red-600 text-white px-4 py-2 rounded w-full "
        onClick={endCampaign}
      >
        EndCampaign
      </button>
    </div>
  );
};

export default EndCampaign;
