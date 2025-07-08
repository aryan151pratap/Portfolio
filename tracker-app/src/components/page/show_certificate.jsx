import { useState } from "react";

function Show_certificate({ current_img, setCurrent_img }) {

  const [loading, setLoading] = useState(false);

  const downloadCertificate = (url) => {
    setLoading(true);
    try{
      const link = document.createElement("a");
      link.href = url;
      link.download = "certificate.jpg"; // 👈 you can use dynamic name too
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); 
    } catch (error){
      console.log("Download failed", error);
    }
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <>
      {current_img && (
        <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center p-2">
          <div className="w-full max-w-6xl bg-white rounded-[5px] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button 
              className="absolute top-4 right-4 bg-gray-800 hover:bg-gray-700 text-white rounded-full w-10 h-10 flex items-center justify-center z-10"
              onClick={() => setCurrent_img('')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Image Section */}
            <div className="md:w-1/2 bg-gray-100 p-2 sm:p-6 md:p-6 flex items-center justify-center">
              <div className="border-4 border-white shadow-lg rounded-lg overflow-hidden">
                <img 
                  src={current_img.imageUrl} 
                  alt="Certificate" 
                  className="max-h-[100vh] w-full object-contain"
                  onError={(e) => e.target.src = '/path/to/placeholder.png'}
                />
              </div>
            </div>
            
            {/* Details Section */}
            <div className="md:w-1/2 p-6 md:overflow-y-auto">
              <div className="border-b pb-4 mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800">{current_img.title}</h1>
                    <p className="text-xl text-blue-600 font-semibold mt-1">{current_img.provider}</p>
                  </div>
                  <span className="shrink-0 bg-blue-100 text-blue-800 border-2 border-blue-700 text-sm font-medium px-2.5 py-0.5 rounded">
                    {current_img.date.split('T')[0]}
                  </span>
                </div>
                
                <div className="flex flex-row">
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="bg-green-100 text-green-800 border-b-4 border-r-2 border-green-700 text-xs font-medium px-2.5 py-1 rounded">
                      {current_img.industry}
                    </span>
                    <span className="bg-purple-100 text-purple-800 border-b-4 border-r-2 border-purple-700 text-xs font-medium px-2.5 py-1 rounded">
                      {current_img.skill}
                    </span>
                    <span className="bg-yellow-100 text-yellow-800 border-b-4 border-r-2 border-yellow-700 text-xs font-medium px-2.5 py-1 rounded">
                      {current_img.duration}
                    </span>
                  </div>
                  {current_img.paid > 0 &&
										<div className="relative p-1 mt-auto">
											<div className="absolute inset-0 left-auto w-fit h-fit rounded-full p-1 bg-green-600 animate-ping">
											</div>
											<div className="absolute inset-0 left-auto w-fit h-fit rounded-full bg-green-700 p-1"></div>
											<p className="flex gap-1 text-green-900 border-b-4 border-r-2 border-green-700 text-sm bg-green-200 px-2 rounded-sm">
												<span>₹</span> {current_img.paid}
											</p>
										</div>
										}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-700 flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                  Tools Used:
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <ul className="flex flex-wrap gap-2">
                    {current_img.tools.map((i, index) => (
                      <li className="px-2 py-1 rounded-full bg-blue-200/80 text-blue-800 text-sm sm:text-md md:text-md capitalize">
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-bold text-gray-700 flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Certificate Details
                  </h2>
                  <p className="text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-100">
                    {current_img.description}
                  </p>
                </div>
                
                <div>
                  <h2 className="text-lg font-bold text-gray-700 flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    Credentials
                  </h2>

                   <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                     
                    {current_img.credentials.split(',').map((i, index) => (
                      <p className="text-gray-600">{i}</p>
                    ))}
                    <button
                      className={`mt-3 flex items-center font-medium ${
                        loading ? "text-gray-500" : "text-blue-600 hover:text-blue-800"
                      }`}
                      onClick={() => downloadCertificate(current_img.imageUrl)}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="flex space-x-1 items-center">
                            <span className="h-2 w-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="h-2 w-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"></span>
                            <span className="ml-2 text-sm text-blue-600">Downloading...</span>
                          </span>
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path
                              fillRule="evenodd"
                              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Download Certificate
                        </>
                      )}
                    </button>
                  </div>

                </div>
                
                
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Show_certificate;