import { useEffect, useState } from "react";
import { clsx } from "clsx";

const colors = ['red', 'blue', 'orange', 'yellow', 'pink', 'zinc', 'rose', 'sky', 'purple', 'indigo', 'violet', 'green'];
const ranges = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const opacities = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

export default function EditBox({ setPreview_data, preview_data }) {
  const [elements, setElements] = useState(preview_data);
  const [newText, setNewText] = useState("");
  const [selectedType, setSelectedType] = useState("text");
  const [selectedDiv, setSelectedDiv] = useState(null);
  const [tool, setTool] = useState([]); 
  const [add_tool, setAdd_tool] = useState('');

  const addElement = () => {22
    if (selectedType !== "image" && !newText.trim()) return;
    
    const newElement = {
      id: Date.now(),
      type: selectedType,
      content: selectedType === "image" ? "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=600&q=80" : selectedType === "tools" ? tool : newText,
      style: "zinc",
      style_opacity: 100,
      style_range: 800,
      padding_x: 0,
      padding_y: 2,
      bgColor: "white",
      bg_opacity: 100,
      bg_range: 900,
      size: 16,
      bold: 400,
      width: "auto",
      borderRadius: "md"
    };
    setElements([...elements, newElement]);
    setNewText("");
	  setTool([]);
  };

  const updateElement = (id, updates) => {
    setElements((prev) => prev.map((el) => (el.id === id ? { ...el, ...updates } : el)));
  };

  const handleFileUpload = (id, file) => {
    const reader = new FileReader();
    reader.onload = () => {
      updateElement(id, { content: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const classNames = (el) => {
    return clsx(
      `text-${el.style}-${el.style_range}/${el.style_opacity}`,
      `bg-${el.bgColor}-${el.bg_range}/${el.bg_opacity}`,
      `px-${el.padding_x}`,
      `py-${el.padding_y}`,
      `text-[${el.size}px]`,
      `font-[${el.bold}]`,
      `w-${el.width}`,
      {
        'rounded-none': el.borderRadius === 'none',
        'rounded-sm': el.borderRadius === 'sm',
        'rounded-md': el.borderRadius === 'md',
        'rounded-lg': el.borderRadius === 'lg',
        'rounded-xl': el.borderRadius === 'xl',
        'rounded-full': el.borderRadius === 'full',
      }
    );
  };

  useEffect(() =>{
    setPreview_data(elements);
  },[elements])


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 md:p-4">
      <div className="max-w-4xl mx-auto bg-white sm:rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-200 to-purple-200 p-6 text-indigo-900">
          <h1 className="text-3xl font-bold">Page Builder Studio</h1>
          <p className="text-indigo-600">Create and customize content elements</p>
        </div>
        
        <div className="p-2 md:p-6">
          <div className="bg-indigo-50 rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold text-indigo-800 mb-3">Add New Element</h2>
            
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="flex flex-col w-full md:w-auto">
                <label className="text-sm font-medium text-indigo-700 mb-1">Element Type</label>
                <select 
                  className="border border-indigo-300 rounded-lg p-2 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                  value={selectedType} 
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="text">Text</option>
                  <option value="code">Code</option>
                  <option value="image">Image</option>
				          <option value="tools">Tools</option>
                  <option value="div">Div Container</option>
                </select>
              </div>

              {selectedType !== "image" && (
                <div className="flex flex-col w-full">
                  <label className="text-sm font-medium text-indigo-700 mb-1">
                    {selectedType === "text" ? "Text Content" : 
                    selectedType === "code" ? "Code Content" : 
					          selectedType === "tools" ? "Tools Content" : "Div Content"}
                  </label>
                  <input
                    type="text"
                    className="border border-indigo-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                    placeholder="Enter content"
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                  />
                </div>
              )}

              <button 
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-5 py-2.5 rounded-lg font-medium shadow-md transition-all duration-200 mt-6 md:mt-0 self-end"
                onClick={addElement}
                disabled={selectedType !== "image" && !newText.trim()}
              >
                Add Element
              </button>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold text-indigo-800 mb-3">Page Elements</h2>
            <p className="text-gray-600 text-sm mb-4">
              Click on an element to edit its properties. Drag elements to reorder.
            </p>
            
            {elements.length === 0 ? (
              <div className="text-center py-12 bg-indigo-50 rounded-xl border-2 border-dashed border-indigo-200">
                <div className="text-indigo-400 mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-700">No elements yet</h3>
                <p className="text-gray-500 mt-1">Add your first element using the form above</p>
              </div>
            ) : (
              <div className="space-y-4">
                {elements.map((el) => (
                  <div
                    key={el.id}
                    onClick={() => setSelectedDiv(el.id)}
                    className={`relative p-2 sm:p-4 md:p-4 mb-3 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedDiv === el.id 
                        ? "ring-4 ring-indigo-400 bg-indigo-50 shadow-lg" 
                        : "ring-1 ring-gray-200 hover:ring-indigo-300 bg-white"
                    }`}
                  >
                    <div className="absolute top-2 right-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded">
                      {el.type.charAt(0).toUpperCase() + el.type.slice(1)}
                    </div>
                    
                    {el.type === "text" && (
                      <p
                        className={classNames(el)}
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => updateElement(el.id, { content: e.target.innerText })}
                      >
                        {el.content}
                      </p>
                    )}

                    {el.type === "code" && (
                      <pre
                        className={clsx(
                          classNames(el), 
                          "font-mono whitespace-pre-wrap rounded-lg overflow-x-auto"
                        )}
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => updateElement(el.id, { content: e.target.innerText })}
                      >
                        {el.content}
                      </pre>
                    )}

                    {el.type === "image" && (
                      <div className="flex flex-col">
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Upload Image
                          </label>
                          <div className="flex">
                            <input
                              type="file"
                              className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-lg file:border-0
                                file:text-sm file:font-semibold
                                file:bg-indigo-50 file:text-indigo-700
                                hover:file:bg-indigo-100"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) handleFileUpload(el.id, file);
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <img 
                            src={el.content} 
                            alt="Custom" 
                            className={clsx(
                              classNames(el), 
                              "object-contain max-h-64 border border-gray-200"
                            )}
                          />
                        </div>
                      </div>
                    )}

                    {el.type === "div" && (
                      <div
                        className={clsx(
                          classNames(el), 
                          "border-2 border-dashed min-h-[100px] flex items-center justify-center"
                        )}
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => updateElement(el.id, { content: e.target.innerText })}
                      >
                        {el.content || "Click to edit div content"}
                      </div>
                    )}

                    {el.type === 'tools' && (
                      <div className="flex flex-col gap-4">
                        <div className="w-full flex gap-2 flex-wrap">
                          {el.content.map((i, index) => (
                            <div className="w-fit">
                            {i.trim().length !== 0 &&
                              <div 
                                className={clsx(
                                classNames(el))}
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => {
                                  const newContent = [...el.content];
                                  newContent[index] = e.target.innerText.trim();
                                  updateElement(el.id, { content: newContent });
                                }}                              >
                                {i}
                              </div>
                            }
                            </div>
                          ))}
                        </div>
                        {selectedDiv === el.id && (
                        <div className="w-full flex justify-between">
                          <input
                            value={add_tool}
                            type="text"
                            placeholder="Enter tools (comma separated)"
                            className="p-2 outline-none border-2 border-zinc-200 rounded-sm w-full mr-2"
                            onChange={(e) => setAdd_tool(e.target.value)}
                          />
                          <button
                            className="p-2 bg-green-500 rounded-sm text-white"
                            onClick={() => {
                              if (!add_tool.trim()) return;
                              const toolsArray = add_tool.split(',').map(tool => tool.trim()).filter(tool => tool);
                              updateElement(el.id, { content: [...el.content, ...toolsArray] });
                              setAdd_tool('');
                            }}
                          >
                            Add
                          </button>
                        </div>
                        )} 
                      </div>
                    )}

                    {selectedDiv === el.id && (
                      <div className="bg-gray-800 p-4 mt-4 rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 outline-none">
                        <div className="space-y-4">
                          <h3 className="text-white font-semibold text-lg border-b border-gray-700 pb-2">
                            Text Styling
                          </h3>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Text Color</label>
                            <select 
                              className="w-full bg-gray-700 text-white rounded-lg p-2 border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                              value={el.style}
                              onChange={(e) => updateElement(el.id, { style: e.target.value })}
                            >
                              {colors.map((c) => (
                                <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                              ))}
                            </select>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">Text Range</label>
                              <select 
                                className="w-full bg-gray-700 text-white rounded-lg p-2 border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                                value={el.style_range}
                                onChange={(e) => updateElement(el.id, { style_range: e.target.value })}
                              >
                                {ranges.map((r) => (
                                  <option key={r} value={r}>{r}</option>
                                ))}
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">Text Opacity</label>
                              <select 
                                className="w-full bg-gray-700 text-white rounded-lg p-2 border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                                value={el.style_opacity}
                                onChange={(e) => updateElement(el.id, { style_opacity: e.target.value })}
                              >
                                {opacities.map((o) => (
                                  <option key={o} value={o}>{o}%</option>
                                ))}
                              </select>
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Font Size (px)</label>
                            <input
                              type="range"
                              min="8"
                              max="48"
                              value={el.size}
                              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                              onChange={(e) => updateElement(el.id, { size: e.target.value })}
                            />
                            <div className="text-center text-sm text-gray-400">{el.size}px</div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Font Size (px)</label>
                            <input
                              type="range"
                              min="300"
                              max="800"
                              step="50"
                              value={el.bold}
                              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                              onChange={(e) => updateElement(el.id, { bold: e.target.value })}
                            />
                            <div className="text-center text-sm text-gray-400">{el.bold}</div>
                          </div>
                        </div>

                        
                        
                        <div className="space-y-4">
                          <h3 className="text-white font-semibold text-lg border-b border-gray-700 pb-2">
                            Background & Layout
                          </h3>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Background Color</label>
                            <select 
                              className="w-full bg-gray-700 text-white rounded-lg p-2 border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                              value={el.bgColor}
                              onChange={(e) => updateElement(el.id, { bgColor: e.target.value })}
                            >
                              {colors.map((c) => (
                                <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                              ))}
                            </select>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">BG Range</label>
                              <select 
                                className="w-full bg-gray-700 text-white rounded-lg p-2 border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                                value={el.bg_range}
                                onChange={(e) => updateElement(el.id, { bg_range: e.target.value })}
                              >
                                {ranges.map((r) => (
                                  <option key={r} value={r}>{r}</option>
                                ))}
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">BG Opacity</label>
                              <select 
                                className="w-full bg-gray-700 text-white rounded-lg p-2 border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                                value={el.bg_opacity}
                                onChange={(e) => updateElement(el.id, { bg_opacity: e.target.value })}
                              >
                                {opacities.map((o) => (
                                  <option key={o} value={o}>{o}%</option>
                                ))}
                              </select>
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Border Radius</label>
                            <select 
                              className="w-full bg-gray-700 text-white rounded-lg p-2 border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                              value={el.borderRadius}
                              onChange={(e) => updateElement(el.id, { borderRadius: e.target.value })}
                            >
                              <option value="none">None</option>
                              <option value="sm">Small</option>
                              <option value="md">Medium</option>
                              <option value="lg">Large</option>
                              <option value="xl">Extra Large</option>
                              <option value="full">Full</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="text-white font-semibold text-lg border-b border-gray-700 pb-2">
                            Spacing & Actions
                          </h3>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">Padding X</label>
                              <input
                                type="range"
                                min="0"
                                max="10"
                                value={el.padding_x}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                onChange={(e) => updateElement(el.id, { padding_x: e.target.value })}
                              />
                              <div className="text-center text-sm text-gray-400">{el.padding_x}px</div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">Padding Y</label>
                              <input
                                type="range"
                                min="0"
                                max="10"
                                value={el.padding_y}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                onChange={(e) => updateElement(el.id, { padding_y: e.target.value })}
                              />
                              <div className="text-center text-sm text-gray-400">{el.padding_y}px</div>
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Width</label>
                            <select 
                              className="w-full bg-gray-700 text-white rounded-lg p-2 border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                              value={el.width}
                              onChange={(e) => updateElement(el.id, { width: e.target.value })}
                            >
                              <option value="full">Full Width</option>
                              <option value="3/4">Three Quarters</option>
                              <option value="1/2">Half Width</option>
                              <option value="1/3">One Third</option>
                              <option value="1/4">One Quarter</option>
                              <option value="auto">Auto</option>
                            </select>
                          </div>
                          
                          <div className="pt-2">
                            <button
                              className="w-full px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center"
                              onClick={() => setElements(elements.filter((item) => item.id !== el.id))}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Delete Element
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {elements.length > 0 && (
            <div className="mt-8 p-4 bg-indigo-50 rounded-lg flex  gap-4 justify-between items-center">
              <div>
                <h3 className="font-medium text-indigo-800">Page Preview</h3>
                <p className="text-sm text-indigo-600">{elements.length} elements added</p>
              </div>
             
            </div>
          )}
        </div>
      </div>
    </div>
  );
}