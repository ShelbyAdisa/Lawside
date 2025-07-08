import React, { useState } from 'react';
import {
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { createPaymentIntent } from '../services/paymentService';

const CheckoutForm = ({ amount, onPaymentSuccess, onPaymentError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');

    try {
      // Step 1: Create payment intent on your Django backend
      const { client_secret } = await createPaymentIntent(amount);

      // Step 2: Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: 'Customer Name', // You can make this dynamic
            email: 'customer@example.com', // You can make this dynamic
          },
        },
      });

      if (error) {
        setErrorMessage(error.message);
        onPaymentError(error);
      } else {
        // Payment succeeded
        console.log('Payment succeeded:', paymentIntent);
        onPaymentSuccess(paymentIntent);
      }
    } catch (error) {
      setErrorMessage(error.message || 'An unexpected error occurred');
      onPaymentError(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <div className="form-group">
        <label htmlFor="card-element">
          Credit or debit card
        </label>
        <CardElement
          id="card-element"
          options={cardElementOptions}
          className="card-element"
        />
      </div>
      
      {errorMessage && (
        <div className="error-message" role="alert">
          {errorMessage}
        </div>
      )}
      
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="pay-button"
      >
        {isProcessing ? 'Processing...' : `Pay $${(amount / 100).toFixed(2)}`}
      </button>
    </form>
  );
};

export default CheckoutForm;