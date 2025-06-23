import React from "react";
import location from "../../../assets/location-merchant.png"
const BeMerChant = () => {
  return (
    <div className="bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat bg-[#03373D] p-20 rounded-4xl mb-16">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src={location}
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-4xl font-bold">Merchant and Customer Satisfaction is Our First Priority</h1>
          <p className="py-6 text-sm">
            We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
          </p>
          <div className="space-x-2 mb-2">
            <button className="btn btn-primary rounded-full bg-[#CAEB66]">Become A Merchant</button>
          <button className="btn btn-primary rounded-full text-[#CAEB66] bg-[#03373D]">Earn with Profast Courier</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeMerChant;
