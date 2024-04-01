import React, { useEffect, useState } from "react";
import SideDashBoard from "../../Components/SideDashBoard/SideDashBoard";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut } from "react-chartjs-2";
import { faL } from "@fortawesome/free-solid-svg-icons";

const ResultsPage = () => {
  const [isScreenLarge, setScreenLarge] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setScreenLarge = window.innerWidth > 768;
    };
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <section className="flex font-poppins relative ">
      <SideDashBoard className={`${!isScreenLarge && "hidden"}`} />

      <div className="relative z-20 bg-[#CBE1F6] w-[100] lg:ml-72  py-12  lg:px-16 px-5 overflow-y-hidden  ">
        <div>
          <h2 className=" text-3xl md:text-4xl pb-4 md:pb-7 font-semibold  ">
            IQ Test Result
          </h2>
          <div className="flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:justify-between lg:space-x-5 ">
            <div className="bg-white  sm:h-72 items-center xl:h-72 lg:w-8/12  rounded-[8px] sm:rounded-[15px] flex justify-center p-2 sm:p-5">
              <Bar
                data={{
                  labels: ["A", "B", "C", "D"],
                  datasets: [
                    {
                      label: "Revenue",
                      data: [100, 200, 300, 150],
                      backgroundColor: "#2D6FEF",
                    },
                  ],
                }}
              ></Bar>
            </div>
            <div className="bg-white  h-60 w-full  sm:w-60 lg:h-72 lg:w-72 rounded-[8px] sm:rounded-[15px] flex justify-center p-5">
              <Doughnut
                data={{
                  labels: ["A", "B", "C", "D"],
                  datasets: [{ label: "Revenue", data: [100, 200, 300, 150] }],
                }}
              ></Doughnut>
            </div>
          </div>
        </div>
        <div className="pt-12">
          <h2 className="text-3xl font-semibold pb-7">Insights</h2>
          <div className="bg-white py-12 px-5 md:px-12 rounded-[15px] ">
            <h2 className="font-semibold text-2xl">What does this mean?</h2>
            <div className="flex flex-col space-y-8 pt-8 md:px-5">
              <p>
                <h2 className="pb-2 font-semibold text-[17px]">
                  Openness to experience
                </h2>
                Individuals high in openness tend to be imaginative, creative,
                and curious about the world around them. Keywords: Creative,
                Imaginative, Curious, Unconventional, Open-minded
              </p>
              <p>
                <h2 className="pb-2 font-semibold text-[17px]">
                  Openness to experience
                </h2>
                Individuals high in openness tend to be imaginative, creative,
                and curious about the world around them. Keywords: Creative,
                Imaginative, Curious, Unconventional, Open-minded
              </p>
              <p>
                <h2 className="pb-2 font-semibold text-[17px]">
                  Openness to experience
                </h2>
                Individuals high in openness tend to be imaginative, creative,
                and curious about the world around them. Keywords: Creative,
                Imaginative, Curious, Unconventional, Open-minded
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="font-semibold text-2xl mb-5 ">What next?</h2>
          <div className="bg-white py-5 px-5 space-y-8 md:space-y-0 md:px-12 rounded-[10px] flex flex-col  md:flex-row  items-center md:justify-between md:items-baseline">
            <p>To talk to Dr.Ananth Prabhu, book an appointment now</p>
            <button className="bg-primary text-white text-sm p-2 rounded-[5px]">
              book an appointment
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsPage;
