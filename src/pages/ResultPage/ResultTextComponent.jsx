import { useNavigate } from "react-router-dom";
import { resultTextData } from "../../services/ResultContent";
import { getTestMetaData } from "../../services/testService";
import { FaAngleDoubleDown } from "react-icons/fa";

//The text that displayed below result pages.
const ResultTextComponent = ({testName, result, dateTaken}) => {

  const testMetadata = getTestMetaData(testName);

  const navigate = useNavigate()

  const downloadReportHandler = () =>{
    navigate('/result-report',{state:{testName:testName,result:result, dateTaken:dateTaken}})
  }

  return (    
  <div className="rounded-lg bg-white shadow-md lg:w-[40%] p-5 flex flex-col h-auto">
      <div className="text-[18px]">
        {resultTextData[testName].text}
      </div>
      <div className="text-[#2D6FEF] font-bold text-[18px] mt-2 flex-grow">
        {
        //Basically a long list of conditional rendering based on the type of test taken.
        }
        {
        testName === 'engineering' ? (
          <div>
            {Object.keys(result).map((key, index) => (
              <div key={index}>
                {index + 1}) {key}
              </div>
            ))}
          </div>
        ) : 
        (
          testMetadata['evaluationType'] == 'single-option'?
          (
            <div className="text-[40px]">
            {
            testName === 'english'?result.grade: (testName ==='iq'?result.iq:testObject.values(result)[0])
            }
            </div>
          ):
          (
          <div className="text-[30px]">
          {testMetadata.evaluationType === 'ranged-score'?result.level:Object.keys(result)[0]}
          </div>
          )

        )
        }
      </div>
      <div onClick={downloadReportHandler} className="bg-blue-500 text-white font-poppins py-3 font-bold rounded-md lg:mt-0 mt-20 w-full flex items-center justify-center">
<FaAngleDoubleDown size={20} className="mr-2"/>
        <span>Download Report</span>
        
      </div>
    </div>

    )

}


export default ResultTextComponent;