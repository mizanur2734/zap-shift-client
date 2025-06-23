import Marquee from "react-fast-marquee";
import logo1 from "../../../assets/brands/amazon.png";
import logo2 from "../../../assets/brands/amazon_vector.png";
import logo3 from "../../../assets/brands/casio.png";
import logo4 from "../../../assets/brands/moonstar.png";
import logo5 from "../../../assets/brands/randstad.png";
import logo6 from "../../../assets/brands/start-people 1.png";
import logo7 from "../../../assets/brands/start.png";

const clientLogos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

const ClientSlider = () => {
  return (
    <section className="py-10 mx-16">
      <h2 className="text-center text-3xl font-semibold mb-10 text-gray-800">
        We've helped thousands of sales teams
      </h2>
      <Marquee speed={50} gradient={false} direction="left" pauseOnHover={true}>
        {clientLogos.map((logo, index) => (
          <div key={index} className="mx-8">
            <img
              src={logo}
              alt={`Client ${index}`}
              className="h-6 w-auto object-contain"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default ClientSlider;
