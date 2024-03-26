import React from "react";
import { RiMessage3Fill } from "react-icons/ri";

const ContactUsFlag = () => {
  return (
    <button
      className="flex flex-col justify-center fixed  z-20  right-0 top-[68vh] 
                items-center font-poppins  font-medium text-blue-600 md:text-white  md:bg-blue-600
                px-2 py-3  md:rounded-s-xl hover:-translate-x-4  transition-all ease-in-out "
    >
      <RiMessage3Fill size={35} className="" />
      <p className="hidden md:block">Contact Us</p>
    </button>
  );
};

export default ContactUsFlag;
