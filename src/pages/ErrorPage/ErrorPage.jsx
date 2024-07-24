import React from "react";
import ErrorTree from "../../assets/tree.svg";
import { FaArrowLeft, FaBackspace } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <section className="flex flex-col justify-center items-center font-poppins my-4   mx-4 text-center">
      <img src={ErrorTree} alt="404 error" className="block w-96 my-4" />
      <h1 className="text-primary text-4xl font-black  ">OOPS!</h1>
      <p className="my-3">
        The page you were looking for, does not exist or has been moved
      </p>
      <h2 className="text-2xl font-semibold mt-2">404</h2>
      <span className="text-gray-500 mb-8">Page not found</span>

      <div className="mb-10 flex " href='/'>
      <FaArrowLeft color="367af3" className="mr-2 mt-1"/>
      <a href='/' className="text-lg font-bold text-[#367af3]">Go to home page</a>
      </div>
    </section>
  );
};

export default ErrorPage;
