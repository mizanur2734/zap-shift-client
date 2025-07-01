import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const BeARider = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
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

  useEffect(() => {
    // Fetch service centers for region-district mapping
    axiosSecure.get("/service-centers").then((res) => {
      const uniqueRegions = [
        ...new Set(res.data.map((item) => item.region)),
      ];
      setRegions(uniqueRegions);
      setDistricts(res.data);
    });
  }, [axiosSecure]);

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    setFormData({ ...formData, region, district: "" });
  };

  const filteredDistricts = districts
    .filter((item) => item.region === selectedRegion)
    .map((item) => item.district);

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

    try {
      const res = await axiosSecure.post("/rider-application", dataToSend);
      console.log("Application submitted", res.data);
      // Show success or reset form
    } catch (err) {
      console.error("Error submitting application", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🚴 Become a Rider</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" value={user.displayName} readOnly className="input input-bordered w-full" />
        <input type="email" value={user.email} readOnly className="input input-bordered w-full" />
        <input type="number" name="age" onChange={handleChange} value={formData.age} placeholder="Age" className="input input-bordered w-full" />
        <input type="text" name="phone" onChange={handleChange} value={formData.phone} placeholder="Phone Number" className="input input-bordered w-full" />
        <input type="text" name="nid" onChange={handleChange} value={formData.nid} placeholder="National ID Card Number" className="input input-bordered w-full" />
        <input type="text" name="bikeBrand" onChange={handleChange} value={formData.bikeBrand} placeholder="Bike Brand" className="input input-bordered w-full" />
        <input type="text" name="bikeRegNumber" onChange={handleChange} value={formData.bikeRegNumber} placeholder="Bike Registration Number" className="input input-bordered w-full" />

        <select
          className="select select-bordered w-full"
          value={formData.region}
          onChange={(e) => handleRegionChange(e.target.value)}
        >
          <option disabled value="">Select Region</option>
          {regions.map((region) => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>

        <select
          className="select select-bordered w-full"
          name="district"
          value={formData.district}
          onChange={handleChange}
          disabled={!selectedRegion}
        >
          <option disabled value="">Select District</option>
          {filteredDistricts.map((district, idx) => (
            <option key={idx} value={district}>{district}</option>
          ))}
        </select>

        <button type="submit" className="btn text-black btn-primary bg-[#CAEB66] w-full">Submit Application</button>
      </form>
    </div>
  );
};

export default BeARider;
