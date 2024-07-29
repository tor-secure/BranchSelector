import { GoogleLogo } from "./GoogleLogo";
import {
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../services/authService";
import { useNavigate } from "react-router-dom";
import branchselector_logo from "../../assets/branchselector_logo.png";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";
import OverlayLoader from "../OverlayLoader";
import { useState } from "react";

const Signup = () => {

  const [isLoading,setIsLoading] = useState(false)

  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate("/login");
  };

const onContinueWithGoogleHandler = async () =>{
      const toastOptions = {

      position: "top-right",
      closeOnClick:true,
      delay:false

    } 
    setIsLoading(true)
    const authResult = await signInWithGoogle({rememberMe:false})
    if(authResult.success)
    {

    toast.success("Logged in successfully!", toastOptions);
    setIsLoading(false)
    navigate('/');
    }
    else{
      toast.error("Something went wrong! Try again!",toastOptions)
    }


  }

const handleGoBack = () => {
        navigate('/');
}


const onSubmitHandler = async (e) => {
  e.preventDefault();

  setIsLoading(true)

  const email = e.target.elements.email.value;
  const password = e.target.elements.password.value;
  const name = e.target.elements.name.value;
  const phone = e.target.elements.phone.value;

  try {
    const { status, message } = await registerWithEmailAndPassword(
      name,
      phone,
      email,
      password
    );

    if (status === 'success') {
      toast.success(message);
      navigate('/login');
    } else {
      toast.error(message);
    }
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    toast.error('An unexpected error occurred. Please try again later.');
  }

  setIsLoading(false)
};

  return (
    <div className="flex-1 flex lg:items-center justify-center h-screen">
      <OverlayLoader isLoading={isLoading} loadingText={"Creating Account..."}/>
      <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
        <div class="absolute top-0 left-0 items-center justify-center w-16 h-16 bg-gray-300 rounded-full ml-5 mt-5 lg:flex hidden" onClick={handleGoBack}>
        <IoClose class="text-black text-2xl" />
        </div>

        <div className="">
          <img src={branchselector_logo} width={75} className="lg:hidden" />
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Sign up
            </h3>
            <p className="">
              Already have an account?{" "}
              <a
                onClick={onClickHandler}
                className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
              >
                Login
              </a>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="flex items-center justify-center py-2.5 px-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100"
            onClick={onContinueWithGoogleHandler}
          >
            <GoogleLogo />
            Continue with Google
          </button>
        </div>
        <div className="relative">
          <span className="block w-full h-px bg-gray-300"></span>
          <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">
            Or continue with
          </p>
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await onSubmitHandler(e);
          }}
          className="space-y-5"
        >
          <div>
            <label className="font-medium">Name</label>
            <input
              name="name"
              type="text"
              minLength={2}
              title="Please enter a name with atleast 2 characters."
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Phone number</label>
            <input
              name="phone"
              type="tel"
              title="Enter a valid 10 digit phone number"
              pattern="[1-9]{1}[0-9]{9}"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
            Create account
          </button>
        </form>
      </div>
    </div>
  );
};

export { Signup };
