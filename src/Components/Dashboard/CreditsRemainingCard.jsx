import CreditsRemainingIcon from "./../../assets/CreditsRemainingIcon.svg";

export const CreditsRemainingCard = () => {
  return (
    <div className="bg-white rounded-xl lg:rounded-r-none w-28 h-28 sm:w-36 sm:h-32 my-5 py-1 shadow-[#9cbcf8] shadow-md">
      <div className="ml-3 text-xs font-bold">
        <p>Credits</p>
        <p>Remaining</p>
      </div>
      <div className="flex justify-center p-4 h-[3.5em]">
        <img src={CreditsRemainingIcon} className="size-fit"></img>
      </div>
      <p className="text-end text-sm sm:text-2xl mr-3 font-semibold">3</p>
    </div>
  );
};
