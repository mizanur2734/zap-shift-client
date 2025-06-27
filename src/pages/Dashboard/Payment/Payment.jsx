import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';

const stripPromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

const Payment = () => {
    return (
        <Elements stripe={stripPromise}>
            <PaymentForm></PaymentForm>
        </Elements>
    );
};

export default Payment;