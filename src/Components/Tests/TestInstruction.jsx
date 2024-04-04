import React from "react";
import { TestNavbar } from "./TestNavbar";
import { useLocation, useNavigate } from "react-router-dom";
import ExampleImg from "./../../assets/ExampleTestImg.png";
import Navigation from "./../../assets/Navigation.png";

export const TestInstruction = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { testMetaData } = location.state || {};
  console.log("ashshfahsfh", testMetaData);
  const heading = testMetaData.name;

  const setQuestionsRange = () => {};
  return (
    <div>
      <TestNavbar
        heading={heading}
        questionsRange={[]}
        setQuestionsRange={setQuestionsRange}
        questionsData={{}}
        result={{}}
        questionsPerPage={0}
        noOfSections={0}
        testQueryName={""}
        isInstruction={true}
      />

      <div className="mt-[10em]">
        <div className="w-full h-[20em] flex">
          <div className="w-[50%] h-full">
            <h1 className="text-center font-bold text-xl">Disclaimer</h1>
            <div className="p-7 h-full">
              <ul className="overflow-y-scroll h-full">
                <li>
                  <strong>Purpose:</strong>
                  <ul>
                    <li>
                      Branch Selector is an artificial intelligence-based tool
                      designed to assist students in exploring potential
                      engineering branches based on their answers to a specific
                      set of questions.
                    </li>
                    <li>
                      The tool aims to provide suggestions and insights to help
                      users make informed decisions about their academic and
                      career paths.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Advisory Nature:</strong>
                  <ul>
                    <li>
                      The recommendations provided by Branch Selector are purely
                      advisory in nature and should not be considered as
                      definitive or absolute.
                    </li>
                    <li>
                      The tool analyzes user responses to generate suggestions
                      but does not replace the need for personalized guidance
                      from educational professionals, career counselors, or
                      other experts.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Limitations:</strong>
                  <ul>
                    <li>
                      Branch Selector relies on the data provided by users in
                      response to the questions presented.
                    </li>
                    <li>
                      The accuracy and relevance of the suggestions are
                      dependent on the completeness and accuracy of the user's
                      responses.
                    </li>
                    <li>
                      The tool does not consider external factors, individual
                      circumstances, or changes in academic programs that may
                      occur after the tool's last update.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Not a Substitute for Professional Advice:</strong>
                  <ul>
                    <li>
                      The suggestions provided by Branch Selector are not a
                      substitute for professional advice.
                    </li>
                    <li>
                      Users are encouraged to consult with qualified
                      professionals, such as academic advisors or career
                      counselors, to receive personalized guidance based on
                      their unique situations.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Dynamic Nature of Information:</strong>
                  <ul>
                    <li>
                      The field of education and engineering is dynamic, and
                      changes may occur in academic programs, industry demands,
                      and career opportunities.
                    </li>
                    <li>
                      Branch Selector may not reflect the most current
                      information, and users are advised to verify information
                      independently.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>No Guarantee of Outcomes:</strong>
                  <ul>
                    <li>
                      The suggestions provided by Branch Selector do not
                      guarantee specific outcomes or success in selected
                      engineering branches.
                    </li>
                    <li>
                      The ultimate decision regarding academic and career
                      choices rests with the user, and individual results may
                      vary.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Use at Your Own Risk:</strong>
                  <ul>
                    <li>
                      The use of Branch Selector is at the user's own risk.
                    </li>
                    <li>
                      The tool, its developers, and affiliated parties are not
                      responsible for any decisions made by users based on the
                      suggestions provided.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Acknowledgement:</strong>
                  <ul>
                    <li>
                      By using Branch Selector, you acknowledge that you have
                      read, understood, and agreed to this disclaimer.
                    </li>
                    <li>
                      If you do not agree with any part of this disclaimer, we
                      advise against using the tool.
                    </li>
                  </ul>
                </li>
              </ul>

              <p className="mt-5 text-center">
                <input
                  type="checkbox"
                  id="checkbox1"
                  name="checkbox1"
                  value="value1"
                  className="mx-1"
                />
                I have read the stuffs
              </p>
            </div>
          </div>

          <div className="h-full bg-[#DBDBDB] w-[2.5px]"></div>

          <div className="w-[50%] p-3 flex justify-center">
            <div>
              <p>- This is a multiple choice quiz.</p>
              <img
                className="my-4 h-[12em]"
                src={ExampleImg}
                alt="loading"
              ></img>
              <p className="mb-4">
                - Select the option which you feel is the most appropriate to
                you.
              </p>
              <p className="font-bold mb-4">
                - Remember, there are no correct answers.
              </p>
              <p className="mb-4">
                - You can navigate the page using the navigator on top of the
                page
              </p>
              <img
                className="my-4 h-[2em]"
                src={Navigation}
                alt="loading"
              ></img>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center mt-36">
          <button
            className=" bg-[#367AF3] text-white font-semibold w-28 h-10 rounded-md hover:bg-[#689af0]"
            onClick={() => {
              navigate("/testPage", {
                state: { testMetaData: testMetaData },
              });
            }}
          >
            Begin Test
          </button>
        </div>
      </div>
    </div>
  );
};
