import React, { useState } from 'react';
import stripePromise from '../utils/stripeConfig';
import PaymentSuccess from './PaymentSuccess';

const PaymentPage = () => {
  const [paymentStatus, setPaymentStatus] = useState('initial'); // 'initial', 'success', 'error', 'loading'
  const [paymentDetails, setPaymentDetails] = useState(null);
  const amount = 2000; // $20.00 in cents

  const handleCheckoutRedirect = async () => {
    setPaymentStatus('loading');
    
    try {
      // Create checkout session on your backend
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          // Add other necessary data
        }),
      });
      
      const session = await response.json();
      
      if (session.error) {
        throw new Error(session.error);
      }
      
      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      
      if (error) {
        throw error;
      }
      
    } catch (error) {
      console.error('Error creating checkout session:', error);
      setPaymentStatus('error');
    }
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
        
        <div className="checkout-section">
          <button 
            onClick={handleCheckoutRedirect}
            disabled={paymentStatus === 'loading'}
            className="checkout-button"
          >
            {paymentStatus === 'loading' ? 'Processing...' : 'Proceed to Checkout'}
          </button>
          
          {paymentStatus === 'error' && (
            <div className="error-message">
              <p>Payment failed. Please try again.</p>
              <button onClick={resetPayment}>Try Again</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;