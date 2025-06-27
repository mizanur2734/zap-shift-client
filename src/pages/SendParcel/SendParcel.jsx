import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SendParcel = () => {
  const { register, handleSubmit, watch } = useForm();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const servicesCenter = useLoaderData();

  const [regionData, setRegionData] = useState({});
  const [senderDistricts, setSenderDistricts] = useState([]);
  const [receiverDistricts, setReceiverDistricts] = useState([]);

  const type = watch("type");

  useEffect(() => {
    const regionMap = {};
    servicesCenter.forEach((center) => {
      if (!regionMap[center.region]) {
        regionMap[center.region] = new Set();
      }
      regionMap[center.region].add(center.district);
    });
    const formatted = {};
    for (const region in regionMap) {
      formatted[region] = Array.from(regionMap[region]);
    }
    setRegionData(formatted);
  }, [servicesCenter]);

  const onSubmit = async (data) => {
    const { type, weight, pickupCenter, deliveryCenter } = data;
    const sameCity = pickupCenter === deliveryCenter;
    let baseCost = 0;
    let extraWeightCost = 0;
    let outOfCityExtra = 0;
    let total = 0;

    const wt = parseFloat(weight || 0);

    if (type === "document") {
      baseCost = sameCity ? 60 : 80;
    } else if (type === "non-document") {
      if (wt <= 3) {
        baseCost = sameCity ? 110 : 150;
      } else {
        baseCost = sameCity ? 110 : 150;
        const extra = Math.ceil(wt - 3);
        extraWeightCost = extra * 40;
        outOfCityExtra = sameCity ? 0 : 40; // Only for outside city
      }
    }

    total = baseCost + extraWeightCost + outOfCityExtra;

    const breakdownHTML = `
    <div style="text-align:left">
      <p><strong>Parcel Type:</strong> ${type}</p>
      <p><strong>Base Cost:</strong> ৳${baseCost}</p>
      ${
        extraWeightCost > 0
          ? `<p><strong>Extra Weight Cost:</strong> ৳${extraWeightCost}</p>`
          : ""
      }
      ${
        outOfCityExtra > 0
          ? `<p><strong>Out of City Charge:</strong> ৳${outOfCityExtra}</p>`
          : ""
      }
      <hr/>
      <h3 style="color:green; font-size:18px"><strong>Total Cost: ৳${total}</strong></h3>
    </div>
  `;

    const result = await Swal.fire({
      title: "Delivery Cost Breakdown",
      html: breakdownHTML,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Proceed to Payment",
      cancelButtonText: "Edit Info",
      confirmButtonColor: "#22c55e", 
      cancelButtonColor: "#ef4444", 
      backdrop: true,
    });

    if (result.isConfirmed) {
      const parcelData = {
        ...data,
        cost: total,
        created_by: user.email,
        payment_status: "unpaid",
        delivery_status: "not_collected",
        creation_date: new Date().toISOString(),
      };
      console.log("✅ Saving to DB:", parcelData);

      axiosSecure.post("/parcels", parcelData).then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            title: "Redirecting to Payment...",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      });

      // reset();
    } else {
      console.log("📝 User chose to edit info.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-base-100 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold mb-2">Send a Parcel</h2>
      <p className="text-gray-500 mb-6">Fill the form to create a new parcel</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Parcel Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Parcel Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              {...register("type", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Parcel Type</option>
              <option value="document">Document</option>
              <option value="non-document">Non-Document</option>
            </select>
            <input
              {...register("title", { required: true })}
              placeholder="Parcel Title"
              className="input input-bordered w-full"
            />
            {type === "non-document" && (
              <input
                type="number"
                step="0.1"
                {...register("weight")}
                placeholder="Weight (kg)"
                className="input input-bordered w-full"
              />
            )}
          </div>
        </div>

        {/* Sender + Receiver */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sender */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Sender Info</h3>
            <div className="space-y-4">
              <input
                {...register("senderName", { required: true })}
                placeholder="Sender Name"
                className="input input-bordered w-full"
              />
              <input
                {...register("senderContact", { required: true })}
                placeholder="Sender Contact"
                className="input input-bordered w-full"
              />

              <select
                {...register("senderRegion", { required: true })}
                className="select select-bordered w-full"
                onChange={(e) =>
                  setSenderDistricts(regionData[e.target.value] || [])
                }
              >
                <option value="">Select Region</option>
                {Object.keys(regionData).map((region) => (
                  <option key={region}>{region}</option>
                ))}
              </select>

              <select
                {...register("pickupCenter", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Service Center</option>
                {senderDistricts.map((dist) => (
                  <option key={dist}>{dist}</option>
                ))}
              </select>

              <input
                {...register("senderAddress", { required: true })}
                placeholder="Sender Address"
                className="input input-bordered w-full"
              />
              <textarea
                {...register("pickupInstruction")}
                placeholder="Pick up Instruction"
                className="textarea textarea-bordered w-full"
              />
            </div>
          </div>

          {/* Receiver */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Receiver Info</h3>
            <div className="space-y-4">
              <input
                {...register("receiverName", { required: true })}
                placeholder="Receiver Name"
                className="input input-bordered w-full"
              />
              <input
                {...register("receiverContact", { required: true })}
                placeholder="Receiver Contact"
                className="input input-bordered w-full"
              />

              <select
                {...register("receiverRegion", { required: true })}
                className="select select-bordered w-full"
                onChange={(e) =>
                  setReceiverDistricts(regionData[e.target.value] || [])
                }
              >
                <option value="">Select Region</option>
                {Object.keys(regionData).map((region) => (
                  <option key={region}>{region}</option>
                ))}
              </select>

              <select
                {...register("deliveryCenter", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Service Center</option>
                {receiverDistricts.map((dist) => (
                  <option key={dist}>{dist}</option>
                ))}
              </select>

              <input
                {...register("receiverAddress", { required: true })}
                placeholder="Receiver Address"
                className="input input-bordered w-full"
              />
              <textarea
                {...register("deliveryInstruction")}
                placeholder="Delivery Instruction"
                className="textarea textarea-bordered w-full"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="text-center">
          <button type="submit" className="btn px-8 text-black bg-[#CAEB66]">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
