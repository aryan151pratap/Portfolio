import { useEffect, useState } from "react";
import Search from '../search';
import parallel_line from '../../image/parallel.png';
import rectangle from '../../image/rectangle.png';
import Preview from "../edit/preview";
import {saveProject, getProject, deleteProject} from '../utils/saveProject';


const colorOptions = [
  { name: 'red', bg: 'bg-red-500', text: 'text-red-100' },
  { name: 'blue', bg: 'bg-blue-500', text: 'text-blue-100' },
  { name: 'orange', bg: 'bg-orange-500', text: 'text-orange-100' },
  { name: 'yellow', bg: 'bg-yellow-500', text: 'text-yellow-100' },
  { name: 'pink', bg: 'bg-pink-500', text: 'text-pink-100' },
  { name: 'zinc', bg: 'bg-zinc-500', text: 'text-zinc-100' },
  { name: 'rose', bg: 'bg-rose-500', text: 'text-rose-100' },
  { name: 'sky', bg: 'bg-sky-500', text: 'text-sky-100' },
  { name: 'purple', bg: 'bg-purple-500', text: 'text-purple-100' },
  { name: 'indigo', bg: 'bg-indigo-500', text: 'text-indigo-100' },
  { name: 'violet', bg: 'bg-violet-500', text: 'text-violet-100' },
  { name: 'green', bg: 'bg-green-500', text: 'text-green-100' },
];

