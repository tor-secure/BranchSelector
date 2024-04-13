import React, { useEffect, useState } from "react";
import { RiCoinsFill } from "react-icons/ri";
import { MdOutlineSettings } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { MdExitToApp } from "react-icons/md";
import { FaFile } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { getCurrentUserInfo } from "../../services/userService";
import { getCurrentUser } from "../../services/authService";

export const LeftSection = () => {
  const [checkBottons, setCheckBottons] = useState([true, false, false, false]);
  const [userData, serUserData] = useState({});
  useEffect(() => {
    async function fetchTestHistory() {
      const testUserData = await getCurrentUser();
      console.log("UserData:", testUserData);
      serUserData(testUserData);
    }

    fetchTestHistory();
  }, []);

  const handleClick = (pos) => {
    console.log("In");
    const temp = [...checkBottons];

    temp.fill(false);

    temp[pos] = true;
    setCheckBottons(temp);
  };

  return (
    <div className="hidden md:flex h-screen w-[18em] bg-white shadow-2xl p-10  flex-col items-center fixed">
      <img src={userData.photoURL} className="rounded-full"></img>
      <h3 className="font-bold text-xl">{userData.displayName}</h3>
      <p>{userData.email}</p>

      <ul className="font-bold text-base text-[#595959] mt-12 w-full">
        <li
          onClick={() => handleClick(0)}
          className={
            checkBottons[0]
              ? "flex my-7 text-start text-white bg-primary p-3 rounded-md mx-[-18px] shadow-[#9cbcf8] shadow-md cursor-pointer hover:bg-[#5a93f5]"
              : "flex my-7 text-start cursor-pointer hover:text-[#808080]"
          }
        >
          <FaUser size={18} className="mt-1" />
          <p className="ml-2">Your Data</p>
        </li>
        <li
          onClick={() => handleClick(1)}
          className={
            checkBottons[1]
              ? "flex my-7 text-start text-white bg-primary p-3 rounded-md mx-[-18px] shadow-[#9cbcf8] shadow-md cursor-pointer hover:bg-[#5a93f5]"
              : "flex my-7 text-start cursor-pointer hover:text-[#808080]"
          }
        >
          <RiCoinsFill size={25} />
          <p className="ml-2">Buy Credits</p>
        </li>
        <li
          onClick={() => handleClick(2)}
          className={
            checkBottons[2]
              ? "flex my-7 text-start text-white bg-primary p-3 rounded-md mx-[-18px] shadow-[#9cbcf8] shadow-md cursor-pointer hover:bg-[#5a93f5]"
              : "flex my-7 text-start cursor-pointer hover:text-[#808080]"
          }
        >
          <IoIosSettings size={25} />
          <p className="ml-2">Settings</p>
        </li>
        <li className="flex my-7 text-start text-red-600 cursor-pointer hover:text-red-400">
          <MdExitToApp size={25} />
          <p className="ml-2">Log Out</p>
        </li>
      </ul>
    </div>
  );
};
