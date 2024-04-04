import ExampleImgSlider from "./../../assets/ExampleTestImgSlider.png";
import Navigation from "./../../assets/Navigation.png";

export const TestInstructionSectionSlider = ({ evaluationType }) => {
  return (
    <div className="w-[50%] p-3 flex justify-start ml-6">
      <div>
        <p>- Select the value which you feel is the most appropriate to you.</p>

        <img
          className="w-full h-[6em] my-4"
          src={ExampleImgSlider}
          alt="loading"
        ></img>
        <p className="mb-1">- The scoring is as follows :</p>
        <p className="mb-4">
          1 : Completely Disinterested <br /> 2 : Slightly Disinterested <br />3
          : Neutral <br />4 : Slightly Interested <br />5 : Very Interested.
        </p>
        {evaluationType == "single-option" ? (
          <p className="font-bold mb-4">- There is only one correct answer.</p>
        ) : (
          <p className="font-bold mb-4">
            - Remember, there are no correct answers.
          </p>
        )}
        <p className="mb-4">
          - You can navigate the page using the navigator on top of the page
        </p>
        <img className="my-4 h-[2em]" src={Navigation} alt="loading"></img>
      </div>
    </div>
  );
};
