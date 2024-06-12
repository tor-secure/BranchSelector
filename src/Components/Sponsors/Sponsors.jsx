import React from "react";
import PanamaLogo from "../../assets/PanamaLogo.png";
import SurePassLogo from "../../assets/SurePassLogo.jpeg";
import SahyadriLogo from "../../assets/SahyadriLogo.jpeg";
import TorsecureLogo from "../../assets/TorsecureLogo.png";

const SponsorsLogo = [
  {
    id: 1,
    logo: TorsecureLogo,
    logoAlt: "TorSecure Logo",
    url: "https://www.torsecure.com/"
  },
  {
    id: 2,
    logo: PanamaLogo,
    logoAlt: "Panama Logo",
    url: "https://panamacorporationltd.com/"
  },
  {
    id: 3,
    logo: SurePassLogo,
    logoAlt: "SurePass Logo",
    url: "https://www.thesurepass.com"
  },
  {
    id: 4,
    logo: SahyadriLogo,
    logoAlt: "Sahyadri Logo",
    url:"https://www.sahyadri.edu.in"
  },
];
const Sponsors = () => {
  return (
    <section className="py-6 lg:min-w-[90%] ">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <h3 className="font-semibold text-xl text-gray-600 text-center">
          Our Partners
        </h3>
        <div className="my-6 ">
          <ul className="flex gap-y-6 flex-wrap items-center justify-center gap-x-16   ">
            {SponsorsLogo.map((item) => (
              <li className="flex-none mx-4" key={item.id}>
                <img 
                  src={item.logo} 
                  alt={item.logoAlt} 
                  className="w-48" 
                  onClick={() => window.open(item.url, '_blank')}
                  style={{ cursor: 'pointer' }} 
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
