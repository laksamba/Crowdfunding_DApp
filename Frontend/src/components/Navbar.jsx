import React, { useState } from "react";
import logo from "./../assets/TLogo.png";
import WalletConnect from "./WalletConnect";
// import { connectWallet } from "../wallet/walletConnect";

const Navbar = () => {
  const [address, setAddress] = useState("");

  const handleConnect = async () => {
    const wallet = await connectWallet();
    if (wallet) setAddress(wallet.address);
  };

  return (
    <nav className="flex justify-between md:justify-evenly items-center bg-white px-2 shadow-lg fixed w-full border-gray-200 ">
      <a href="/">
        <img src={logo} alt="logo" className="h-24 bg-white rounded-full" />
      </a>
      <div>

        <WalletConnect/>
      </div>
    </nav>
  );
};

export default Navbar;
