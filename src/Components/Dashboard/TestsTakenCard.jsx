import TestsTakenIcon from "./../../assets/TestsTakenIcon.svg";

export const TestsTakenCard = ({testsTaken}) => {
  return (
    <div className="bg-white rounded-xl lg:rounded-r-none w-28 h-28 sm:w-36 sm:h-32 my-5 py-1 shadow-[#9cbcf8] shadow-md ml-10 lg:ml-0">
      <div className="ml-3 text-xs font-bold">
        <p>Tests</p>
        <p>Taken</p>
      </div>
      <div className="flex justify-center p-4 pt-2 h-[3.5em]">
        <img src={TestsTakenIcon} className="size-fit"></img>
      </div>
      <p className="text-end text-sm sm:text-2xl mr-3 font-semibold">{testsTaken}/9</p>
    </div>
  );
};
