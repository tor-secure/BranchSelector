import React, { useEffect, useState } from "react";
import { RiCoinsFill } from "react-icons/ri";
import { IoIosSettings } from "react-icons/io";
import { MdExitToApp } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { getCurrentUser, logout } from "../../services/authService";
import "./BreathingAnimation.css";
import { BiSolidCoupon } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const LeftSection = ({ setSelectedPage }) => {
  const [checkBottons, setCheckBottons] = useState([true, false, false]);
  const [userData, serUserData] = useState({});
  const [isFixed, setIsFixed] = useState(true); // State to track if the div should be fixed

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTestHistory() {
      const testUserData = await getCurrentUser();
      console.log("UserData:", testUserData);
      serUserData(testUserData);
    }

    fetchTestHistory();
  }, []);

  const handleClick = (pos, selectedOpt) => {
    // console.log("In");
    setSelectedPage(selectedOpt);
    const temp = [...checkBottons];
    temp.fill(false);
    temp[pos] = true;
    setCheckBottons(temp);
  };
  //mt-[${1000000}em]
  return (
    <aside className="w-full lg:flex lg:h-screen lg:w-[18em] bg-white shadow-2xl p-7 md:pb-3 pb-0 lg:flex-col items-center lg:sticky lg:top-10 bg-gradient-to-b from-[#CBE1F6] to-[#e9f3fc] lg:bg-white lg:from-[#ffffff]">
      <div className="w-full flex row:flex-row lg:flex-col justify-center items-center mt-10 lg:mt-0">
        <img
          src={userData.photoURL}
          className="rounded-full size-[25%] max-w-[200px] lg:size-28"
          alt="User Profile"
        ></img>
        <div className="flex flex-col lg:items-center lg:justify-center ml-[10%] mt-0 lg:mt-6 lg:ml-0 font-poppins">
          <span className="lg:hidden font-bold text-sm text-gray-700 mb-3">
          Welcome,  
          <br/>
          
          </span>
        <h3 className="font-extrabold lg:text-xl text-xl">{userData.displayName}</h3>
        <p className="text-gray-600 text-sm overflow-clip max-w-56">{userData.email}</p>
        </div>
      </div>
      <div className="flex flex-col justify-items-center items-center pb-10 lg:pb-0 ">
      <ul className="font-bold text-sm lg:text-base text-[#595959] mt-0 lg:mt-12 w-full flex lg:block justify-center">
        <li
          onClick={() => handleClick(0, "Your Data")}
          className={`p-3 rounded-md mx-1 lg:w-48 ${
            checkBottons[0]
              ? "flex my-7 text-start bg-primary text-white shadow-[#9cbcf8] shadow-md cursor-pointer hover:bg-[#5a93f5]"
              : "flex my-7 text-start cursor-pointer hover:text-[#808080] bg-white"
          }`}
        >
          <FaUser size={18} className="mt-1" />
          <p className="ml-2">Your Data</p>
        </li>

        {/*<li
          onClick={() => handleClick(2, "Redeem Coupon")}
          className={`p-3 rounded-md mx-1  lg:w-48 ${
            checkBottons[2]
              ? "flex my-7 text-start bg-primary text-white shadow-[#9cbcf8] shadow-md cursor-pointer hover:bg-[#5a93f5]"
              : "flex my-7 text-start cursor-pointer hover:text-[#808080] bg-white"
          }`}
        >
          <BiSolidCoupon size={25} />
          <p className="ml-2">Redeem Coupon</p>
        </li>*/}

        {/*<li

          onClick={() => handleClick(1, "Buy Credits")}
          className={`p-3 rounded-md mx-1  lg:w-48 ${
            checkBottons[1]
              ? "flex my-7 text-start bg-primary text-white shadow-[#9cbcf8] shadow-md cursor-pointer hover:bg-[#5a93f5]"
              : "flex my-7 text-start cursor-pointer hover:text-[#808080] bg-white"
          }`}
        >
          <RiCoinsFill size={25} />
          <p className="ml-2">Buy Credits</p>
        </li>*/}
        
        {
          <li
            onClick={() => handleClick(1, "Add Credits")}
            className={`p-3 rounded-md mx-1 lg:mb-5 lg:w-48 ${
              checkBottons[1]
                ? "flex my-7 text-start bg-primary text-white shadow-[#9cbcf8] shadow-md cursor-pointer hover:bg-[#5a93f5]"
                : "flex my-7 text-start cursor-pointer hover:text-[#808080] bg-white"
            }`}
          >
            <RiCoinsFill size={25} />
            <p className="ml-2">Add Credits</p>
          </li>
        }

        {/*
        <li
          onClick={() => handleClick(2, "Settings")}
          className={`p-3 rounded-md mx-1 w-32 lg:w-48 ${
            checkBottons[2]
              ? "flex my-7 text-start bg-primary text-white shadow-[#9cbcf8] shadow-md cursor-pointer hover:bg-[#5a93f5]"
              : "flex my-7 text-start cursor-pointer hover:text-[#808080] bg-white"
          }`}
        >
          <IoIosSettings size={25} />
          <p className="ml-2">Settings</p>
        </li>*/}
        

      </ul>
          
        <div
          className="border-red-600 justify-self-center p-3 flex font-sans font-bold mx-1 w-32 lg:w-48 text-start text-red-600 cursor-pointer hover:text-red-400 bg-white rounded-md"
          onClick={() => {
            navigate("/");
            toast.success("Logged out sucessfully!");
            logout();
          }}
        >
          <MdExitToApp size={25} />
          <p className="ml-2">Log Out</p>
          {/* setAlignment defined in BreathingAnimation.css*/}
        </div>
        </div>
    </aside>
  );
};

export default LeftSection;
