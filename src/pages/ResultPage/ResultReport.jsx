import React, { useRef, useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import branchselector_logo from '../../assets/branchselector_logo.png';
import ResultGraphComponent from './ResultGraphComponent';
import ReportGraphComponent from './ReportGraphComponent';
import { resultTextData, resultcontentdata } from '../../services/ResultContent';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCurrentUserInfo } from '../../services/userService';
import { getTestMetaData } from '../../services/testService';
import { testStaticContent } from '../../services/testData';
import OverlayLoader  from '../../Components/OverlayLoader';
import { toast } from 'react-toastify';

import { getTestStartTime } from "../../Components/Tests/TestInstruction.jsx";
import { getTestEndTime } from "../../Components/Tests/NextPrevSec.jsx";

const TestReport = () => {

  //Page where the test result converted into a PDF. IDK how exactly it works. ChatGPT Magic.

  const getTestTime = () => {
    let testStartTime = getTestStartTime();
    let testEndTime = getTestEndTime();
    const toSeconds = (time) => {
      const [hours, minutes, seconds] = time.split(":").map(Number);
      return hours * 3600 + minutes * 60 + seconds;
    };

    let startSeconds = toSeconds(testStartTime);
    let endSeconds = toSeconds(testEndTime);
    let diffSeconds = endSeconds - startSeconds;

    // Convert back to MM:SS
    let minutes = Math.floor(diffSeconds / 60);
    let seconds = diffSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  const pointsPerPage = {
    engineering:7,
    iq:7,
    vark:7,
    brain:7,
    stream:7,
    strength:7,
    interest:5,
    personality:7,
    english:7,
    eq:7,
    study:5,
    career:4,
    time:7,
    motivation:7,
    creativity:7,
    medical:7,
    decision:2,
    future:2,
    entrepreneur:2,
    social:2,
    board:1
  }

  const location = useLocation()
  const state = location.state

  const navigate = useNavigate()

  const testName = state.testName
  const result = state.result
  const dateTaken = state.dateTaken
  const testMetaData = getTestMetaData(testName)
  const testContent = testStaticContent[testName]

  const [isLoading, setIsLoading] = useState(true)

  const [pageRefs, setPageRefs] = useState([]);
  const [userDetails,setUserDetails] = useState(null)
  const [scale, setScale] = useState(1);
  const [timerStarted, setTimerStarted] = useState(false);
  const [isPdfGenerated, setPdfGenerated] = useState(false)

  useEffect(() => {
    const updateScale = () => {
      if (pageRefs[0] && pageRefs[0].current) {
        const containerWidth = pageRefs[0].current.offsetWidth;
        const newScale = containerWidth / 595; // 595px is roughly A4 width
        setScale(newScale);
      }
    };

    const fetchUserDetails = async () =>{
      const user = await getCurrentUserInfo()
      setUserDetails(user)
      setIsLoading(false)
      
    }

    fetchUserDetails()
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [pageRefs]);

  useEffect(() => {
    let timer;
    if (userDetails && !isLoading) {
      setTimerStarted(true);
      generatePDF();
      timer = setTimeout(() => {
        toast.success("Generated Report Sucessfully!")
        navigate('/result',{state:state})
      }, 3000); // 5 seconds
    }

    return () => {
      if (timer) clearTimeout(timer); // Cleanup the timer
    };
  }, [userDetails, isLoading]);

  useEffect(() => {
    const totalPages = calculateTotalPages();
    setPageRefs(Array(totalPages).fill(0).map(() => React.createRef()));
  }, []);

  const calculateTotalPages = () => {
    const contentLength = Object.keys(resultcontentdata[testName]).length;
    const itemsPerPage = pointsPerPage[testName];
    return 2 + Math.ceil(contentLength / itemsPerPage); // 2 initial pages + content pages
  };

  const generatePDF = async () => {

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [595, 842] // A4 size in pixels at 72 DPI
    });

    const generatePage = async (ref) => {
      const report = ref.current;
      const scaleFactor = 2;

      const canvas = await html2canvas(report, {
        scale: scaleFactor,
        useCORS: true,
        logging: false,
        letterRendering: true,
      });

      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      return { imgData, pdfWidth, pdfHeight };
    };

    for (let i = 0; i < pageRefs.length; i++) {
      if (i > 0) pdf.addPage();
      const page = await generatePage(pageRefs[i]);
      pdf.addImage(page.imgData, 'JPEG', 0, 0, page.pdfWidth, page.pdfHeight, '', 'FAST');
    }

    pdf.save(testMetaData.name.toUpperCase() + '-Report.pdf');

  };


  const ReportFrontPage = ({ refProp }) => (
    <div 
      ref={refProp} 
      style={{
        width: '595px',
        height: '842px',
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
      }}
      className="bg-[#367AF3] shadow-lg overflow-hidden"
    >
      <div className="p-12 bg-white rounded-3xl h-[92%] mt-8 shadow-md">
        <div className="flex items-center mb-8">
          <img src={branchselector_logo} width={50} alt="BranchSelector Logo" />
          <span className="text-xl font-bold text-blue-500 -mt-5">BranchSelector</span>
        </div>

<h1 className="text-4xl font-bold mb-36 mt-64">{String(testMetaData.name).toUpperCase()} REPORT</h1>

        <div className="space-y-1">
          <div>
            <p className="text-blue-500 font-bold text-xs">Username</p>
            <p className=" text-md">{userDetails.displayName}</p>
          </div>
          <div>
            <p className="text-blue-500 font-bold text-xs">Email</p>
            <p className="text-md">{userDetails.email}</p>
          </div>
          <div>
            <p className="text-blue-500 font-bold text-xs">Date Taken</p>
            <p className=" text-md">{dateTaken}</p>
          </div>
          <div>
            <p className="text-blue-500 font-bold text-xs">Time Taken</p>
            <p className=" text-md">{getTestTime()}</p>
          </div>
        </div>
      </div>
      <div className="px-12 py-6"></div>
    </div>
  );

  const ReportPageTwo = ({ refProp }) => (
    <div 
      ref={refProp} 
      style={{
        width: '595px',
        height: '842px',
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
      }}
      className="bg-[#367AF3] shadow-lg overflow-hidden"
    >
      <div className="p-12 bg-white rounded-3xl h-[92%] mt-8 shadow-md">
        <div className='flex-col'>
          <p className='font-bold text-[#367AF3] text-sm'>What is the {testMetaData.name}?</p>
          <span className='text-sm '>{testContent.description}
          </span>

          {
          testName !=='engineering'&&
          <>
          <p className='mt-5 font-bold text-[#367AF3] text-sm'>How is the {testMetaData.name} useful?</p>
          <span className='text-sm'>{testContent.motive}
          </span>
          </>
          }

          <p className='mt-5 font-bold text-[#367AF3] text-sm'>Your Test Results</p>
          <span className='text-sm'>{resultTextData[testName].text} <span className='font-bold'>        
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
              testMetaData['evaluationType'] == 'single-option'?
              (
                testName === 'english'?result.grade: (testName ==='iq'?result.iq:testObject.values(result)[0])
              ):
              (        
              testMetaData.evaluationType === 'ranged-score'?result.level:Object.keys(result)[0]
              )
            )
        }
        </span>
          </span>

          <p className='mt-5 font-bold text-[#367AF3] text-sm'>Your Results Breakdown</p>
          <ReportGraphComponent
            className='w-full h-5'
            testname={testName}
            result={
              testName === 'english'
                ? (({ 'Correct Answers': correctAnswers, 'Wrong Answers': wrongAnswers }) => ({ 'Correct Answers': correctAnswers, 'Wrong Answers': wrongAnswers }))(result)
                : result
            }
          />
        </div>
      </div>
      <div className="px-12 py-6"></div>
    </div>
  );

  const ContentPage = ({refProp, content}) => (
    <div 
      ref={refProp} 
      style={{
        width: '595px',
        height: '842px',
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
      }}
      className="bg-[#367AF3] shadow-lg overflow-hidden"
    >
      <div className="p-12 bg-white rounded-3xl h-[92%] mt-8 shadow-md font-normal">
        <p className='mt-5 font-bold text-[#367AF3] text-sm mb-3'>What do these results mean?</p>
        {content.map(([key, value]) => (
          <div key={key} className="mb-2 mt-6">
            <h2 className="font-semibold text-xs">{key + ":"}</h2>
            <p className='text-xs'>{value}</p>
          </div>
        ))}
      </div>
      <div className="px-12 py-6"></div>
    </div>
  );

  const contentPages = () => {
    const content = Object.entries(resultcontentdata[testName]);
    const itemsPerPage = pointsPerPage[testName];
    const pages = [];
    
    for (let i = 0; i < content.length; i += itemsPerPage) {
      pages.push(
        <ContentPage 
          key={i / itemsPerPage + 3}
          refProp={pageRefs[i / itemsPerPage + 2]}
          pageNumber={i / itemsPerPage + 3}
          content={content.slice(i, i + itemsPerPage)}
        />
      );
    }
    
    return pages;
  };

  return (
    <>
      <OverlayLoader isLoading={true} loadingText={"Generating Report... Please Wait"}/>
      {

      !isLoading?
      <div id="test-report" className="max-w-xl mx-auto overflow-hidden md:max-w-2xl m-4 font-poppins">
        <ReportFrontPage 
          refProp={pageRefs[0]}
          pageNumber={1}
          username="Anish U"
          email="anish98821@hotmail.com"
          testTaken="Interest Test"
          dateTaken="27th June 2024"
        />
        
        <ReportPageTwo
          refProp={pageRefs[1]}
          pageNumber={2}
        />

        {contentPages()}
      </div>:<div>LOADING</div>
      }
    </>
  );
};

export { TestReport };