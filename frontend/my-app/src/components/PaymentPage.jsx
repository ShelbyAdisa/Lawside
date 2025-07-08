import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from '../utils/stripeConfig';
import CheckoutForm from './CheckoutForm';
import PaymentSuccess from './PaymentSuccess';

const PaymentPage = () => {
  const [paymentStatus, setPaymentStatus] = useState('initial'); // 'initial', 'success', 'error'
  const [paymentDetails, setPaymentDetails] = useState(null);
  const amount = 2000; // $20.00 in cents

  const handlePaymentSuccess = (paymentIntent) => {
    setPaymentStatus('success');
    setPaymentDetails(paymentIntent);
  };

  const handlePaymentError = (error) => {
    setPaymentStatus('error');
    console.error('Payment failed:', error);
  };

  const resetPayment = () => {
    setPaymentStatus('initial');
    setPaymentDetails(null);
  };

  if (paymentStatus === 'success') {
    return (
      <PaymentSuccess 
        paymentDetails={paymentDetails} 
        onReturnToPayment={resetPayment}
      />
    );
  }

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h1>Complete Your Payment</h1>
        <div className="payment-summary">
          <p>Amount: ${(amount / 100).toFixed(2)}</p>
        </div>
        
        <Elements stripe={stripePromise}>
          <CheckoutForm
            amount={amount}
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentError={handlePaymentError}
          />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentPage;