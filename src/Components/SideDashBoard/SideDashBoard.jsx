import React from "react";
import ProfilePic from "../../assets/curiosity.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { homeicon } from "../../assets/Icons/home.svg";

const SideDashBoard = () => {
  let userName = "James";
  let userMailId = "Jamesgmail.com";
  return (
    <div className="flex flex-col pt-12 pb-20 items-center w-[20%]  fixed left-0 top-0 bottom-0 h-full justify-between ">
      <h2 className="text-3xl text-blue-700 font-semibold">BranchSelector</h2>

      <div className="flex flex-col items-center ">
        <img
          src={ProfilePic}
          alt="profile "
          className="h-28 w-28 rounded-full"
        />
        <h2 className="pt-5 font-semibold text-2xl">{userName}</h2>
        <h2 className="text-sm">{userMailId}</h2>
      </div>

      <div className="flex flex-col items-center pt-2 font-semibold mb-20 text-lg ">
        <ul className="space-y-5 ">
          <li className="flex items-baseline gap-2 hover:bg-primary hover:text-white ">
            <FontAwesomeIcon icon="fa-solid fa-chart-line" size="sm" />
            <h2>Dashboard</h2>
          </li>
          <li className="flex items-baseline gap-2 hover:bg-primary hover:text-white ">
            <FontAwesomeIcon icon="fa-solid fa-house " size="sm" />
            <h2>Home</h2>
          </li>
          <li className="flex items-baseline gap-1 hover:bg-primary hover:text-white ">
            <FontAwesomeIcon icon="fa-solid fa-graduation-cap" size="sm" />
            <h2>Tests</h2>
          </li>
        </ul>
      </div>
      <div className="flex flex-col items-center font-semibold text-lg ">
        <ul>
          <li className="flex items-baseline gap-2 hover:bg-primary hover:text-white ">
            <FontAwesomeIcon icon="fa-solid fa-lock" size="sm" />
            <h2>Log out</h2>
          </li>
          <li className="flex items-baseline gap-2 ml-[-2px] hover:bg-primary hover:text-white ">
            <FontAwesomeIcon icon="fa-solid fa-star" size="sm" />
            <h2>Get Premium</h2>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideDashBoard;
