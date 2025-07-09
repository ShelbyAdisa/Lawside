// src/pages/CheckoutPage.jsx
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

// Replace with your Stripe public key
const stripePromise = loadStripe("pk_test_51RiX3qBHnuH9MYZ3No97OApwAUet1MWXQMZgAlNJu64k2bf0fCKXOk8IaxGR8JQ4MZi8pvr3CjkNUtSn002LapSlr4");

const CheckoutPage = ({ user, amount, appointmentId }) => {
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded">
      <h2 className="text-xl font-semibold mb-4">Confirm Payment</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm
          amount={amount}
          user={user}
          appointmentId={appointmentId}
          onPaymentSuccess={(paymentIntent) => {
            alert("Payment successful!");
            console.log(paymentIntent);
            // optionally navigate to a thank you or dashboard page
          }}
          onPaymentError={(error) => {
            alert("Payment failed!");
            console.error(error);
          }}
        />
      </Elements>
    </div>
  );
};

export default CheckoutPage;
