import React, { useEffect, useState } from "react";

import { FaHome, FaListUl, FaUser } from "react-icons/fa";
import "../../Components/Dashboard/BreathingAnimation.css";
import { useNavigate } from "react-router-dom";
import { getCurrentUserInfo } from "../../services/userService";

export const ResultSidebar = ({ setSelectedPage }) => {
  const [checkBottons, setCheckBottons] = useState([true, false, false, false]);
  const [userData, serUserData] = useState({});

const navigate = useNavigate();
  useEffect(() => {
    async function fetchTestHistory() {
      const testUserData = await getCurrentUserInfo();
      serUserData(testUserData);
    }

    fetchTestHistory();
  }, []);

  const handleClick = (pos, selectedOpt) => {
    if (selectedOpt == 'home')
    navigate('/')
    else if(selectedOpt == 'dashboard')
    navigate('/dashboard')
    else if(selectedOpt == 'list')
    navigate('/testlist')
  };
  return (
    <div className="w-full hidden lg:flex lg:h-screen lg:w-[18em] bg-white shadow-2xl p-7 lg:flex-col items-center lg:sticky lg:top-10 bg-gradient-to-b from-[#CBE1F6] to-[#e9f3fc] lg:bg-white lg:from-[#ffffff] " >
      <div className="w-full flex flex-col justify-center items-center mt-10 lg:mt-0">
        <img
          src={userData.authProvider == 'google' ? userData.photoUrl : "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"}
          className="rounded-full size-40 lg:size-28"
          alt="User Profile"
        ></img>
        <h3 className="font-bold text-xl mt-7">{userData.displayName}</h3>
        <p>{userData.email}</p>
      </div>
      <ul className="font-bold text-sm lg:text-base text-[#595959] mt-12 w-full flex lg:block justify-between flex-wrap">
        <li
          onClick={() => handleClick(0, "dashboard")}
          className={`p-3 rounded-md mx-1 w-32 lg:w-48 ${
            checkBottons[0]
              ? "flex my-7 text-start bg-primary text-white shadow-[#9cbcf8] shadow-md cursor-pointer hover:bg-[#5a93f5]"
              : "flex my-7 text-start cursor-pointer hover:text-[#808080] bg-white"
          }`}
        >
          <FaUser size={18} className="mt-1" />
          <p className="ml-2">View dashboard</p>
        </li>
        <li
          onClick={() => handleClick(1, "list")}
          className={`p-3 rounded-md mx-1  lg:w-48 ${
            checkBottons[1]
              ? "flex my-7 text-start bg-primary text-white shadow-[#9cbcf8] shadow-md cursor-pointer hover:bg-[#5a93f5]"
              : "flex my-7 text-start cursor-pointer hover:text-[#808080] bg-white"
          }`}
        >
        
          <FaListUl size={25} />
          <p className="ml-2">View other tests</p>
        </li>
        <li
          onClick={() => handleClick(2, "home")}
          className={`p-3 rounded-md mx-1 w-32 lg:w-48 ${
            checkBottons[2]
              ? "flex my-7 text-start bg-primary text-white shadow-[#9cbcf8] shadow-md cursor-pointer hover:bg-[#5a93f5]"
              : "flex my-7 text-start cursor-pointer hover:text-[#808080] bg-white"
          }`}
        >
          <FaHome size={25} />
          <p className="ml-2">Go to home page</p>
        </li>

      </ul>
    </div>
  );
};

export default ResultSidebar;
