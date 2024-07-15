import { toast } from "react-toastify";
import addCreditImg from "../../assets/AddCreditsSVG.svg";

const plans = {
  credits: [
    { credits: 1, price: 199, originalPrice: 199, plandID:'C1' },
    { credits: 3, price: 499, originalPrice: 599, planID:'C3'},
    { credits: 5, price: 799, originalPrice: 999, planID:'C5' },
    { credits: 9, price: 1499, originalPrice: 1799, planID:'C9' },
    { credits: 12, price: 1999, originalPrice: 2399, planID:'C12' },
  ],
  counselingSession: [
    { title: "Online/Offline Career Counseling Appointment", price: 1999, originalPrice: 1999, planID: 'CO1' },
  ],
  bundle:[
    { title: "3 Credits + online/offline career counseling", price: 2499, originalPrice: 2796, planID: 'CB3' },
    { title: "5 Credits + online/offline career counseling", price: 2999, originalPrice: 3194, planID: 'CB5' },
  ]

};


const handleClick = () =>{
    toast.error("Payments not yet active")
}


const SmallCard = ({ credits, price, originalPrice }) => {
const discount = originalPrice-price
  return (
    <div onClick={handleClick} className="bg-white cursor-pointer rounded-lg shadow-md p-4 w-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg group">
      <div className="flex flex-row justify-between items-center">
        <p className="text-sm font-bold text-gray-800  duration-300">{credits} {credits === 1 ? 'Credit' : 'Credits'}</p>
        {discount > 0 && (
          <span className="text-xs text-green-500 font-bold  duration-300">-₹{originalPrice-price}</span>
        )}
      </div>
      <div className="flex items-baseline mt-1">
        <span className="text-2xl font-bold text-blue-600  duration-300">₹{price}</span>
        {originalPrice > price && (
          <span className="ml-2 text-sm text-gray-500 line-through  transition-opacity duration-300 opacity-70 group-hover:opacity-100">
            ₹{originalPrice}
          </span>
        )}
      </div>
    </div>
  );
};

const LargeCard = ({ title, children }) => (
  <div className="bg-white rounded-lg shadow-md p-6 w-full mb-4 transition-all duration-300 ease-in-out hover:shadow-lg">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    {children}
  </div>
);

const CounselingCard = ({ title, price, originalPrice }) => {
  const discount = originalPrice-price
  return (
    <div onClick={handleClick} className="bg-white cursor-pointer rounded-lg shadow-md p-4 w-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg group">
      <p className="text-sm font-bold text-gray-800  duration-300">{title}</p>
      <div className="flex items-baseline mt-1 justify-between">
        <span className="text-2xl font-bold text-blue-600  duration-300">₹{price}</span>
      </div>
    </div>
  );
};

const PricingPage = () => {
  return (
    <div className="flex flex-col lg:flex-row p-4 sm:p-8 font-poppins">
      <div className="w-full lg:w-1/3 lg:pr-8 mb-6 lg:mb-0">
        <h2 className="text-xl sm:text-2xl font-bold mb-2">
          Buy credits to continue your journey into self discovery!
        </h2>
        <p className="text-sm text-gray-600">
          1 credit allows you to take a test one time
        </p>
        <br></br>
  
      </div>
      <div className="w-full lg:w-2/3">
        <LargeCard title="Credit Bundle">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {plans.credits.map((plan, index) => (
              <SmallCard key={index} {...plan} />
            ))}
          </div>
        </LargeCard>
        <LargeCard title="Counselling Session">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plans.counselingSession.map((session, index) => (
              <CounselingCard key={index} {...session} />
            ))}
          </div>
        </LargeCard>
        <LargeCard title="Credits + Conselling Session Bundle">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plans.bundle.map((session, index) => (
              <CounselingCard key={index} {...session} />
        ))}
        </div>
        </LargeCard>
      </div>
    </div>
  );
};

export default PricingPage;