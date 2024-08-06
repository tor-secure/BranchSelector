import { FaArrowRight } from "react-icons/fa"

//Section in user dashboard
export const BuyCreditsSection = () => {
  return (
    <div className="bg-white p-5 my-8 mt-0 md:w-max max-w-md mx-auto">
      <div className="px-5 border shadow-sm rounded-lg text-lg font-bold py-10">

        Checkout our pricing page for amazing bundles!

        <div className=" flex self-center mt-10" href='/pricing'>
            <FaArrowRight color="367af3" className="mr-2 mt-1"/>
            <a href='/pricing' className="text-lg font-bold text-[#367af3]">Go to Pricing Page</a>
        </div>

      </div>
      
    </div>
  );
};
