import axios from "axios";

export const createPaymentIntent = async (amount, appointmentId) => {
  const response = await axios.post(
    "http://localhost:8000/api/payments/create-intent/",
    {
      amount,
      appointment_id: appointmentId,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // if using JWT
      },
    }
  );
  return response.data;
};
