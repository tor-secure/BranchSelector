import React, { useState, useEffect, useRef } from 'react';
import { testMetaData } from '../services/testData';
import { useNavigate } from 'react-router-dom';

const testObjects = Object.values(testMetaData);

const CasseroleSpinner = () => {
  //Just a simple spinning casserole.
  const [items] = useState([...testObjects, ...testObjects]);
  const containerRef = useRef(null);

  const navigate = useNavigate()

  useEffect(() => {
    const container = containerRef.current;
    const animation = container.animate(
      [
        { transform: 'translateX(0)' },
        { transform: `translateX(-${100 / 2}%)` }
      ],
      {
        duration: 50000,
        iterations: Infinity,
        easing: 'linear'
      }
    );

    return () => {
      animation.cancel();
    };
  }, []);

  return (
    <div className="w-full overflow-hidden py-5">
        <p className="text-center text-gray-800 font-poppins font-semibold m-5 sm:text-4xl lg:text-2xl  ">
        Our AI Powered Tests
        </p>
      <div
        ref={containerRef}
        className="flex justify-center"  // Center the container
        style={{ width: `${items.length * 260}px` }} // Adjusted width for larger cards
      >
        {items.map((test, index) => {
          const TestIcon = test.icon;

          return (
            <div
              key={index}
              className="w-64 py-10 mx-4 flex-none shadow-md border rounded-md duration-300 hover:shadow-sm cursor-pointer"
              onClick={()=>{navigate('/testlist')}}
            >
              <div className="flex flex-col items-center justify-center gap-4">
                <h2 className="font-bold text-blue-600">{test.name}</h2>
                <TestIcon className="size-10 text-gray-700" />
                <p className="text-center text-xs font-medium text-gray-500 px-8">
                  {test.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CasseroleSpinner;
