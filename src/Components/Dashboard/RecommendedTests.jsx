import { useEffect, useState } from "react";
import { getRemainingTests } from "../../services/testService";
import { getTestHistory } from "../../services/userService";

export const RecommendedTests = () => {
  const [testHistory, setTestHistory] = useState({});
  const [recommendedTests, setRecommendedTests] = useState({});

  useEffect(() => {
    async function fetchTestHistory() {
      const testHistoryTemp = await getTestHistory();
      console.log("Fetched test history:", testHistoryTemp);
      setTestHistory(testHistoryTemp);
    }

    fetchTestHistory();
  }, []);

  useEffect(() => {
    console.log("testHistory", testHistory);
    const remainingTests = getRemainingTests([]);
    console.log("Remaining tests:", remainingTests);
    setRecommendedTests(remainingTests);
  }, [testHistory]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-[80%]">
        <h3 className="text-2xl font-semibold">Recommended Tests</h3>
        <div></div>
      </div>
    </div>
  );
};
