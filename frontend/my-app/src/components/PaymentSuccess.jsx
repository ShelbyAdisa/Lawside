// import React from 'react';

// const PaymentSuccess = ({ paymentDetails, onReturnToPayment }) => {
//   return (
//     <div className="payment-success">
//       <div className="success-container">
//         <h1>Payment Successful!</h1>
//         <div className="success-details">
//           <p><strong>Payment ID:</strong> {paymentDetails.id}</p>
//           <p><strong>Amount:</strong> ${(paymentDetails.amount / 100).toFixed(2)}</p>
//           <p><strong>Status:</strong> {paymentDetails.status}</p>
//         </div>
//         <button onClick={onReturnToPayment} className="return-button">
//           Make Another Payment
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PaymentSuccess;




import React from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <h1 className="text-4xl font-bold text-green-700 mb-4">Payment Successful!</h1>
      <p className="text-lg text-green-600 mb-6">Thank you for your booking. We’ll be in touch shortly.</p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-2 bg-green-600 text-white rounded-lg"
      >
        Back to Home
      </button>
    </div>
  );
}