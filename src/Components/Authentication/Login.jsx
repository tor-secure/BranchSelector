import { GoogleLogo } from "./GoogleLogo";
import {
  loginWithEmailAndPassword,
  signInWithGoogle,
} from "../../services/authService";
import { useNavigate } from "react-router-dom";
import branchselector_logo from "../../assets/branchselector_logo.png";
import { useLocation } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const state = location.state || {};

  const fromLocation = state.from;

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const rememberMe = e.target.elements.rememberMe.checked;
    await loginWithEmailAndPassword(email, password, {
      rememberMe: rememberMe,
    });
    console.log(fromLocation.pathname);
    navigate(fromLocation.pathname);
  };

  const onClickHandler = () => {
    navigate("/signup");
  };

  const forgotPasswordHandler = () => {
    navigate("/resetPassword");
  };

  return (
    <div className="flex-1 flex items-center justify-center h-screen">
      <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
        <div className="">
          <img src={branchselector_logo} width={75} className="lg:hidden" />
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Login
            </h3>
            <p className="">
              Dont have an account?{" "}
              <a
                onClick={onClickHandler}
                className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="flex items-center justify-center py-2.5 px-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100"
            onClick={signInWithGoogle}
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
            <label className="font-medium">Email</label>
            <input
              name="email"
              type="email"
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
          <a
            onClick={forgotPasswordHandler}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer justify-center"
          >
            Forgot password?
          </a>
          <div>
            <input
              name="rememberMe"
              type="checkbox"
              className=" h-4 w-4 mr-2 mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
            <label className="font-medium">Remember me</label>
          </div>

          <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export { Login };
