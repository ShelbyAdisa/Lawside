import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/'; // Your Django backend URL

// Create payment intent
export const createPaymentIntent = async (amount, currency = 'usd') => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create-payment-intent/`, {
      amount,
      currency
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Confirm payment success (optional - for updating your database)
export const confirmPayment = async (paymentIntentId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/confirm-payment/`, {
      payment_intent_id: paymentIntentId
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};