function Project({ setPublish, setOpen_skill, showEdit, userId }) {

  const [project, setProject] = useState({name: '', url: ''});

  const [project_data, setProject_data] = useState([]);

  const [website_url, setWebsite_url] = useState([]);
  
  useEffect(() => {
    const new_data = project_data
      .filter(i => i.name.length > 0)
      .map(i => i.name);
    
    setWebsite_url(new_data);
    setFilter_data(new_data);
  }, [project_data]);


  const [show_form, setShow_form] = useState(false);
  const [color, setColor] = useState(colorOptions[9]); // Default to zinc
  const [parallel, setParallel] = useState(true);
  const [filter_data, setFilter_data] = useState(website_url);

  const [selectedProject, setSelectedProject] = useState(null);
  const [name, setName] = useState(false);
  const [loading, setLoading] = useState(false);
  const [project_loading, setProject_loading] = useState(null);
  

  
  useEffect(() => {
    setLoading(true);
    const check_auth = async function(){
      try {
        const data = await getProject(`projects/project/${userId}`)
        if (data.ok) {
          setProject_data(data.result.projects);
        } 
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }

    check_auth();

  }, [])

  const handle_fetch_project = async function(i){
    setSelectedProject(null);
    try{
      setProject_loading(i);
      const res = await saveProject(`projects/current-project/${userId}`, {name: i});
      if(res.ok){
        setSelectedProject(res.result.project);
      }
    } catch (err){
      console.log(err);
    } finally{
      setProject_loading(null);
    }
  }


  
  return (
    <div className="w-full min-h-screen p-4 md:p-6">
      <div className="max-w-full mx-auto">

        <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{showEdit ? 'Your' : 'My'} Projects</h1>
              <p className="text-gray-600 mt-1">
                {website_url.length} projects • {filter_data.length} matching your search
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Theme:</label>
                <select 
                  className="bg-white border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm outline-none"
                  value={color.name}
                  onChange={(e) => {
                    const selected = colorOptions.find(opt => opt.name === e.target.value);
                    setColor(selected || colorOptions[5]);
                  }}
                >
                  {colorOptions.map(option => (
                    <option key={option.name} value={option.name}>
                      {option.name.charAt(0).toUpperCase() + option.name.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">View:</label>
                <div className="bg-white border border-gray-300 rounded-lg p-1 flex">
                  <button 
                    onClick={() => setParallel(false)}
                    className={`p-1.5 rounded-md ${!parallel ? color.bg : 'hover:bg-gray-100'}`}
                    title="Grid View"
                  >
                    <img 
                      src={rectangle} 
                      alt="Grid view" 
                      className={`h-4 w-4 ${parallel ? 'opacity-60' : 'opacity-100'}`} 
                    />
                  </button>
                  <button 
                    onClick={() => setParallel(true)}
                    className={`p-1.5 rounded-md ${parallel ? color.bg : 'hover:bg-gray-100'}`}
                    title="List View"
                  >
                    <img 
                      src={parallel_line} 
                      alt="List view" 
                      className={`h-4 w-4 ${!parallel ? 'opacity-60' : 'opacity-100'}`} 
                    />
                  </button>
                </div>

              </div>
              {showEdit &&
              <div className="ml-auto">
                <button className={`px-2 py-1 text-white rounded-sm ${color.bg} hover:bg-${color.name}-600 border-${color.name}-800 ${show_form ? "border-b-2 border-r-1" : "border-b-4 border-r-2"}`}
                onClick={() => setShow_form(true)}
                >+ Add</button>  
              </div>
              }
            </div>
          </div>

          {show_form &&
          <div className="p-2 shadow-sm rounded-sm border-1 border-zinc-200 flex flex-col justify-center gap-4 md:px-46">
            <div className={`p-2 flex flex-col gap-4 rounded-sm`}>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className={`text-${color.name}-900`}>Project Name</label>
                <input type="text" value={project.name}
                onChange={(e) => {
                  setProject({...project, name: e.target.value});
                  if(!filter_data.includes(e.target.value) && e.target.value.trim() !== ''){
                    setName(true);
                  } else {
                    setName(false);
                  }
                }}
                placeholder="Enter project name" className={`outline-none p-2 ${color.bg}/50 rounded-sm`}/>
                {(!name && project.name.trim() !== '') && 
                <div className="relative ml-auto p-1">
                  <div className="absolute z-20 top-1 right-1 p-1 rounded-full bg-red-600">
                  </div>
                  <div className="absolute z-10 top-0 right-0 p-2 rounded-full bg-red-500 animate-ping">
                  </div>
                <p className="text-red-600 px-4">Name already taken</p>
                </div>
                }
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className={`text-${color.name}-900`}>Project <span className="text-green-500">URL</span> (if available)</label>
                <input type="text" value={project.url} 
                onChange={(e) => setProject({...project, url: e.target.value})}
                placeholder="Enter project name" className={`outline-none p-2 ${color.bg}/50 rounded-sm`}/>
              </div>
              {name &&
              <div className="p-2 flex gap-4 items-center">
                <div className="flex gap-1 flex-col">
                  <label htmlFor="" className={`text-${color.name}-900 underline`}>(Optional)</label>
                  <p className={`text-${color.name}-900`}>Publish and document your project — including<span className="font-bold"> text, images, or code</span> — if you want to showcase it.</p>
                </div>
                <button className={`p-2 ${color.bg} rounded-sm ${color.text} cursor-pointer ml-auto`}
                onClick={() => {
                  setPublish(true);
                  setOpen_skill(project);
                }}
                >Publish</button>
              </div>
              }
            </div>

            <div className="flex justify-between">
              <button className={`p-2 bg-red-600 rounded-sm text-white cursor-pointer border-b-4 border-r-2 focus:border-b-2 focus:border-r-1 border-red-700`}
              onClick={() => {
                setShow_form(false);
              }}
              >Cancel</button>
            </div>
          </div>
          }


          <div className="mb-6">
            <Search data={website_url} setData={setFilter_data} />
          </div>

          {loading ?
					<div className="w-full h-full flex items-center justify-center">
						<div className="flex flex-col items-center space-y-4">
							<div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
							<p className="text-gray-700 text-lg font-medium animate-pulse">Loading, please wait…</p>
						</div>
					</div>	
					:
          <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-8">
            {filter_data.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">No projects found</h3>
                <p className="mt-1 text-gray-500">Try adjusting your search to find what you're looking for.</p>
              </div>
            ) : !parallel ? (
              // Grid View
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filter_data.map((project, index) => {
                  const isSelected = selectedProject && project === selectedProject.name;
                  return (
                    <div 
                      key={index}
                      className={`${color.bg} rounded-xl p-4 flex flex-col items-center justify-center h-32 transform transition-all duration-200 hover:scale-105 shadow-md cursor-pointer`}
                      onClick={() => {
                        const selected = project_data.find(p => p.name === project);
                        setSelectedProject(selected || null);
                        console.log(selected);
                      }}
                    >
                      <div className="bg-white/20 rounded-full p-2 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <span className={`${color.text} text-center font-medium truncate w-full`}>{project}</span>

                    </div>
                  );
                })}
            </div>
            ) : (
              // List View
            <div className="divide-y divide-gray-200">
              {filter_data.map((project, index) => {
                  return (
                    <div 
                      key={index} 
                      className="py-4 sm:px-4 md:px-4 flex flex-col hover:bg-gray-50 rounded-lg transition-colors duration-200 cursor-pointer group"
                      onClick={() => handle_fetch_project(project)}                  
                    >
                      <div className="flex items-center">
                        <div className={`${color.bg} font-bold border-b-4 border-r-2 border-${color.name}-700 rounded-lg w-10 h-10 flex items-center justify-center mr-4`}>
                          <span className="text-white font-bold ">{project.charAt(0)}</span>
                        </div>
                        <span className="text-gray-800 font-medium flex-grow">{project}</span>
                        <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>

                        {(() => {
                              const projectInfo = project_data.find(p => p.name === project);
                              if (!projectInfo || !projectInfo.url) return null;

                              return (
                                <a
                                  href={projectInfo.url.startsWith('http') ? projectInfo.url : `https://${projectInfo.url}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center group"
                                >
                                  <svg className="w-5 h-5 mr-2 text-gray-500 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>
                                </a>
                              );
                        })()}

                      </div>
                      {project_loading === project ?
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="flex flex-col items-center space-y-4">
                            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-gray-700 text-lg font-medium animate-pulse">Loading, please wait…</p>
                          </div>
                        </div>	
                        :
                        <>
                        {selectedProject?.name === project && selectedProject?.content.length > 0 && (
                        <div className="mt-2 w-full rounded-lg bg-white shadow overflow-hidden">
                          <div className="w-full bg-zinc-100 flex flex-row mb-2 p-1">
                            <button
                              className="px-2 py-1 bg-zinc-300 text-black hover:bg-zinc-400 border-b-4 border-r-2 border-zinc-700 font-bold rounded-l-sm rounded-r-sm text-sm capitalize"
                              onClick={() => {
                                setOpen_skill(selectedProject);
                                setProject(selectedProject);
                              }}
                            >
                              Expand
                            </button>
                            
                            <button
                              className="px-2 py-1 bg-red-500 text-white hover:bg-red-600 rounded-sm ml-auto text-sm font-bold border-b-4 border-r-2 border-red-700"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedProject(null)
                              }}
                            >
                              Close
                            </button>
                          </div>
                          <Preview preview_data={selectedProject.content}/>
                        </div>
                        )}
                      </>
                      }
                    </div>
                  )
                })}
              </div>
            )}
          </div>
          }
        </div>
      </div>
    </div>
  );
}

export default Project;