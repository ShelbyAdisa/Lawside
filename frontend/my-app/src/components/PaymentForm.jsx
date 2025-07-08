import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft } from 'lucide-react';

export default function PaymentForm() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { amount } = state || {};
  
  const [formData, setFormData] = useState({
    email: 'jona@hesvio.nl',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    nameOnCard: '',
    country: 'Netherlands',
    phoneNumber: '08 12345678',
    saveInfo: false
  });

  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData(prev => ({ ...prev, cardNumber: formatted }));
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    setFormData(prev => ({ ...prev, expiryDate: formatted }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    
    const digits = formData.cardNumber.replace(/\s+/g, "");
    if (digits.length !== 16) return setError("Card number must be 16 digits");
    if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) return setError("Expiry must be MM/YY");
    const [mon] = formData.expiryDate.split("/");
    if (+mon < 1 || +mon > 12) return setError("Invalid expiry");
    if (formData.cvc.length !== 3) return setError("CVV must be 3 digits");
    if (!formData.nameOnCard.trim()) return setError("Card holder required");

    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      navigate("/payment-success");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex">
          {/* Left side - blank */}
          <div className="flex-1 bg-gray-50 p-8">
            {/* Left side intentionally left blank */}
          </div>
          
          {/* Right side - Payment form */}
          <div className="flex-1 p-8">
            <div className="max-w-md mx-auto">
              {/* Header */}
              <div className="flex items-center mb-8">
                <ChevronLeft className="w-5 h-5 text-gray-600 mr-2" />
                <span className="text-gray-800 font-medium">Hesvio</span>
                <span className="ml-2 px-2 py-1 bg-yellow-400 text-black text-xs font-bold rounded">
                  TEST MODE
                </span>
              </div>

              <h1 className="text-2xl font-semibold text-gray-800 mb-8">Pay with card</h1>

              <div className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Card Information */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card information
                  </label>
                  <div className="border border-gray-300 rounded-md overflow-hidden">
                    <div className="relative">
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="1234 1234 1234 1234"
                        maxLength="19"
                        className="w-full px-3 py-2 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <div className="absolute right-3 top-2 flex space-x-1">
                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjE2IiByeD0iNCIgZmlsbD0iIzAwNTFBNSIvPgo8cGF0aCBkPSJNOC45MjUgMTAuNDc1SDcuNzI1TDcuMDc1IDYuODc1SDguMjc1TDguOTI1IDEwLjQ3NVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xMi41MjUgNi44NzVIMTEuNDc1TDEwLjMyNSA5LjQ3NUw5LjcyNSA2Ljg3NUg4LjUyNUw5LjcyNSAxMC40NzVIMTAuOTI1TDEyLjUyNSA2Ljg3NVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xNS4xMjUgMTAuNDc1SDE2LjMyNUwxNi45NzUgNi44NzVIMTUuNzc1TDE1LjEyNSAxMC40NzVaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K" alt="Visa" className="w-6 h-4" />
                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjE2IiByeD0iNCIgZmlsbD0iI0VCMDAxQiIvPgo8cGF0aCBkPSJNMTIgMTJIMTRWNEgxMlYxMloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xMCAxMkgxMlY0SDEwVjEyWiIgZmlsbD0iI0ZGNUYwMCIvPgo8L3N2Zz4K" alt="Mastercard" className="w-6 h-4" />
                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjE2IiByeD0iNCIgZmlsbD0iIzAwNkZDRiIvPgo8cGF0aCBkPSJNNyA0SDEwVjEySDdWNFoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xNCA0SDE3VjEySDE0VjRaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K" alt="American Express" className="w-6 h-4" />
                      </div>
                    </div>
                    <div className="flex border-t border-gray-300">
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleExpiryChange}
                        placeholder="MM / YY"
                        maxLength="5"
                        className="flex-1 px-3 py-2 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <input
                        type="text"
                        name="cvc"
                        value={formData.cvc}
                        onChange={handleInputChange}
                        placeholder="CVC"
                        maxLength="3"
                        className="flex-1 px-3 py-2 border-0 border-l border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Name on card */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name on card
                  </label>
                  <input
                    type="text"
                    name="nameOnCard"
                    value={formData.nameOnCard}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country or region
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="Netherlands">Netherlands</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="Kenya">Kenya</option>
                  </select>
                </div>

                {/* Save information */}
                <div className="border-t pt-6">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      name="saveInfo"
                      checked={formData.saveInfo}
                      onChange={handleInputChange}
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Securely save my information for 1-click checkout
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        Enter your phone number to create a Link account and pay faster at Hesvio and everywhere Link is accepted.
                      </p>
                      <div className="mt-3 flex items-center space-x-2">
                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAyMCAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjEyIiByeD0iMiIgZmlsbD0iI0ZGNjYwMCIvPgo8cmVjdCB4PSIyIiB5PSIyIiB3aWR0aD0iMTYiIGhlaWdodD0iOCIgcng9IjEiIGZpbGw9IndoaXRlIi8+CjxyZWN0IHg9IjQiIHk9IjQiIHdpZHRoPSIxMiIgaGVpZ2h0PSI0IiByeD0iMSIgZmlsbD0iI0ZGNjYwMCIvPgo8L3N2Zz4K" alt="Netherlands flag" className="w-5 h-3" />
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Phone number"
                        />
                        <span className="text-xs text-gray-500">Optional</span>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        <a href="#" className="text-blue-600 hover:underline">Link</a>
                        <span className="mx-2">•</span>
                        <a href="#" className="text-blue-600 hover:underline">More info</a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Error message */}
                {error && (
                  <div className="text-red-500 text-sm bg-red-50 p-3 rounded-md">
                    {error}
                  </div>
                )}

                {/* Pay button */}
                <button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className={`w-full py-3 px-4 rounded-md font-medium text-white transition-colors ${
                    isProcessing
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isProcessing ? 'Processing...' : `Pay ${amount ? `KES ${amount.toLocaleString()}` : ''}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}