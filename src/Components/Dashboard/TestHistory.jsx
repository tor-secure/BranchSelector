import { testMetaData } from "../../services/testService";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useState } from "react";

export const TestHistory = ({ testHistory }) => {
  const navigate = useNavigate();
  const [expandedTests, setExpandedTests] = useState({});

  const groupTestsByName = (tests) => {
    const grouped = {};
    tests.forEach(test => {
      if (!grouped[test['test-name']]) {
        grouped[test['test-name']] = [];
      }
      grouped[test['test-name']].push(test);
    });
    return Object.entries(grouped).map(([testName, group]) => ({
      testName,
      tests: group.sort((a, b) => new Date(b.time) - new Date(a.time))
    }));
  };

  const groupedTests = groupTestsByName(testHistory);

  const toggleExpand = (testName) => {
    setExpandedTests(prev => ({...prev, [testName]: !prev[testName]}));
  };

  const formatDate = (dateString) => {
    // First, check if the dateString is in the format "DD/MM/YY, HH:MM PM"
    const regex = /^(\d{2})\/(\d{2})\/(\d{2}), (\d{2}):(\d{2}) (AM|PM)$/;
    const match = dateString.match(regex);
    
    if (match) {
      // If it matches, parse it manually
      const [, day, month, year, hour, minute, ampm] = match;
      let parsedHour = parseInt(hour);
      if (ampm === 'PM' && parsedHour !== 12) {
        parsedHour += 12;
      } else if (ampm === 'AM' && parsedHour === 12) {
        parsedHour = 0;
      }
      const date = new Date(
        2000 + parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parsedHour,
        parseInt(minute)
      );
      return date.toLocaleString('en-GB', { 
        day: '2-digit', 
        month: '2-digit', 
        year: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }).replace(',', '');
    } else {
      // If it doesn't match, try parsing it as a regular date string
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        console.error("Invalid date:", dateString);
        return dateString; // Return the original string if parsing fails
      }
      return date.toLocaleString('en-GB', { 
        day: '2-digit', 
        month: '2-digit', 
        year: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }).replace(',', '');
    }
  };

  const handleViewResult = (test) => {
    navigate('/result', {
      state: { 
        result: JSON.parse(test.result),
        dateTaken: test.time,
        testName: test['test-name']
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Test History</h2>
      {testHistory.length > 0 ? (
        <div className="space-y-6">
          {groupedTests.map(({ testName, tests }) => {
            const latestTest = tests[0];
            const TestIcon = testMetaData[testName].icon;
            const isExpanded = expandedTests[testName];

            return (
              <div key={testName} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50">
                  <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                    <TestIcon className="text-gray-700 w-10 h-10" />
                    <div>
                      <h3 className="font-semibold text-lg">{testMetaData[testName].name}</h3>
                      <p className="text-sm text-gray-600">Latest attempt: {formatDate(latestTest.time)}</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                    <button
                      onClick={() => {
                        const { icon, ...testState } = testMetaData[testName];
                        navigate("/testInstruction", { state: { testMetaData: testState } });
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300 w-full sm:w-auto"
                    >
                      Retest
                    </button>
                    <button 
                      onClick={() => handleViewResult(latestTest)}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-300 w-full sm:w-auto"
                    >
                      View Latest Result
                    </button>
                  </div>
                </div>
                {tests.length > 1 && (
                  <div className="border-t border-gray-200">
                    <button
                      className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50 transition duration-300"
                      onClick={() => toggleExpand(testName)}
                    >
                      <span className="font-medium">Previous Attempts</span>
                      {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                    {isExpanded && (
                      <div className="p-4 space-y-2">
                        {tests.slice(1).map((test, index) => (
                          <div key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 border-b border-gray-100 last:border-b-0">
                            <span className="font-bold mb-2 sm:mb-0 text-md text-black">Attempt {tests.length - index - 1}: </span>
                            <span className="text-gray-600 mb-2 sm:mb-0 text-md font-bold">{formatDate(test.time)}</span>
                            <button
                              onClick={() => handleViewResult(test)}
                              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-300 w-full sm:w-auto"
                            >
                              View Result
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold mb-4">No tests taken yet</h3>
          <button 
            onClick={() => navigate('/tests')}
            className="px-6 py-2 bg-[#367af3] text-white rounded hover:bg-blue-700 transition duration-300"
          >
            Go to tests
          </button>
        </div>
      )}
    </div>
  );
};
