import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { parcelId } = useParams();
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate()
  const [error, setError] = useState("");

  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isPending) {
    return <p>...loading</p>;
  }
  console.log(parcelInfo);
  const amount = parcelInfo.cost;
  const amountInCents = amount * 100;
  console.log(amountInCents);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    // step- 1: validate the card
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
      console.log("payment method", paymentMethod);

      // Step 2: Create payment intent
      const res = await axiosSecure.post("/create-payment-intent", {
        amountInCents, // changed to 'amount' as usually expected
        parcelId,
      });

      const clientSecret = res.data.clientSecret;

      // step-3: confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            email: user.email
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        setError('')
        if (result.paymentIntent.status === "succeeded")
          console.log("payment succeeded!");
          const transactionId = result.paymentIntent.id;
        // step-4: mark parcel paid also create payment history
        const paymentData = {
            parcelId,
            email: user.email, 
            amount,
            transactionId: transactionId,
            paymentMethod: result.paymentIntent.payment_method_types[0],

        }

        const paymentsRes = await axiosSecure.post('/payments', paymentData)
        if (paymentsRes.data.insertedId){
            await Swal.fire({
                icon: 'success',
                title: "payment successful",
                html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
            })

            // redirect to /myparcels
            navigate('/dashboard/myParcels');
        }
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
      >
        <CardElement className="p-2 rounded" />
        <button
          type="submit"
          className="btn bg-[#CAEB66] w-full"
          disabled={!stripe}
        >
          Pay ${amount}
        </button>
        {error && <p className="text-red-400">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
