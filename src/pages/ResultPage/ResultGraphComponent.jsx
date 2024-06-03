
import { Bar } from "react-chartjs-2";

const ResultGraphComponent = ({ testname, result }) => {
  return (
    <div
      className="bg-white shadow-xl shadow-md h-[70vh] lg:w-[60%]  rounded-[8px] sm:rounded-[15px] flex items-center justify-center p-2 sm:p-5"
    >
      <div className="w-full h-full">
        <Bar
          data={{
        
            labels: Object.keys(result),
            datasets: [
              {
                label: testname,
                data: Object.values(result),
                backgroundColor: "#2D6FEF",
              },
            ],
            
          }}
          options={
            {
            
            maintainAspectRatio: false,
            responsive: true,
            
          }}
        
        />
      </div>
    </div>
  );
};

export default ResultGraphComponent;


