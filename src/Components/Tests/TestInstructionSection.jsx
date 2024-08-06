import ExampleImg from "./../../assets/ExampleTestImg.png";
import Navigation from "./../../assets/Navigation.png";

//Test instructions for regular MCQ questions.
export const TestInstructionSection = ({ evaluationType }) => {
  return (
    <div className=" p-3 flex justify-center w-full md:w-[50%]">
      <div>
        <p>- This is a multiple choice quiz.</p>

        <img
          className="my-4 h-[6em] md:h-[12em]"
          src={ExampleImg}
          alt="loading"
        ></img>
        <p className="mb-4">
          - Select the option which you feel is the most appropriate to you.
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
