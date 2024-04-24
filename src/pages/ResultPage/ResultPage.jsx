import React, { useEffect, useState } from "react";
import SideDashBoard from "../../Components/SideDashBoard/SideDashBoard";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut } from "react-chartjs-2";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import ProfilePic from "../../assets/profile.webp";
import { getTestMetaData } from "../../services/testService";
import { resultcontentdata } from "../../services/ResultContent";

const ResultsPage = () => {
  const location = useLocation();
  const { result, testName } = location.state || {};
  console.log(result, testName);
  const testmeta = getTestMetaData(testName);

  // console.log(testmeta.evaluationType);
  console.log(testName);

  const [isScreenLarge, setScreenLarge] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setScreenLarge(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleResize);
  }, []);
  let userName = "James";
  let userMailId = "Jamesgmail.com";

  console.log(result);
  const FirstLabel = Object.keys(result);
  console.log(FirstLabel);

  // const resultarray = Object.entries(result);

  // const slicedEngineeringData = resultarray.slice(0, 15);

  // const FirstLabel = slicedEngineeringData.map(([key]) => {
  //   return key.replace("Engineering", "E");
  // });

  // const AdjustedLabel = FirstLabel.map((label) => label.split(" "));

  // console.log(AdjustedLabel);

  return (
    <section
      className="bg-[#fffefe] "
      style={{
        background:
          "linear-gradient(143.6deg, rgba(28, 124, 252, 0) 20.79%, rgba(28, 124, 252, 0.26) 40.92%, rgba(204, 171, 238, 0) 70.35%)",
      }}
    >
      <Navbar />
      {/* <div className="bg-[#c2c2c2] h-4 "></div> */}
      <div className="flex font-poppins  relative ">
        <SideDashBoard
          className={`${!isScreenLarge && "hidden"}`}
          ProfilePic={ProfilePic}
          userName={userName}
          userMailId={userMailId}
        />
        {/* bg-[#CBE1F6] */}
        <div className="relative z-20  w-[100] lg:ml-72  py-12  lg:px-16 px-5 overflow-y-hidden border-t-4 ">
          <div>
            <h2 className=" text-3xl md:text-4xl pb-4 md:pb-7 font-semibold  ">
              {testmeta.name} Result
            </h2>
            <div className="flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:justify-between lg:space-x-5 ">
              <div className="bg-white shadow-xl shadow-[#dce7ff] sm:h-72 items-center xl:h-72 lg:w-8/12  rounded-[8px] sm:rounded-[15px] flex justify-center p-2 sm:p-5">
                <Bar
                  data={{
                    // labels: ["A", "B", "C", "D"],
                    // labels: Object.keys(engineeringData),
                    labels: FirstLabel,
                    datasets: [
                      {
                        label: testmeta.name,
                        // data: [100, 200, 300, 150],
                        data: Object.values(result),
                        backgroundColor: "#2D6FEF",
                      },
                    ],
                  }}
                ></Bar>
              </div>
              <div className="bg-white shadow-xl  shadow-[#dce7ff] h-60 w-full  sm:w-60 lg:h-72 lg:w-72 rounded-[8px] sm:rounded-[15px] flex justify-center p-5">
                <Doughnut
                  data={{
                    labels: ["A", "B", "C", "D"],
                    datasets: [
                      { label: "Revenue", data: [100, 200, 300, 150] },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: {
                        display: true,
                        labels: {
                          boxWidth: 20,
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>

          <div className="pt-12">
            <h2 className="text-3xl font-semibold pb-7">Insights</h2>
            <div className="bg-white shadow-xl  shadow-[#dce7ff] py-12 px-5 md:px-12 rounded-[15px] ">
              <h2 className="font-semibold text-2xl">What does this mean?</h2>
              <div className="flex flex-col space-y-8 pt-10 md:px-5">
                <div>
                  {Object.keys(resultcontentdata[testName]).map((key) => (
                    <div key={key} className="mb-8">
                      <h2 className="pb-2 font-semibold text-[17px]">
                        {key + ":"}
                      </h2>

                      <p> {resultcontentdata[testName][key]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="font-semibold text-2xl mb-5 ">What next?</h2>
            <div className="bg-white shadow-xl  shadow-[#dce7ff] py-5 px-5 space-y-8 md:space-y-0 md:px-12 rounded-[10px] flex flex-col  md:flex-row  items-center md:justify-between md:items-baseline">
              <p>To talk to Dr.Ananth Prabhu, book an appointment now</p>
              <button className="bg-primary text-white text-sm p-2 rounded-[5px]">
                book an appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsPage;
