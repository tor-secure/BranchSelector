import React, { useRef, useEffect } from 'react';
import Lottie from 'lottie-web';
import loading from '../assets/animation/loading.json';

const LoadingPage = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const animation = Lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: loading,
      });

      return () => animation.destroy();
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div ref={containerRef} className="w-full max-w-md h-[20rem] object-contain" />
      <p className="text-xl mb-4">Loading...</p>
    </div>
  );
};

export { LoadingPage };