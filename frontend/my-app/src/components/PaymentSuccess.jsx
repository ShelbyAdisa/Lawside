import React from 'react';

const PaymentSuccess = ({ paymentDetails, onReturnToPayment }) => {
  return (
    <div className="payment-success">
      <div className="success-container">
        <h1>Payment Successful!</h1>
        <div className="success-details">
          <p><strong>Payment ID:</strong> {paymentDetails.id}</p>
          <p><strong>Amount:</strong> ${(paymentDetails.amount / 100).toFixed(2)}</p>
          <p><strong>Status:</strong> {paymentDetails.status}</p>
        </div>
        <button onClick={onReturnToPayment} className="return-button">
          Make Another Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;




