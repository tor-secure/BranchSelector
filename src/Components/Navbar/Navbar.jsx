import { useEffect, useRef, useState } from "react";
import branchselector_logo from "../../assets/branchselector_logo.png";
import "../../Components/Navbar/navbar.css";
import { NavLink } from "react-router-dom";

// Add this style to your css filesrc\assets\branchselector_logo.png

const Navbar = () => {
  const [state, setState] = useState(false);
  const navRef = useRef();

  // Replace javascript:void(0) path with your path
  const navigation = [
    { title: "Tests", path: "/testList" },
    { title: "Partners", path: "" },
    { title: "E-Book", path: "/ebook" },
    { title: "Blog", path: "/Blog" },
    { title: "Appointment", path: "/booking" },
  ];

  useEffect(() => {
    const body = document.body;

    // Disable scrolling
    const customBodyStyle = ["overflow-hidden", "lg:overflow-visible"];
    if (state) body.classList.add(...customBodyStyle);
    // Enable scrolling
    else body.classList.remove(...customBodyStyle);

    // Sticky strick
    const customStyle = ["sticky-nav", "fixed", "border-b"];
    window.onscroll = () => {
      if (window.scrollY > 80) navRef.current.classList.add(...customStyle);
      else navRef.current.classList.remove(...customStyle);
    };
  }, [state]);

  return (
    <nav ref={navRef} className="bg-white w-full top-0 z-20 font-poppins ">
      <div className="items-center px-4  max-w-screen-xl mx-auto md:px-8 lg:flex ">
        <div className="flex items-center justify-between  lg:block">
          <NavLink
            to="/"
            className="flex justify-center items-center text-xl font-medium  "
          >
            <img
              src={branchselector_logo}
              className=" md:w-16 w-16 "
              alt="branchselector logo"
            />
            <h2 className="hidden sm:block">BranchSelector</h2>
          </NavLink>
          <div className="lg:hidden">
            <button
              className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
              onClick={() => setState(!state)}
            >
              {state ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 justify-between flex-row-reverse lg:overflow-visible lg:flex lg:pb-0 lg:pr-0 lg:h-auto ${
            state ? "h-screen pb-20 overflow-auto pr-4" : "hidden"
          }`}
        >
          <div>
            <ul className="flex flex-col-reverse space-x-0 lg:space-x-6 lg:flex-row">
              <li className="mt-4 lg:mt-0">
                <NavLink
                  to="/login"
                  className="py-3 px-4 text-center border text-gray-600 hover:text-blue-600 rounded-md block lg:inline lg:border-0"
                  Sign
                  Up
                >
                  Login
                </NavLink>
              </li>
              <li className="mt-8 lg:mt-0">
                <NavLink
                  to="/signup"
                  className="py-3 px-4 text-center text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow block lg:inline"
                >
                  Sign Up
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <ul className="justify-center items-center space-y-8 lg:flex lg:space-x-6 lg:space-y-0">
              {navigation.map((item, idx) => {
                return (
                  <li key={idx} className="text-gray-600 hover:text-indigo-600">
                    <NavLink to={item.path}>{item.title}</NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;