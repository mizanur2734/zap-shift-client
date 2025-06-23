import {
  FaTruck,
  FaGlobe,
  FaBoxOpen,
  FaMoneyBillWave,
  FaHandshake,
  FaUndo,
} from "react-icons/fa";

const services = [
  {
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    icon: <FaTruck className="text-4xl text-blue-600" />,
  },
  {
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    icon: <FaGlobe className="text-4xl text-green-600" />,
    highlight: true,
  },
  {
    title: "Fulfillment Solution",
    description:
      "We also offer customized service with inventory management support, online order processing, packaging, and after-sales support.",
    icon: <FaBoxOpen className="text-4xl text-purple-600" />,
  },
  {
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    icon: <FaMoneyBillWave className="text-4xl text-green-700" />,
  },
  {
    title: "Corporate Service / Contract In Logistics",
    description:
      "Customized corporate services which include warehouse and inventory management support.",
    icon: <FaHandshake className="text-4xl text-orange-600" />,
  },
  {
    title: "Parcel Return",
    description:
      "Through our reverse logistics facility we allow easy customers to return or exchange their products with online business merchants.",
    icon: <FaUndo className="text-4xl text-red-600" />,
  },
];

const Services = () => {
  return (
    <section className="bg-[#083344] py-16 px-4 my-8 rounded-2xl">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-white text-4xl font-bold mb-3">Our Services</h2>
        <p className="text-teal-100 mb-12 max-w-2xl mx-auto">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-xl shadow-md text-left border-2 transition-transform hover:scale-105 ${
                service.highlight
                  ? "bg-[#CAEB66] border-[#CAEB66]"
                  : "bg-[#F5F5F5] border-[#F5F5F5]"
              }`}
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-black">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
