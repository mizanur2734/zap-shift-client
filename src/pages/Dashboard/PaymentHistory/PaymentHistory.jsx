import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const formateDate = (iso) => new Date(iso).toLocaleString()

const PaymentHistory = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()

    const {isPending, data: payments = []} = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async() =>{
            const res = await axiosSecure.get(`/payments?email=${user.email}`)
            return res.data
        }
    })

    if(isPending){
        return '...loading'
    }

    return (
        <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">💳 My Payment History</h2>

      <div className="overflow-x-auto shadow rounded-xl">
        <table className="table w-full">
          <thead className="bg-base-200 text-base font-semibold">
            <tr>
              <th>#</th>
              <th>Parcel ID</th>
              <th>Amount</th>
              <th>Transaction ID</th>
              <th>Paid At</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id} className="hover">
                <td>{index + 1}</td>
                {/* .slice(0, 8) */}
                <td className="text-sm font-medium">{payment.parcelId}</td>
                <td className="text-green-600 font-bold">৳{payment.amount}</td>
                <td className="text-xs text-gray-600">{payment.transactionId || 'N/A'}</td>
                <td className="text-sm">{new Date(payment.paid_at).toLocaleString()}</td>
              </tr>
            ))}

            {payments.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No payment history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default PaymentHistory;