import React, { useState } from "react";


export default function SkillsDashboard({ setOpen_skill, skill }) {

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-start p-2">My Skills & Experience</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-6 md:gap-6 rounded-sm">
        {skill.map((item, idx) => (
          <div 
            key={idx}
            className="group relative z-5 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden 
                  cursor-pointer transition-all duration-300 hover:shadow-2xl hover:border-indigo-200 
                  p-5 md:p-6 lg:p-5 xl:p-6"
            onClick={() =>{
              setOpen_skill(item);
            }}
          >
            <div class="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white opacity-0 
                        group-hover:opacity-100 transition-opacity duration-500">
            </div>
            
            <div class="relative z-10">
              <div class="flex items-center justify-between">
                <div class="flex gap-3 items-center space-x-3">
                  <div class="bg-indigo-500 h-10 w-10 items-center flex justify-center border-b-4 border-r-2 border-indigo-800 rounded-lg transition-colors">
                      <p className="shrink-0 text-xl font-bold text-white">{item.skill.charAt(0)}</p>
                  </div>
                  <span class="text-gray-800 text-lg md:text-xl lg:text-lg xl:text-xl group-hover:text-indigo-700 transition-colors">
                    {item.skill}
                  </span>
                </div>
                
                <span class="bg-gradient-to-r from-indigo-500 to-purple-500 text-white 
                            font-bold py-1 px-3 rounded-full text-xs md:text-sm shadow-md 
                            transform group-hover:scale-105 transition-transform">
                  {item.level}%
                </span>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
