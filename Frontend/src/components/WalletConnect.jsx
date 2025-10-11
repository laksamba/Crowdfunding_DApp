import React, { useState, useEffect } from "react";

const WalletConnect = () => {
  const [address, setAddress] = useState(null);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(true);

  useEffect(() => {
    if (!window.ethereum) {
      setIsMetaMaskInstalled(false);
      return;
    }

    const saveAddress = localStorage.getItem("connectedWallet");
    if (saveAddress) {
      setAddress(saveAddress);
    }

    window.ethereum.on("accountsChange", (accounts) => {
      if (accounts.length > 0) {
        setAddress(accounts[0]);
        localStorage.setItem("connectedWallet", accounts[0]);
      } else {
        setAddress(null);
        localStorage.removeItem("connectedWallet");
      }
    });
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask not detected. Please install it!");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAddress(accounts[0]);
      localStorage.setItem("connectedWallet", accounts[0]);
      console.log("Connected Wallet:", accounts[0]);
    } catch (error) {
      console.error("User rejected connection:", error);
    }
  };

  const DisconnectWallet = () => {
    setAddress(null);
    localStorage.removeItem("connectedWallet");
  };

  return (
    <div>
      {!isMetaMaskInstalled ? (
        <p className="text-red-500">
          MetaMask not detected. Please install it!
        </p>
      ) : !address ? (
        <button
          onClick={connectWallet}
          className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-500"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="flex justify-center items-center">
          <p className="text-green-700">
            connected: {address.slice(0, 6)}...{address.slice(-4)}
          </p>
          <button
            onClick={DisconnectWallet}
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
