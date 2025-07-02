import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const BeARider = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const serviceCenters = useLoaderData(); // loaded from route loader

  const regions = [...new Set(serviceCenters.map((sc) => sc.region))];
  const [selectedRegion, setSelectedRegion] = useState("");

  const [formData, setFormData] = useState({
    age: "",
    phone: "",
    nid: "",
    bikeBrand: "",
    bikeRegNumber: "",
    region: "",
    district: "",
    status: "pending",
  });

  const filteredDistricts = serviceCenters
    .filter((sc) => sc.region === selectedRegion)
    .map((sc) => sc.district);

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    setFormData({ ...formData, region, district: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      name: user.displayName,
      email: user.email,
    };

      const res = await axiosSecure.post("/rider-application", dataToSend);

      if (res.data.insertedId || res.data.acknowledged) {
        console.log(res.data.insertedId)
        Swal.fire({
          title: "✅ Success!",
          text: "Your rider application has been submitted.",
          icon: "success",
        });

        setSelectedRegion("");
      } 

  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🚴 Become a Rider</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={user.displayName}
          readOnly
          className="input input-bordered w-full"
        />
        <input
          type="email"
          value={user.email}
          readOnly
          className="input input-bordered w-full"
        />
        <input
          type="number"
          name="age"
          onChange={handleChange}
          value={formData.age}
          placeholder="Age"
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="phone"
          onChange={handleChange}
          value={formData.phone}
          placeholder="Phone Number"
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="nid"
          onChange={handleChange}
          value={formData.nid}
          placeholder="National ID Card Number"
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="bikeBrand"
          onChange={handleChange}
          value={formData.bikeBrand}
          placeholder="Bike Brand"
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="bikeRegNumber"
          onChange={handleChange}
          value={formData.bikeRegNumber}
          placeholder="Bike Registration Number"
          className="input input-bordered w-full"
        />

        <select
          className="select select-bordered w-full"
          value={formData.region}
          onChange={(e) => handleRegionChange(e.target.value)}
        >
          <option value="">Select Region</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>

        <select
          className="select select-bordered w-full"
          name="district"
          value={formData.district}
          onChange={handleChange}
        >
          <option value="">Select District</option>
          {filteredDistricts.map((district, idx) => (
            <option key={idx} value={district}>
              {district}
            </option>
          ))}
        </select>

        <button type="submit" className="btn btn-primary w-full">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default BeARider;
