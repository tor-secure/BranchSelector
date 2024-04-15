import React from "react";
import { useState, useRef, useEffect } from "react";
import branchselector_logo from "../../assets/branchselector_logo.png";
import { NavLink, Link } from "react-router-dom";
import { getCurrentUser, logout } from "../../services/authService";

const ProfileDropDown = (props) => {
  const [state, setState] = useState(false);
  const profileRef = useRef();

  console.log("auth creds", props);

  const navigation = [
    { title: "Dashboard", path: "/dashboard" },
    { title: "Log out", path: "/" },
  ];

  useEffect(() => {
    const handleDropDown = (e) => {
      if (!profileRef.current.contains(e.target)) setState(false);
    };
    document.addEventListener("click", handleDropDown);
  }, []);

  return (
    <div className={`relative left-0 ${props.class}`}>
      <div className="flex items-center space-x-4">
        <button
          ref={profileRef}
          className="w-10 h-10 outline-none rounded-full ring-offset-2 ring-gray-200 ring-2 lg:focus:ring-indigo-600"
          onClick={() => setState(!state)}
        >
          <img
            src={
              props.profile.photoURL
                ? props.profile.photoURL.toString()
                : "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
            }
            className="w-full h-full rounded-full"
            alt="user profile image"
          />
        </button>
        <div className="lg:hidden">
          <span className="block">
            {props.profile.displayName
              ? props.profile.displayName.toString()
              : "User"}
          </span>
          <span className="block text-sm text-gray-500">
            {props.profile.email.toString()}
          </span>
        </div>
      </div>
      <ul
        className={`bg-white z-50 top-12 right-0 mt-5 space-y-5 lg:absolute lg:border lg:rounded-md lg:text-sm lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0 ${
          state ? "" : "lg:hidden"
        }`}
      >
        {navigation.map((item, idx) => (
          <li key={idx}>
            {item.title === "Log out" ? (
              <button
                className="block text-gray-600 lg:hover:bg-gray-50 lg:p-2.5 w-full text-left"
                onClick={logout}
              >
                {item.title}
              </button>
            ) : (
              <Link
                className="block text-gray-600 lg:hover:bg-gray-50 lg:p-2.5"
                to={item.path}
              >
                {item.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const AuthenticatedNavBar = (props) => {
  const [menuState, setMenuState] = useState(false);

  // Replace javascript:void(0) path with your path

  const [state, setState] = useState(false);
  const navRef = useRef();

  // Replace javascript:void(0) path with your path
  const navigation = [
    { title: "Tests", path: "testList" },
    { title: "Partners", path: "" },
    { title: "Ebook", path: "/ebook" },
    { title: "Blog", path: "/blog" },
    { title: "Appointment", path: "booking" },
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
      <div className="flex items-center space-x-8 justify-between  px-4   max-w-screen-xl mx-auto md:px-8">
        <div className="flex  items-center justify-center ">
          <NavLink to="/" className="flex  items-center  text-xl font-medium  ">
            <img
              src={branchselector_logo}
              className=" md:w-16 w-16 "
              alt="branchselector logo"
            />
            <h2 className="hidden sm:block ">BranchSelector</h2>
          </NavLink>
        </div>

        <div
          className={`bg-white lg:bg-inherit w-full  absolute z-20 right-0 top-16  p-4 lg:static  lg:block lg:border-none ${
            menuState ? "" : "hidden"
          }`}
        >
          <ul className="justify-center relative lg:right-12    items-start space-y-8 lg:flex lg:space-x-6 lg:space-y-0">
            {navigation.map((item, idx) => {
              return (
                <li key={idx} className="text-gray-600 hover:text-indigo-600">
                  <NavLink to={item.path}>{item.title}</NavLink>
                </li>
              );
            })}
          </ul>
          <ProfileDropDown
            class="mt-5 pt-5 border-t lg:hidden"
            profile={props.user}
          />
        </div>

        <div className=" flex items-center  space-x-2 sm:space-x-6">
          <ProfileDropDown class="hidden lg:block" profile={props.user} />

          <button
            className="outline-none p-2 text-gray-400 block lg:hidden"
            onClick={() => setMenuState(!menuState)}
          >
            {menuState ? (
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
                  d="M6 18L18 6M6 6l12 12"
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
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AuthenticatedNavBar;
