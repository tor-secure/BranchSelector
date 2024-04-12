import React, { useState } from "react";

export const LeftSection = () => {
  const [checkBottons, setCheckBottons] = useState([true, false, false, false]);

  const handleClick = (pos) => {
    console.log("In");
    const temp = [...checkBottons];

    temp.fill(false);

    temp[pos] = true;
    setCheckBottons(temp);
  };

  return (
    <div className="h-screen w-[18em] bg-white shadow-2xl p-10 flex flex-col items-center fixed">
      <div className="rounded-full bg-red-800 w-[6em] h-[6em]"></div>
      <h3 className="font-bold text-3xl">Name</h3>
      <p>name@gmail.com</p>

      <ul className="font-bold text-base text-[#595959] mt-12 w-full">
        <li
          onClick={() => handleClick(0)}
          className={
            checkBottons[0]
              ? "my-7 text-start text-white bg-primary p-3 rounded-md mx-[-18px] shadow-[#9cbcf8] shadow-md cursor-pointer hover:bg-[#5a93f5]"
              : "my-7 text-start cursor-pointer hover:text-[#808080]"
          }
        >
          Your Data
        </li>
        <li
          onClick={() => handleClick(1)}
          className={
            checkBottons[1]
              ? "my-7 text-start text-white bg-primary p-3 rounded-md mx-[-18px] shadow-[#9cbcf8] shadow-md cursor-pointer hover:bg-[#5a93f5]"
              : "my-7 text-start cursor-pointer hover:text-[#808080]"
          }
        >
          Buy Credits
        </li>
        <li
          onClick={() => handleClick(2)}
          className={
            checkBottons[2]
              ? "my-7 text-start text-white bg-primary p-3 rounded-md mx-[-18px] shadow-[#9cbcf8] shadow-md cursor-pointer hover:bg-[#5a93f5]"
              : "my-7 text-start cursor-pointer hover:text-[#808080]"
          }
        >
          Settings
        </li>
        <li className="my-7 text-start text-red-600 cursor-pointer hover:text-red-400">
          Log Out
        </li>
      </ul>
    </div>
  );
};
