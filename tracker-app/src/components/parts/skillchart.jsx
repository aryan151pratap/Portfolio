import { useState } from 'react';
import Bar_Chart from '../graph/Bar_Chart';
import Piechart from '../graph/piechart';
import Bootlechart from '../graph/bootlechart';
import LineChartComponent from '../graph/line';

function Skill_Chart({ skill, row }){
	
	const [current_wallet, setCurrent_wallet] = useState('Bar');

	const [wallet_button, setWallet_button] = useState(['Bar', 'Line', 'Pie', 'Bootle'])
	
	return(
		<>
		<div className="w-full flex border-b-2 border-zinc-300">
			{wallet_button.map((i, index) => (
			<div key={index} className={`px-2 rounded-t-sm ${current_wallet === i && 'text-[15px] border-zinc-300 border-l-2 border-t-2 border-r-2 inset-shadow-sm inset-shadow-zinc-900 bg-zinc-600 text-white'}`}>
				<button className="cursor-pointer"
				onClick={() => {
					setCurrent_wallet(i)
				}}
				>{i}</button>
			</div>
			))}
		</div>
		<div className="w-full">
			{current_wallet === 'Bar' ? 
				<Bar_Chart data={skill}/>
				:
				current_wallet === 'Line' ?
				// <Linechart data={skill}/>
				<LineChartComponent data={skill}/>
				:
				current_wallet === 'Pie' ?
				<Piechart data={skill}/>
				:
				<div className='w-full flex justify-center items-center'>
					<div className={`justify-center flex ${row ? 'sm:grid-cols-2 md:grid-cols-4' : 'sm:grid-cols-4 md:grid-cols-6'} grid grid-cols-3 gap-6 p-5`}>
						<Bootlechart data={skill}/> 
					</div>
				</div>
			}
		</div>
	</>
	)
}

export default Skill_Chart;