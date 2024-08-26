
import { Bar } from "react-chartjs-2";
import { getTestMetaData } from "../../services/testService";

//Bar graph for all results
const ReportGraphComponent = ({ testname, result }) => {

  const testMetaData = getTestMetaData(testname)

  return (
    <div
      className="bg-white h-[350px] mt-6 lg:w-[100%]  rounded-[8px] sm:rounded-[15px] flex items-center justify-center p-2 sm:p-5"
    >
      <div className="w-full h-full">
        <Bar
          data={{
            // If the test a ranged-test, display both the ranges and the score scored. Else display object as is.
            labels: testMetaData.evaluationType === 'ranged-score'?
                ["Highest Score","Your Score","Lowest Score"]
                :Object.keys(result),
            datasets: [
              {
                label: testname.toUpperCase(),
                data: testMetaData.evaluationType === 'ranged-score'?{
                  "Highest Score":result.maxRange,
                  "Your Score":result.score,
                  "Lowest Score":1,
                }:Object.values(result),
                backgroundColor: "#2D6FEF",
              },
            ],
            
          }}
          options={
          {   
            maintainAspectRatio: false,
            responsive: true,
          }
        }
        />
      </div>
    </div>
  );
};

export default ReportGraphComponent;


