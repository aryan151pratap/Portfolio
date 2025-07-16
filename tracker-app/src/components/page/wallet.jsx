import { useEffect, useState } from "react";
import Skill_Chart from "../parts/skillchart";
import skill_img from '../../image/skill.png';
import SkillsDashboard from '../parts/achievement.jsx';
import Business from  '../../image/business.png';
import { saveProject } from "../utils/saveProject.jsx";

function Wallet({ setOpen_skill, skill, setSkill, showEdit, userId }){
	const [row, setRow] = useState(true);
	const [show_form, setshow_form] = useState(false);

	const [form, setForm] = useState({
		skill: '',
		level: '',
		content: []
	});

	const categories = [...new Set(skill.map(item => item.category || "Other"))];
  	categories.unshift("all");


	const handle_add_skill = async function(){
		if(form.skill !== ''  && form.level !== ''){
			setSkill(e => {
				const i = e.findIndex(item => item.skill === form.skill);
				if(i !== -1){
					const updated = [...e];
					updated[i] = form;
					return updated;
				}
				else{
					return [form, ...e];
				}
			})
			setshow_form(false);
			await saveProject('wallet/save', form)
		}

		setForm({
			skill: '',
			level: '',
		});
	}

	return(
		<>
		<div className="w-full h-full sm:p-4 md:p-4 p-2">
			<div className="flex flex-row gap-4 items-center">
				<p className="text-2xl font-bold text-black hover:underline cursor-pointer">Skills Wallet</p>
				<img src={Business} alt="" className="h-10 w-10"/>
			</div>
			<div className="flex flex-col gap-2 shadow-md p-2 border-1 border-zinc-200 mt-4">

					<div className="w-full h-full">
						<button className="bg-zinc-500 px-2 text-white rounded-sm inset-shadow-sm inset-shadow-zinc-800"
						onClick={() => setRow(!row)}
						>{!row ? 'Row' : 'Column'}</button>
					</div>
					<div className={`flex ${row ? 'sm:flex-col md:flex-row flex-col' : 'sm:flex-col md:flex-col flex-col'} justify-between gap-4 overflow-x-auto`}>
						
						<div className={`w-full h-full flex ${row ? 'flex-col' : 'flex-row'} justify-between gap-2 order-1 md:order-2`}>
							{showEdit &&
							<div className="w-full h-full shadow-md rounded-sm border-1 border-zinc-200">
								<h1 className="text-zinc-700 font-bold mt-5 px-2">Add your Skill!</h1>
								<div className="w-full p-4">
									{show_form ? 
									<div className="flex flex-col gap-4">
										<div>
											<label className="text-sm font-medium text-zinc-700">Skill</label>
											<input
												type="text"
												value={form.skill}
												onChange={(e) => setForm({...form, skill: e.target.value})}
												placeholder="e.g., Python, React, ESP32"
												className="w-full mt-1 px-3 py-2 bg-green-100 rounded-md outline-none"
											/>
										</div>
										<div>
											<label className="text-sm font-medium text-zinc-700">Skill experience</label>
											<input
												type="number"
												value={form.level}
												onChange={(e) => setForm({...form, level: e.target.value})}
												placeholder="e.g., 90%"
												className="w-full mt-1 px-3 py-2 bg-green-100 rounded-md outline-none"
											/>
										</div>
										<div className="text-white flex justify-between mt-2">
											<button className="px-2 py-1 rounded-sm border-b-4 border-r-2 border-green-700 font-bold bg-green-600 hover:bg-green-700 cursor-pointer"
											onClick={handle_add_skill}
											>Add</button>
											<button className="px-2 py-1 rounded-sm border-b-4 border-r-2 border-red-700 font-bold bg-red-600 hover:bg-red-700 cursor-pointer"
											onClick={() => setshow_form(false)}
											>Cancel</button>
										</div>
									</div>
									:
									<div className="w-full h-full flex justify-end text-white">
										<button className="bg-green-500 border-b-4 border-r-2 border-green-700 rounded-sm px-2 py-1 cursor-pointer focus:border-b-2 focus:border-r-1"
										onClick={() => setshow_form(!show_form)}
										>Add Skill</button>
									</div>
									}
								</div>
							</div>
							}
							
							{skill.length > 0 &&
							<div className={`h-full text-sm p-2 gap-4 border-1 border-zinc-200 shadow-md rounded-sm`}>
								<div className="p-4 flex gap-2 items-center">
									<h1 className="px-1 rounded-sm inset-shadow-sm inset-shadow-purple-900 bg-purple-500 text-white">{showEdit ? 'Your\'s' : 'My'} Skills</h1>
									<img src={skill_img} alt="" className="h-6 w-6 object-cover"/>
								</div>
								<div className="flex flex-wrap justify-center gap-5">
								{skill.map((i, index) => (
									<div key={index} className="">
										<div className="flex font-semibold flex justify-center px-1 bg-zinc-600 border-r-2 border-zinc-800 text-white rounded-t-sm inset-shadow-sm inset-shadow-zinc-900">
											<p>{i.skill}</p>
										</div>
										<div className="flex px-1 font-bold bg-rose-500 border-b-4 border-r-2 border-red-800 justify-center text-white rounded-b-sm inset-shadow-sm inset-shadow-rose-900">
											<p>{i.level}%</p>
										</div>
									</div>
								))}
								</div>
							</div>
							}
							
						</div>
						
						

						{skill.length > 0 &&
						<div className="w-full order-2 md:order-1 border-1 border-zinc-200 border-black shadow-md rounded-sm p-2 text-sm">
							<Skill_Chart skill={skill} row={row} showEdit={showEdit} userId={userId}/>
						</div>
						}
					</div>

					
				</div>

				{skill.length > 0 &&

				<div className="">
					<SkillsDashboard setOpen_skill={setOpen_skill} skill={skill} showEdit={showEdit} userId={userId}/>
				</div>
				}
		</div>
		</>
	)
}

export default Wallet;