import { useNavigate } from "react-router-dom";
import Graduation from "../assets/TestList/graduation.svg";
import { MdEngineering } from "react-icons/md";
import { PiBarbellFill } from "react-icons/pi";
import { RiLightbulbFlashFill } from "react-icons/ri";
import { IoEar } from "react-icons/io5";
import { BiSolidBrain } from "react-icons/bi";
import { FaTheaterMasks } from "react-icons/fa";
import { PiCertificateFill } from "react-icons/pi";
import { TbAbc } from "react-icons/tb";
import { GiPaintBrush } from "react-icons/gi";
import { testMetaData } from "../services/testService";
import { data } from "autoprefixer";

export const TestsList = () => {
  const navigate = useNavigate();

  const tests = [
    {
      queryCode: "engineering",
      name: "Engineering Test",
      icon: <MdEngineering className="size-10 text-gray-700" />,
      discription:
        "Discover which branch of engineering aligns with your interests and strengths.",
    },
    {
      queryCode: "brain",
      name: "Brain Test",
      icon: <BiSolidBrain className="size-10 text-gray-700" />,
      discription:
        "Explore your cognitive strengths and discover your dominant brain hemisphere.",
    },
    {
      queryCode: "interest",
      name: "Interest Test",
      icon: <GiPaintBrush className="size-10 text-gray-700" />,
      discription:
        "Uncover your passions and interests to guide your career and personal pursuits.",
    },
    {
      queryCode: "iq",
      name: "IQ Test",
      icon: <RiLightbulbFlashFill className="size-10 text-gray-700" />,
      discription:
        "Measure your cognitive abilities and explore your intellectual potential.",
    },
    {
      queryCode: "personality",
      name: "Personality Test",
      icon: <FaTheaterMasks className="size-10 text-gray-700" />,
      discription:
        "Gain insights into your personality traits and behaviors to better understand yourself.",
    },
    {
      queryCode: "stream",
      name: "Stream Test",
      icon: <PiCertificateFill className="size-10 text-gray-700" />,
      discription:
        "Determine the ideal academic stream science, arts,or commerce for your future path.",
    },
    {
      queryCode: "strength",
      name: "Strength Test",
      icon: <PiBarbellFill className="size-10 text-gray-700" />,
      discription:
        "Identify your unique strengths and talents to maximize your potential.",
    },
    {
      queryCode: "vark",
      name: "VARK Test",
      icon: <IoEar className="size-10 text-gray-700" />,
      discription:
        "Discover your preferred learning style to enhance your study strategies.",
    },
    {
      queryCode: "english",
      name: "English Test",
      icon: <TbAbc className="size-10 text-gray-700" />,
      discription:
        "Test your English proficiency to enhance your language skills and communication abilities",
    },
  ];

  return (
    <section className="  mx-auto  max-w-screen-2xl ">
      <div className="flex flex-col md:flex-row bg-dimBlue   items-center justify-center md:gap-2 lg:gap-44 ">
        <div className="items-center flex justify-center align-middle">
          <h1 className="text-xl md:text-2xl font-semibold text-center md:text-left md:w-96 mt-5 md:mt-0 text-gray-700 ">
            Unlock Your Potential with our wide range of tests.
          </h1>
        </div>

        <img src={Graduation} alt="Graduation" className="h-32 xl:h-52" />
      </div>

      <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:mx-16  ">
        {tests.map((test) => (
          <div
            key={test.queryCode}
            className=" max-w-80 md:max-w-60 mx-auto shadow-md border rounded-md duration-300 hover:shadow-sm py-4 mb-4"
          >
            <div className="flex flex-col items-center justify-center gap-4">
              <h2 className="font-bold text-blue-600">{test.name}</h2>
              {test.icon}
              <p className="text-center text-xs font-medium text-gray-500 px-8">
                {test.discription}
              </p>
              <button
                onClick={() => {
                  navigate("/testInstruction", {
                    state: { testMetaData: testMetaData[test.queryCode] },
                  });
                }}
                className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-10 rounded focus:outline-none focus:shadow-outline transform transition duration-150 ease-in-out"
              >
                Take test
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
