import { resultTextData } from "../../services/ResultContent";
import { getTestMetaData } from "../../services/testService";

const EngineeringResultListComponent = ({result}) =>{
Object.keys(result).map((index,value)=>{



})
}


const ResultTextComponent = ({testName, result}) => {

  const testMetadata = getTestMetaData(testName);

    return (
        
  <div className="rounded-lg bg-white shadow-md lg:w-[40%] p-5 flex flex-col h-auto">
      <div className="text-[18px]">
        {resultTextData[testName].text}
      </div>
      <div className="text-[#2D6FEF] font-bold text-[18px] mt-2 flex-grow">
        {testName === 'engineering' ? (
          <div>
            {Object.keys(result).map((key, index) => (
              <div key={index}>
                {index + 1}) {key}
              </div>
            ))}
          </div>
        ) : (
          testMetadata['evaluationType'] == 'single-option'?
          (
          <div className="text-[40px]">
          {testName == 'english'?result.grade:Object.values(result)[0]}
          </div>
          ):
          (
          <div className="text-[30px]">
          {Object.keys(result)[0]}
          </div>
          )
        )}
      </div>
    </div>

    )

}


export default ResultTextComponent;