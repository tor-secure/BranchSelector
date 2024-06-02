import { resultTextData } from "../../services/ResultContent";

const EngineeringResultListComponent = ({result}) =>{
Object.keys(result).map((index,value)=>{



})
}


const ResultTextComponent = ({testName, result}) => {
    return (
        
  <div className="rounded-lg bg-white shadow-md w-[40%] p-5 flex flex-col h-auto">
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
          Object.keys(result)[0]
        )}
      </div>
    </div>

    )

}


export default ResultTextComponent;