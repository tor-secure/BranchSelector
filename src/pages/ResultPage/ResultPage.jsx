import React from "react";
import SideDashBoard from "../../Components/SideDashBoard/SideDashBoard";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut } from "react-chartjs-2";

const ResultsPage = () => {
  return (
    <section className="flex font-poppins  ">
      <SideDashBoard />

      <div className="bg-[#CBE1F6] w-full  ml-[20%] py-12  px-16  ">
        <div>
          <h2 className="text-4xl pb-7 font-semibold  ">IQ Test Result</h2>
          <div className="flex justify-between ">
            <div className="bg-white h-72 w-8/12  rounded-[15px] flex justify-center p-5">
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
            <div className="bg-white h-72 w-72 rounded-[15px] flex justify-center p-5">
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
          <div className="bg-white py-12 px-12 rounded-[15px] ">
            <h2 className="font-semibold text-2xl">What does this mean?</h2>
            <div className="flex flex-col space-y-8 pt-8 px-5">
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
          <div className="bg-white py-5 px-12 rounded-[10px] flex justify-between items-baseline">
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
