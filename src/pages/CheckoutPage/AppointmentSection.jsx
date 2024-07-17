import Navbar from "../Components/Navbar/Navbar";
import SurePass from "../assets/SurePassLogo.jpeg";
import Img from "../assets/bookAppointment.svg";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";




function BookingPage() {


  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    selectedDate: "",
  });
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const handleCaptchaChange = () => {
    setCaptchaChecked(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaChecked) {
      // If ReCAPTCHA is not checked, prevent form submission
      alert("Please complete the ReCAPTCHA verification.");
      return;
    }
    try {

      const response = await fetch("https://book-appointment.branchselector.workers.dev/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful submission
        console.log("Form submitted successfully!");
        toast.success(
          "Your request has been recived. We will reach out to you shortly"
        );
        navigate("/");
      } else {
        // Handle error
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Try again later.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <main className="py-0  my-8 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:p-8">
        <div className="max-w-lg mx-auto gap-12 justify-between lg:flex lg:max-w-none lg:mr-20">
          <div className="flex flex-col p-4 md:p-1">
            <div className="max-w-lg space-y-3">
              <p className="text-gray-800 text-2xl font-bold sm:text-3xl">
                Ready to take the next step towards your future success?
              </p>
              <p>
                Our expert counselors from SurePass are here to guide you
                towards the educational courses that best align with your career
                aspirations.
              </p>
              <h3 className="text-indigo-600 font-semibold">
                Choose our Credits + Counselling bundles to save more! 🎉
              </h3>
              <div>
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
            <form onSubmit={handleSubmit} className="space-y-3 py-6 md:py-2 ">
              <p className="font-bold text-lg">Book Appointment</p>
              <div>
                <label className="font-medium text-sm text-gray-500">
                  Full name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
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
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full mt-1 px-3 py-1 text-gray-500 bg-transparent outline-none border bg-white shadow-sm rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium text-sm text-gray-500">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
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
                  name="selectedDate"
                  value={formData.selectedDate}
                  onChange={handleInputChange}
                  required
                  className="w-full mt-1 px-3 py-1.5 text-gray-500 bg-transparent outline-none border bg-white shadow-sm rounded-lg"
                />
              </div>
              <div className="flex items-start justify-center sm:justify-start mx-4 md:mx-0">
                <ReCAPTCHA
                  sitekey="6Le3tq0pAAAAAIVfl381LNT7XKGE3uWsjll_g2gY"
                  onChange={handleCaptchaChange}
                  className="scale-75 fel  md:scale-110  lg:scale-90 "
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2  text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
              >
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
  );
}

export default BookingPage;
