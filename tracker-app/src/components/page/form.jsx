import { useEffect, useState } from "react";
import { saveProject, getProject } from "../utils/saveProject.jsx";
import { compressImage } from "../utils/imagCompressor.jsx";

function Form({ setFormData, setRefreshTrigger, show_form, setShow_form, edit, setEdit }) {
  const [data, setData] = useState([]);
  const [useUrl, setUseUrl] = useState(true);
  const [form, setForm] = useState({
    title: "",
    provider: "",
    industry: "",
    skill: "",
    description: "",
    imageUrl: "",
    date: "",
    duration: "",
    credentials: "",
    tools: [],
    paid: 0
  });

  useEffect(() => {
    if(!edit) return;

    setForm({
      title: edit.title,
      provider: edit.provider,
      industry: edit.industry,
      skill: edit.skill,
      description: edit.description,
      imageUrl: edit.imageUrl,
      date: edit.date,
      duration: edit.duration,
      credentials: edit.credentials,
      tools: edit.tools,
      paid: edit.paid
    })

    setEdit(null);
  }, [edit])

  const handleSave = async () => {
    setFormData((prev) => {
      const exists = prev.some((item) => item.title === form.title);
      if (exists) {
        return prev.map((item) => item.title === form.title ? form : item);
      } else {
        return [form, ...prev];
      }
    });


    const data = await saveProject('certificate/save', form);

    if(data.ok){
      setRefreshTrigger(e => e + 1);
    }

    setForm({
      title: "",
      provider: "",
      industry: "",
      skill: "",
      description: "",
      imageUrl: "",
      date: "",
      duration: "",
      credentials: "",
      tools: [],
      paid: 0
    });

    setShow_form(false);
    console.log(form);
  };

  const handle_cancel = function(){
    setForm({
      title: "",
      provider: "",
      industry: "",
      skill: "",
      description: "",
      imageUrl: "",
      date: "",
      duration: "",
      credentials: "",
      tools: [],
      paid: 0
    });
    setShow_form(false);
  }
  // useEffect(() => {
  //   setFormData((e) => [...data, ...e]);
  // }, [data]);

  return (
    <div className="w-full">
      {show_form ? (
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-5">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Add New Certificate
            </h2>
            <p className="text-emerald-100">Fill in the details of your certificate</p>
          </div>
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Certificate Title
                </label>
                <input
                  type="text"
                  placeholder="e.g., Python for Data Science"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Provider / Company
                </label>
                <input
                  type="text"
                  placeholder="e.g., IBM, Coursera, Udemy"
                  value={form.provider}
                  onChange={(e) => setForm({ ...form, provider: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Industry Type
                </label>
                <input
                  type="text"
                  placeholder="e.g., AI, Web Development, IoT"
                  value={form.industry}
                  onChange={(e) => setForm({ ...form, industry: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Skill
                </label>
                <input
                  type="text"
                  placeholder="e.g., Python, React, ESP32"
                  value={form.skill}
                  onChange={(e) => setForm({ ...form, skill: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Date
                </label>
                <input
                  type="date"
                  placeholder="e.g., June 2023"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Duration
                </label>
                <input
                  type="text"
                  placeholder="e.g., 120 hours"
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Credentials
                </label>
                <input
                  type="text"
                  placeholder="e.g., Credential ID: ABC-123456"
                  value={form.credentials}
                  onChange={(e) => setForm({ ...form, credentials: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.5 0-2.5.833-2.5 2s1 2 2.5 2h1m-1-4V6m0 6v2m6.5 1.5L18 18l3-3M12 2a10 10 0 100 20 10 10 0 000-20z" />
                  </svg>
                  Paid
                </label>
                <input
                  type="number"
                  placeholder="e.g., 4865"
                  value={form.paid}
                  onChange={(e) => setForm({ ...form, paid: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Description
                </label>
                <textarea
                  rows="3"
                  placeholder="Brief description about what you learned or achieved"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Tools
                </label>
                <input
                  rows="3"
                  placeholder="e.g, Python, mongoDb, react"
                  value={form.tools}
                  onChange={(e) => {
                    setForm({ ...form, tools: e.target.value.split(",") })
                  }}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none transition"
                />
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="px-6 pb-6">
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Certificate Image
              </h3>
              
              <div className="flex items-center gap-6 mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className="relative">
                    <input
                      type="radio"
                      className="sr-only"
                      checked={useUrl}
                      onChange={() => setUseUrl(true)}
                    />
                    <div className={`w-5 h-5 rounded-full border-2 ${useUrl ? 'border-emerald-500' : 'border-gray-300'} flex items-center justify-center`}>
                      {useUrl && <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>}
                    </div>
                  </div>
                  <span className="text-gray-700 font-medium">Image URL</span>
                </label>
                
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className="relative">
                    <input
                      type="radio"
                      className="sr-only"
                      checked={!useUrl}
                      onChange={() => setUseUrl(false)}
                    />
                    <div className={`w-5 h-5 rounded-full border-2 ${!useUrl ? 'border-emerald-500' : 'border-gray-300'} flex items-center justify-center`}>
                      {!useUrl && <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>}
                    </div>
                  </div>
                  <span className="text-gray-700 font-medium">Upload File</span>
                </label>

                
              </div>

              {useUrl ? (
                <input
                  type="text"
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  placeholder="https://example.com/your-certificate.png"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />
              ) : (
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={ async (e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const image =  await compressImage(file);
                          setForm({ ...form, imageUrl: image });   
                        }
                      }}
                      className="w-full opacity-0 absolute inset-0 cursor-pointer"
                    />
                    <div className="px-4 py-3 bg-white border border-gray-300 rounded-lg flex items-center justify-between">
                      <span className="text-gray-500 truncate">
                        {form.imageUrl ? "File selected" : "Choose a file..."}
                      </span>
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm transition">
                        Browse
                      </button>
                    </div>
                  </div>
                  
                  {form.imageUrl && (
                    <div className="w-12 h-12 rounded-md overflow-hidden border border-gray-200">
                      <img src={form.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
            <button 
              className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
              onClick={handle_cancel}
            >
              Cancel
            </button>
            <button 
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg font-medium hover:opacity-90 transition flex items-center"
              onClick={handleSave}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Save Certificate
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <button 
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg font-medium hover:opacity-90 transition flex items-center mx-auto shadow-md"
            onClick={() => setShow_form(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Certificate
          </button>
        </div>
      )}
    </div>
  );
}

export default Form;