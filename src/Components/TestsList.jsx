import { useNavigate } from "react-router-dom";
import Graduation from "../assets/TestList/graduation.svg";
import { testMetaData } from "../services/testData";


const TestsList = () => {
  const navigate = useNavigate();
  setTimeout(() => {}, 100);

  return (
    <section className="  mx-auto  max-w-screen-2xl mb-10">
      <div className="flex flex-col md:flex-row bg-dimBlue   items-center justify-center md:gap-2 lg:gap-44 ">
        <div className="items-center flex justify-center align-middle">
          <h1 className="text-xl md:text-2xl font-semibold text-center md:text-left md:w-96 mt-5 md:mt-0 text-gray-700 ">
          Unlock Your Potential with our wide range of AI powered tests.
          </h1>
        </div>

        <img src={Graduation} alt="Graduation" className="h-32 xl:h-52" />
      </div>

      <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:mx-16  ">
        {Object.values(testMetaData).map((test) =>
        { 
          const TestIcon = test.icon
          //Removing icon attribute from the test object. 
          // We cannot pass "icon" to the next page as it throws an error
          const { icon, ...testState } = test;

          return (
          <div
            key={test.queryCode}
            className=" max-w-80 md:max-w-60 mx-auto shadow-md border rounded-md duration-300 hover:shadow-sm py-4 mb-4"
          >
            <div className="flex flex-col items-center justify-center gap-4">
              <h2 className="font-bold text-blue-600">{test.name}</h2>
              <TestIcon className="size-10 text-gray-700" />
              <p className="text-center text-xs font-medium text-gray-500 px-8">
                {test.description}
              </p>
              <button
                onClick={() => {
                  navigate("/testInstruction", {
                    state: { testMetaData: testState },
                  });
                }}
                className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-10 rounded focus:outline-none focus:shadow-outline transform transition duration-150 ease-in-out"
              >
                Take test
              </button>
            </div>
          </div>
        )
        })}
      </div>
    </section>
  );
};

export { TestsList };
