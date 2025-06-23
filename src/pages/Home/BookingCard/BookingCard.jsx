import React from "react";
import bookingIco from '../../../assets/bookingIcon.png'
const BookingCard = () => {
  return (
    <div className="my-12">
    <h2 className="text-3xl text-[#03373D] mb-8">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#FFFFFFB3] shadow-sm rounded-3xl">
        <div className="p-8">
        <img className="w-12 my-4"
            src={bookingIco}
          />
          <h2 className="card-title text-[#03373D] my-2 text-xl">Booking Pick & Drop</h2>
          <p className="text-[#606060] text-sm">
            From personal packages to business shipments — we deliver on time, every time.
          </p>
          
        </div>
      </div>
        <div className="bg-[#FFFFFFB3] shadow-sm rounded-3xl">
        <div className="p-8">
        <img className="w-12 my-4"
            src={bookingIco}
          />
          <h2 className="card-title text-[#03373D] my-2 text-xl">Booking Pick & Drop</h2>
          <p className="text-[#606060] text-sm">
            From personal packages to business shipments — we deliver on time, every time.
          </p>
          
        </div>
      </div>
        <div className="bg-[#FFFFFFB3] shadow-sm rounded-3xl">
        <div className="p-8">
        <img className="w-12 my-4"
            src={bookingIco}
          />
          <h2 className="card-title text-[#03373D] my-2 text-xl">Booking Pick & Drop</h2>
          <p className="text-[#606060] text-sm">
            From personal packages to business shipments — we deliver on time, every time.
          </p>
          
        </div>
      </div>
        <div className="bg-[#FFFFFFB3] shadow-sm rounded-3xl">
        <div className="p-8">
        <img className="w-12 my-4"
            src={bookingIco}
          />
          <h2 className="text-[#03373D] my-2 text-xl">Booking Pick & Drop</h2>
          <p className="text-[#606060] text-sm">
            From personal packages to business shipments — we deliver on time, every time.
          </p>
          
        </div>
      </div>
      </div>
    </div>
  );
};

export default BookingCard;
