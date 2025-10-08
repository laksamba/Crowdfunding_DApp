import React from 'react'

const Footer = () => {
  return (
    <div>
         <footer className="bg-white text-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Sahyogee</h3>
            <p className="text-gray-700 mb-4">Connecting hearts and wallets through blockchain-powered collective giving.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition">Twitter</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition">Discord</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition">GitHub</a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-gray-700">
              <li><a href="#" className="hover:text-blue-600 transition">Create Campaign</a></li>
              <li><a href="#" className="hover:text-blue-600 transition">Browse Campaigns</a></li>
              <li><a href="#" className="hover:text-blue-600 transition">Dashboard</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-700">
              <li><a href="#about" className="hover:text-blue-600 transition">About Us</a></li>
              <li><a href="#" className="hover:text-blue-600 transition">Careers</a></li>
              <li><a href="#" className="hover:text-blue-600 transition">Press</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-700">
              <li><a href="#" className="hover:text-blue-600 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-600 transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-600 transition">Smart Contract Audit</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-700">
          <p>&copy; 2025 Sahyogee. All rights reserved.</p>
        </div>
      </footer>

    </div>
  )
}

export default Footer