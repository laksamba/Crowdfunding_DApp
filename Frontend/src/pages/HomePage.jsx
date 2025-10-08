import React, { useState } from "react";
import Footer from "../components/Footer";
import FeaturesSection from "../components/Features";


const HomePage = () => {
  return (
    <div className="">
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Empowering Communities Through
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
              Transparent Blockchain Fundraising
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Sahyogee is a decentralized platform that combines the power of
            blockchain with the spirit of collective giving. Every donation is
            transparent, secure, and directly impacts lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/CreateCampaign"
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              Create Your Campaign
            </a>
            <a
              href="/campaigns"
              className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-600 hover:text-white transition-all duration-300"
            >
              Explore Campaigns
            </a>
          </div>
        </div>
       {/* features section */}
       <FeaturesSection/>
       
      </section>

      {/* how it works  */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50 "
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple, transparent, and secure - from campaign creation to fund
              distribution.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">
                Create Campaign
              </h3>
              <p className="text-gray-600 text-center">
                Set up your fundraising goal, share your story, and deploy your
                smart contract in minutes.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">
                Receive Donations
              </h3>
              <p className="text-gray-600 text-center">
                Donors contribute via crypto wallet. Every transaction is
                recorded on the blockchain for full transparency.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">
                Get Funds
              </h3>
              <p className="text-gray-600 text-center">
                Smart contract automatically releases funds when goals are met.
                No delays, no middlemen.
              </p>
            </div>
          </div>
        </div>

      </section>

       {/* Blockchain Trust Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Built on Trust</h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90">
            Powered by Ethereum blockchain,  smart contracts, and community governance.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Ethereum</h3>
              <p className="opacity-75">Secure, decentralized blockchain infrastructure</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Audited</h3>
              <p className="opacity-75">Smart contracts verified by devs</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Community</h3>
              <p className="opacity-75">Governed by donors and campaign creators</p>
            </div>
          </div>
          {/* <div className="flex justify-center space-x-6 text-sm opacity-75">
            <span>Accepts ETH • USDC • USDT • DAI</span>
            <span>• Multi-chain compatible</span>
          </div> */}
        </div>
      </section>

      {/* footer  */}
      <Footer/>
      
    </div>
  );
};

export default HomePage;
