import AddCreditSliderTabs from "./AddCreditsSliderTabs";
import addCreditImg from "../../assets/AddCreditsSVG.svg";

//Add credits section inside user dashboard.

const AddCredits = () => {
  return (
    <section className="">
      <div className="flex flex-col md:flex-row justify-center mb-10 bg-white font-poppins">
        <div className="lg:p-10 px-5 bg-white">
          <h1 className="text-2xl mt-8 font-extrabold font-poppins">
            Keep the momentum going!
          </h1>
          <div className="mt-3 w-full md:w-[80%]">
            Add credits to your account and continue your journey of discovery
            with BranchSelector!
            <br />
          </div>
          <img
            className="h-60 mt-10 ml-[50%] hidden md:block"
            src={addCreditImg}
            alt="Add Credit"
          />
        </div>
        <div>
          {/* Slider tabs to switch between buy credits and use voucher code */}
          <AddCreditSliderTabs />
        </div>
      </div>
    </section>
  );
};

export default AddCredits;
