import Navbar from "../Components/Navbar/Navbar";
import SurePass from "../assets/SurePassLogo.jpeg";
import Img from "../assets/bookAppointment.svg";
import ReCAPTCHA from "react-google-recaptcha";
function BookingPage() {
  const onChange = () => {};
  return (
    <div className="h-[100vh] ">
      <Navbar/>

      <main className="py-0 bg-gray-50 ">
        <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
          <div className="max-w-lg mx-auto gap-12 justify-between lg:flex lg:max-w-none lg:mr-20">
            <div className="flex flex-col p-4 md:p-1">
              <div className="max-w-lg space-y-3">
                <p className="text-gray-800 text-2xl font-bold sm:text-3xl">
                  Ready to take the next step towards your future success?
                </p>
                <p>
                  Our expert counselors from SurePass are here to guide you
                  towards the educational courses that best align with your
                  career aspirations.
                </p>
                <h3 className="text-indigo-600 font-semibold">
                  Book your appointment online to avail 25% off 🎉
                </h3>
                <div>
                  <p className="text-base font-semibold text-gray-500">
                    Price{" "}
                    <span className="text-sm font-normal text-gray-400">
                      (To be paid after completion of the session)
                    </span>
                  </p>
                  <p className="line-through text-sm text-gray-500">₹2000</p>
                  <p className="text-blue-600 text-2xl font-bold">
                    ₹1500{" "}
                    <span className="text-sm text-gray-400 font-normal">
                      /session
                    </span>
                  </p>
                </div>
              </div>

              <img
                src={Img}
                alt="illustration img"
                className="hidden md:flex w-48 ml-56 "
              />
              <div className="hidden md:block">
                <p className="font-semibold text-sm">
                  &nbsp;&nbsp;Counselling Partner,
                </p>
                <div className="flex">
                  <img src={SurePass} alt="sure pass logo" className="w-40" />
                  <p className="w-48 text-[0.6rem] py-2">
                    9, II, Manasa Tower, PVS Junction, Kodailbail, Mangaluru,
                    Karnataka 575003
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white flex-1 sm:max-w-lg lg:max-w-md shadow-lg border rounded-md duration-300 hover:shadow-sm px-6 lg:pt-2">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="space-y-3 py-6 md:py-2 "
              >
                <p className="font-bold text-lg">Book Appointment</p>
                <div>
                  <label className="font-medium text-sm text-gray-500">
                    Full name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full mt-1 px-3 py-1 text-gray-500 bg-transparent outline-none border bg-white shadow-sm rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-medium text-sm text-gray-500">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full mt-1 px-3 py-1 text-gray-500 bg-transparent outline-none border bg-white shadow-sm rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-medium text-sm text-gray-500">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full mt-1 px-3 py-1 text-gray-500 bg-transparent outline-none border bg-white shadow-sm rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-medium text-sm text-gray-500">
                    Select Date
                  </label>
                  <input
                    type="datetime-local"
                    required
                    className="w-full mt-1 px-3 py-1.5 text-gray-500 bg-transparent outline-none border bg-white shadow-sm rounded-lg"
                  />
                </div>
                {/* <div>
                  <p className="text-base font-semibold text-gray-500">
                    Price{" "}
                    <span className="text-sm font-normal text-gray-400">
                      (To be paid after completion of the session)
                    </span>
                  </p>
                  <p className="line-through text-sm text-gray-500">₹2000</p>
                  <p className="text-blue-600 text-2xl font-bold">
                    ₹1500{" "}
                    <span className="text-sm text-gray-400 font-normal">
                      /session
                    </span>
                  </p>
                  <p className="mt-3 text-xs text-center">
                    We will reach out to you to confirm the appointment date
                  </p>
                </div> */}
                <ReCAPTCHA
                  sitekey="6Le3tq0pAAAAAIVfl381LNT7XKGE3uWsjll_g2gY"
                  onChange={onChange}
                />
                <button className="w-full px-4 py-2  text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
                  Book Appointment
                </button>
                <p className="mt-3 text-xs font-medium text-center">
                  We will reach out to you to confirm the appointment date
                </p>
              </form>
            </div>
            <div className="md:hidden mt-5">
              <p className="font-bold text-sm">Counselling Partner,</p>
              <div className="flex">
                <img src={SurePass} alt="sure pass logo" className="w-40" />
                <p className="w-48 text-[0.6rem] py-2">
                  9, II, Manasa Tower, PVS Junction, Kodailbail, Mangaluru,
                  Karnataka 575003
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default BookingPage;
