import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useStripe } from "@stripe/react-stripe-js";

const CheckoutForm = ({ amount, appointmentId, user }) => {
  const stripe = useStripe();
  const params = useParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Get appointmentId from URL params if not provided as prop
  const currentAppointmentId = appointmentId || params.appointmentId || 1;
  const paymentAmount = amount || 20; // Default to $20.00

  const handleCheckout = async () => {
    if (!stripe) {
      setErrorMessage("Stripe has not loaded yet. Please try again.");
      return;
    }

    setIsProcessing(true);
    setErrorMessage("");

    try {
      const token = localStorage.getItem("authToken");
      
      // Create checkout session
      const response = await fetch("http://localhost:8000/api/payments/create-checkout-session/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          amount: paymentAmount, 
          appointment_id: currentAppointmentId 
        }),
      });

      if (!response.ok) {

        console.log(JSON.stringify({ 
     amount: paymentAmount, 
     appointment_id: currentAppointmentId 
   }));

        throw new Error(`HTTP error! status: ${response.status}`);

        
      }


      const data = await response.json();
      if (!data.checkout_url) throw new Error("No checkout URL received from server.");
        window.location.href = data.checkout_url;

    } catch (err) {
      console.error("Checkout error:", err);
      //setErrorMessage("Failed to start checkout. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded bg-white shadow-md">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Payment Details</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-700 mb-2">
            <span className="font-medium">Amount:</span> ${(paymentAmount / 100).toFixed(2)}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-medium">Appointment ID:</span> {currentAppointmentId}
          </p>
          {user && (
            <p className="text-gray-700">
              <span className="font-medium">User:</span> {user.email || user.username}
            </p>
          )}
        </div>
      </div>

      {errorMessage && (
        <div className="text-red-600 text-sm mb-4 p-3 bg-red-50 border border-red-200 rounded">
          {errorMessage}
        </div>
      )}

      <button
        onClick={handleCheckout}
        disabled={isProcessing || !stripe}
        className={`w-full py-3 rounded-lg text-white font-semibold transition-colors ${
          isProcessing || !stripe
            ? "bg-gray-400 cursor-not-allowed" 
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isProcessing ? "Redirecting to Checkout..." : "Proceed to Checkout"}
      </button>

      <p className="text-sm text-gray-500 mt-4 text-center">
        You will be redirected to Stripe's secure checkout page
      </p>
    </div>
  );
};

export default CheckoutForm;