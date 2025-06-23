import React from "react";
import tracking from "../../../assets/benefits/tracking.png"
import call from "../../../assets/benefits/call.png"
import support from "../../../assets/benefits/support.png"
const benefits = [
  {
    id: "benefit_1",
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    image: tracking,
  },
  {
    id: "benefit_2",
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    image: call,
  },
  {
    id: "benefit_3",
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    image: support,
  },
];

const Benefits = () => {
  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-black">
          Why Choose Us
        </h2>

        <div className="grid gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="card card-side shadow-md bg-[#FFFFFFB3] p-4 items-center border"
            >
              {/* Left: Image */}
              <figure className="w-24 h-24">
                <img
                  src={benefit.image}
                  alt={benefit.title}
                  className="w-full h-full object-contain"
                />
              </figure>

              {/* Center: Vertical line */}
              <div className="hidden md:block h-20 w-px bg-neutral mx-6" />

              {/* Right: Title and Description */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-[#03373D]">
                  {benefit.title}
                </h3>
                <p className="text-sm text-[#606060] mt-1">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Benefits;
