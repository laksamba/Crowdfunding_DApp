import React, { useState } from "react";
import logo from "./../assets/TLogo.png";

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

        <button  className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-500"><a href="campaigns">Donate Now</a></button>
      </div>
    </nav>
  );
};

export default Navbar;
