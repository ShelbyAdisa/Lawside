import React, { useState } from 'react';
import {
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { createPaymentIntent } from '../services/paymentService';

const CheckoutForm = ({ amount, user, onPaymentSuccess, onPaymentError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage('');

    try {
      // Step 1: Create payment intent from backend
      const { client_secret } = await createPaymentIntent(amount);

      // Step 2: Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user?.name || 'Anonymous',
            email: user?.email || 'noemail@example.com',
          },
        },
      });

      if (error) {
        setErrorMessage(error.message);
        if (onPaymentError) onPaymentError(error);
      } else if (paymentIntent.status === 'succeeded') {
        if (onPaymentSuccess) onPaymentSuccess(paymentIntent);
      }
    } catch (error) {
      setErrorMessage(error.message || 'An unexpected error occurred');
      if (onPaymentError) onPaymentError(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': { color: '#aab7c4' },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <div className="form-group">
        <label htmlFor="card-element" className="block mb-2 text-sm font-medium">
          Credit or debit card
        </label>
        <CardElement
          id="card-element"
          options={cardElementOptions}
          className="card-element border p-3 rounded"
        />
      </div>

      {errorMessage && (
        <div className="text-red-600 text-sm mt-2">{errorMessage}</div>
      )}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className={`mt-4 px-4 py-2 rounded text-white ${isProcessing ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {isProcessing ? 'Processing...' : `Pay $${(amount / 100).toFixed(2)}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
