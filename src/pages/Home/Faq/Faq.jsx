import React from "react";

const Faq = () => {
  return (
    <div className="my-12">
      <h2 className="text-[#03373D] text-3xl text-center">
        Frequently Asked Question (FAQ)
      </h2>
      <p className="text-[#606060] text-center w-3/5 mx-auto mt-2">
        Enhance posture, mobility, and well-being effortlessly with Posture Pro.
        Achieve proper alignment, reduce pain, and strengthen your body with
        ease!
      </p>
      <div className="px-16 my-8">
        <div className="collapse collapse-arrow bg-[#E6F2F3] border border-blue-400 mb-2">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title font-semibold text-[#03373D]">
          How does this posture corrector work?
        </div>
        <div className="collapse-content text-sm text-[#606060]">
          A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.
        </div>
      </div>
      {/*  */}
      <div className="collapse collapse-arrow bg-[#E6F2F3] border mb-2">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold text-[#03373D]">
          Is it suitable for all ages and body types?
        </div>
        <div className="collapse-content text-sm text-[#606060]">
          how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.
        </div>
      </div>
      {/*  */}
      <div className="collapse collapse-arrow bg-[#E6F2F3] border mb-2">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold text-[#03373D]">
          Does it have smart features like vibration alerts?
        </div>
        <div className="collapse-content text-sm text-[#606060]">
          Go to "My Account" settings and select "Edit Profile" to make changes.
        </div>
      </div>
      </div>
    </div>
  );
};

export default Faq;
