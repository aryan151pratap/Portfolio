import React, { useState } from "react";

export default function SkillsDashboard({ setOpen_skill, skill, showEdit }) {
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Group skills by category for filtering
  const categories = [...new Set(skill.map(item => item.category || "Other"))];
  categories.unshift("all");
  

  return (
    <div className="sm:p-2 mx-auto py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">{showEdit ? 'Your\'s' : 'My'} Skills & Expertise</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore my technical capabilities and proficiency levels across various domains
        </p>
      </div>
      
      
      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {skill.map((item, idx) => (
          <div 
            key={idx}
            className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden 
                      cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-indigo-300 
                      p-6 flex flex-col"
            onClick={() => setOpen_skill(item)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-br from-indigo-400 to-purple-500 h-12 w-12 flex items-center justify-center rounded-xl">
                  <span className="text-xl font-bold text-white">{item.skill.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{item.skill}</h3>
                  {item.category && (
                    <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                      {item.category}
                    </span>
                  )}
                </div>
              </div>
              
              <span className="text-lg font-bold text-indigo-600">
                {item.level}%
              </span>
            </div>
            
            <div className="mt-auto">
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${item.level}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Beginner</span>
                <span>Expert</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Stats Footer */}
      
    </div>
  );
}