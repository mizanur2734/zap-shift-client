import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";


const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate()

  const {
    data: parcels = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["my-parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email, // only run when email exists
  });

  const handleView = (parcel) => {
    Swal.fire("Parcel Details", `Title: ${parcel.title}`, "info");
  };

  const handlePay = (id) => {
    // Swal.fire("Payment", `Initiate payment for: ${parcel.title}`, "info");
    console.log('proceed to payment for', id)
    navigate(`/dashboard/payment/${id}`)
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this parcel?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
       
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/parcels/${id}`);
           console.log(res.data)
          if (res.data.deletedCount > 0) {
            await refetch();
            Swal.fire("Deleted!", "Parcel has been deleted.", "success");
          } else {
            Swal.fire("Error", "Parcel not found or already deleted.", "error");
          }
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Something went wrong.", "error");
        }
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📦 My Parcels</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow">
          <table className="table w-full">
            <thead className="bg-base-200 text-base font-semibold">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Type</th>
                <th>Created At</th>
                <th>Cost</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, index) => (
                <tr key={parcel._id} className="hover">
                  <td>{index + 1}</td>
                  <td className="font-medium">{parcel.title || "Untitled"}</td>
                  <td className="capitalize">
                    {parcel.type === "document" ? "Document" : "Non-document"}
                  </td>
                 <td>{new Date(parcel.creation_date).toLocaleString()}</td>
                  <td>৳{parcel.cost}</td>
                  <td>
                    <span
                      className={`badge ${
                        parcel.payment_status === "paid"
                          ? "badge-success"
                          : "badge-error"
                      } text-white`}
                    >
                      {parcel.payment_status}
                    </span>
                  </td>
                  <td className="flex flex-wrap gap-2">
                    <button
                      className="btn btn-sm btn-info text-white"
                      onClick={() => handleView(parcel)}
                    >
                      View
                    </button>
                    {parcel.payment_status !== "paid" && (
                      <button
                        className="btn btn-sm btn-warning text-white"
                        onClick={() => handlePay(parcel._id)}
                      >
                        Pay
                      </button>
                    )}
                    <button
                      className="btn btn-sm btn-error text-white"
                      onClick={() => handleDelete(parcel._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {parcels.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    No parcels found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyParcels;
