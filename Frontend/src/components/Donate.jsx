import React, { useState } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';

const Donate = ({ campaignAddress, isEnded, isBeneficiary, signer }) => {
  const [donationAmount, setDonationAmount] = useState('');
  const [showDonationField, setShowDonationField] = useState(false);

  const crowdFundingABI = [
    'function donate() payable',
    'function withdraw()',
    'function getProgress() view returns (uint256 raised, uint256 goalAmount, bool goalMet)',
  ];

  const donate = async () => {
    try {
      const contract = new ethers.Contract(campaignAddress, crowdFundingABI, signer);
      const tx = await contract.donate({ value: ethers.parseEther(donationAmount) });
      await tx.wait();
      toast.success(`Donated ${donationAmount} ETH successfully!`);
      setDonationAmount('');
      setShowDonationField(false); 
    } catch (error) {
      toast.error('Donation failed: ' + error.message);
    }
  };

  const withdraw = async () => {
    try {
      const contract = new ethers.Contract(campaignAddress, crowdFundingABI, signer);
      const tx = await contract.withdraw();
      await tx.wait();
      toast.success('Funds withdrawn successfully!');
    } catch (error) {
      toast.error('Withdrawal failed: ' + error.message);
    }
  };

  return (
    <div className="mt-4 ">
      {!isEnded && (
        <div>
          {!showDonationField ? (
            <button
              className="bg-green-600 text-white px-4 py-2 rounded w-full "
              onClick={() => setShowDonationField(true)}
            >
              💰 Donate
            </button>
          ) : (
            <div className="mt-2">
              <input
                type="number"
                placeholder="Enter amount (ETH)"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                className="w-full p-2 border rounded mb-2"
                min="0"
                step="0.01"
              />
              <div className="flex gap-2">
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded"
                  onClick={() => {
                    if (donationAmount > 0) donate();
                    else toast.error('Enter a valid donation amount');
                  }}
                >
                  Confirm Donate
                </button>
                <button
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                  onClick={() => setShowDonationField(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {isBeneficiary && isEnded && (
        <button
          className="bg-red-600 text-white px-4 py-2 rounded mt-2 w-full"
          onClick={withdraw}
        >
          Withdraw Funds
        </button>
      )}
    </div>
  );
};

export default Donate;
