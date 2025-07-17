import React, { useState } from "react";
import { getProject } from "../utils/saveProject";


export default function SkillsDashboard({ setOpen_skill, skill, showEdit, userId }) {
  const [loading, setLoading] = useState(null);
  const categories = [...new Set(skill.map(item => item.category || "Other"))];
  categories.unshift("all");
  
  const handleGetSkill = async function(item){
    setLoading(item.skill);
    try{
      const res = await getProject(`wallet/get-skill/${userId}/${item._id}`)
      if(res.ok){
        setOpen_skill(res.result.skills);
      }
    } catch (err){
      console.log(err);
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="mx-auto shadow-md p-2 mt-4 border border-zinc-200">
      <div className="text-start p-4">
        <h1 className="text-2xl font-bold text-gray-800">{showEdit ? 'Your\'s' : 'My'} Skills & Expertise</h1>
        <p className="text-gray-600 mx-auto">
          Explore my technical capabilities and proficiency levels across various domains
        </p>
      </div>
      
      <div className="mt-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div>
          <p className="text-3xl font-bold text-indigo-600">{skill.length}</p>
          <p className="text-gray-600">Total Skills</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-indigo-600">
          {Math.max(...skill.map(s => s.level))}%
          </p>
          <p className="text-gray-600">Highest Proficiency</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-indigo-600">
          {categories.length - 1}
          </p>
          <p className="text-gray-600">Categories</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-indigo-600">
          {Math.round(skill.reduce((sum, s) => sum + s.level, 0) / skill.length)}%
          </p>
          <p className="text-gray-600">Average Proficiency</p>
        </div>
        </div>
      </div>
      
      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
        {skill.map((item, idx) => (
          <div key={idx}>
          <div 
            className="bg-white shadow-lg border border-gray-100 overflow-hidden 
                      cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-indigo-300 
                      p-6 flex flex-col"
            onClick={() => handleGetSkill(item)}
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
            {loading === item.skill &&
              <div>
                <div className="w-full h-1 bg-gradient-to-r from-blue-500 via-white to-blue-500 bg-[length:200%_100%] animate-shimmer" />
              </div>
            }
          </div>

          </div>
        ))}
      </div>
            
    </div>
  );
}