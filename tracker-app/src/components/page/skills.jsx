import { useState } from "react";
import Profile from '../profile';
import Skill_img from '../../image/skill.png';
import target from '../../image/target.png';
import Skill_Chart from "../parts/skillchart";
import AddAudio from "../add_audio";

function Skill({ color, skill_data, data, showEdit, userId }) {
  const [box, setBox] = useState([{name: 'Skill', img: Skill_img},
    {name: 'Music', img: target}
  ])

  
  return(
    <>
    <div className="w-full">
      <Profile color={color} data={data} showEdit={showEdit}/>

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
              {i.name === 'Skill' ?
                <Skill_Chart skill={skill_data} row={false} showEdit={showEdit} userId={userId}/>
                :
                <div className="p-4">
                  {showEdit ? 
                    <div className="flex flex-col gap-3">
                      <p className="text-lg px-4">Add Your Favourite Music</p>
                      <AddAudio/>
                    </div>
                    :
                    <div>
                      <p className="text-lg px-4">Play the music</p>
                    </div>
                  }
                </div>
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