
const OverlayLoader = ({ isLoading,loadingText }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg text-center">
        {/* You can add any loader animation here */}
        {loadingText}
      </div>
    </div>
  );
};

export default OverlayLoader;