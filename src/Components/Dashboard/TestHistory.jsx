import { getTestLogo, testMetaData } from "../../services/testService";
import { BsArrowClockwise } from "react-icons/bs";
import { BsGraphUp } from "react-icons/bs";
import { BsFileBarGraphFill } from "react-icons/bs";
import { CgAlignBottom } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

export const TestHistory = ({ testHistory }) => {
  console.log("testHistory", testHistory.length, testHistory);
  const navigate = useNavigate();
  return (
    <>
      {testHistory.length > 0 ? (
        <div className="flex flex-col items-center mt-7 w-full">
          <div className="w-[80%]">
            <h2 className="text-2xl font-semibold">Test History</h2>
            {testHistory.map((test, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-[#f8f9fb] shadow-blue-200 p-6 shadow-lg w-full h-44  my-4 rounded-lg"
              >
                <div className="w-[16em]">
                  <div className="">{getTestLogo(test["test-name"], 100)}</div>
                </div>
                <div className="mt-2 font-bold text-primary text-2xl w-[40%] flex flex-col ">
                  <h3>{testMetaData[test["test-name"]].name}</h3>
                  <p className="text-sm font-medium text-black">
                    Completed on {test.time.split(",")[0]}
                  </p>
                </div>
                <div className="w-[20em] h-full p-2 flex">
                  <button
                    onClick={() => {
                      // console.log(testMetaData[test.queryCode]);
                      navigate("/testInstruction", {
                        state: {
                          testMetaData: testMetaData[test["test-name"]],
                        },
                      });
                    }}
                    className="flex flex-col justify-center items-center h-full w-[10em] shadow-blue-200 p-6 shadow-lg mx-3 bg-white py-3"
                  >
                    <BsArrowClockwise size={50} />
                    <p className="text-center text-primary font-bold mt-1">
                      Retest
                    </p>
                  </button>
                  <button className="flex flex-col justify-center items-center h-full w-[10em] shadow-blue-200 p-6 shadow-lg mx-3 bg-white py-3">
                    <CgAlignBottom size={50} />
                    <p className="text-center text-primary font-bold mt-1">
                      Results
                    </p>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center mt-7 w-full">
            <div className="w-[80%]">
              <h2 className="text-2xl font-semibold">Test History</h2>
              <div className="bg-[#e4ecff] rounded-sm my-5 h-[12em] w-full flex flex-col justify-center items-center">
                <h3 className="text-2xl font-semibold">No tests taken</h3>
                <button className="mt-2 bg-primary text-white font-semibold p-1 px-5 rounded text-sm">
                  Go to tests
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
