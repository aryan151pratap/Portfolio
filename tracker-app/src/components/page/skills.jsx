import { useState } from "react";
import Profile from '../profile';
import Skill_img from '../../image/skill.png';
import target from '../../image/target.png';
import Skill_Chart from "../parts/skillchart";

function Skill({ color,  skill_data, data }) {

  const [box, setBox] = useState([{name: 'Skill', img: Skill_img},
    {name: 'Target', img: target}
  ])

  
  return(
    <>
    <div className="w-full">
      <Profile color={color} data={data}/>

      <div className="w-full p-4 text-black flex gap-4 md:flex-row flex-col">
        {box.map((i, index) => (

          <div key={index} className="w-full">
            {skill_data.length > 0 &&
            <div className="w-full p-2 shadow-md rounded-md">
              <div className="w-full flex items-center text-2xl flex gap-4">
                <span>{i.name}</span>
                <img src={i.img} alt="" className="h-6 w-6 object-cover"/>
              </div>
              <div>
              {i.name === 'Skill' &&
                <Skill_Chart skill={skill_data} row={false}/>
              }
              </div>
            </div>
          }
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default Skill;