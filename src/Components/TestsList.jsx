import React, { useEffect, useState } from "react";
import { testMetaData } from "../services/testService";
import { useNavigate } from "react-router-dom";

export const TestsList = () => {
  const navigate = useNavigate();
  const [testList, setTestList] = useState([]);

  useEffect(() => {
    // Convert the testMetaData object into an array of its values
    setTestList(Object.values(testMetaData));
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-10">Available Tests</h1>
      <ul className="space-y-4">
        {testList.map((test, index) => (
          <li key={index} className="flex justify-center">
            <button
              onClick={() => {
                navigate("/testInstruction", {
                  state: { testMetaData: test },
                });
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition duration-150 ease-in-out"
            >
              {test.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
