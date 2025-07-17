import React, { useEffect, useState } from 'react';
import { getProject } from './utils/saveProject';

const Viewers = () => {
  const [viewers, setViewers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const filteredViewers = viewers.filter(viewer => {
    const name = viewer.viewerId?.username?.toLowerCase() || '';
    const email = viewer.viewerId?.email?.toLowerCase() || '';
    const term = searchTerm.toLowerCase();
    return name.includes(term) || email.includes(term);
  });

  useEffect(() => {
    const fetchViewers = async () => {
      setLoading(true);
      try {
        const res = await getProject(`remember/get-another-user`);
        if (res.ok && res.result) {
          setViewers(res.result.viewers);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchViewers();
  }, []);

  const renderWatchTime = (seconds) => {
    return seconds >= 60 ? (
      <span className="flex flex-row gap-2">
        <span className="text-orange-500">{Math.floor(seconds / 60)} <span>min</span></span>
        <span className="text-sky-500">{seconds % 60} <span>sec</span></span>
      </span>
    ) : (
      <span className="text-sky-500">{seconds} <span>sec</span></span>
    );
  };

  return (
    <div className="p-2 sm:p-4 h-full w-full">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Viewers</h1>

        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search viewers..."
              className="w-full outline-none px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="text-sm text-gray-500">
            Showing {filteredViewers.length} of {viewers.length} viewers
          </div>
        </div>

        {loading ? (
          <div className='w-full flex flex-col gap-2 items-center justify-center mt-20'>
            <div className='bg-white border-5 flex items-center justify-center h-16 w-16 border-dashed rounded-full animate-spin'></div>
            <div className='capitalize text-sm'>loading viewers...</div>
          </div>
        ) : (
          <>

            <div className="grid sm:hidden gap-4">
              {filteredViewers.length > 0 ? (
                filteredViewers.map((viewer) => (
                  <div key={viewer.viewerId?._id} className="bg-white rounded-lg shadow p-4 space-y-2">
                    <div className="flex items-center gap-4">
                      <div className="bg-gray-300 border-2 border-dashed rounded-xl w-12 h-12 overflow-hidden">
                        {viewer.viewerId?.image ? (
                          <img src={viewer.viewerId.image} alt="avatar" className="w-full h-full object-cover" />
                        ) : (
                          <p className="text-wrap text-center text-[10px] text-white p-1">no profile</p>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold">{viewer.viewerId?.username}</p>
                        <p className="text-xs text-gray-500">ID: {viewer.viewerId?._id}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">Email: {viewer.viewerId?.email}</p>
                    <p className="text-sm text-gray-600">Date: {new Date(viewer.viewedAt).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-600">Time: {new Date(viewer.viewedAt).toLocaleTimeString()}</p>
                    <p className="text-sm text-gray-600 flex flex-row justify-between">Watch Time: {renderWatchTime(viewer.minutesWatched)}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-center text-gray-500">No viewers found</p>
              )}
            </div>


            <div className="hidden sm:block w-full bg-white shadow-md rounded-lg overflow-hidden">
              <div className="w-full overflow-x-auto">
                <table className="w-full bg-zinc-200 divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">View Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">View Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Watch Time</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredViewers.length > 0 ? (
                      filteredViewers.map((viewer) => (
                        <tr key={viewer.viewerId?._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="bg-gray-300 border-2 border-dashed rounded-xl w-10 h-10 overflow-hidden">
                                {viewer.viewerId?.image ? (
                                  <img src={viewer.viewerId?.image} alt="avatar" className="object-cover w-full h-full" />
                                ) : (
                                  <p className="text-wrap text-[10px] p-[2px] text-center text-white">no profile</p>
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{viewer.viewerId?.username}</div>
                                <div className="text-sm text-gray-500">
                                  ID: <span className='bg-green-400 opacity-50 px-2 rounded-xs text-white'>{viewer.viewerId?._id}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {viewer.viewerId?.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(viewer.viewedAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(viewer.viewedAt).toLocaleTimeString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {renderWatchTime(viewer.minutesWatched)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                          No viewers found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div> 
            </div>


          </>
        )}
      </div>
    </div>
  );
};

export default Viewers;
