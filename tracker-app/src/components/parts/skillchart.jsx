import { useState } from 'react';
import Bar_Chart from '../graph/Bar_Chart';
import Piechart from '../graph/piechart';
import Bootlechart from '../graph/bootlechart';
import LineChartComponent from '../graph/line';
import { useEffect } from 'react';

const apiUrl = import.meta.env.VITE_BACKEND_ADD;

function Skill_Chart({ skill, row, showEdit, userId }){
	const [current_wallet, setCurrent_wallet] = useState('Pie');
	const [loading, setLoading] = useState(false);
	const [wallet_button, setWallet_button] = useState(['Line', 'Bar', 'Pie', 'Bootle'])

	useEffect(() =>{
		(async () => {
			setLoading(true);
			try {
				const resp = await fetch(`${apiUrl}/wallet/get_graph/${userId}`, {
					method: "GET",
					headers: { "Content-Type": "application/json" },
					credentials: "include",
				});

				if (!resp.ok) throw new Error("Could not load current graph");

				const data = await resp.json();

				if (data?.current_graph){
					setCurrent_wallet(data.current_graph);
				}
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		})();
	}, [])


	const handleCurrentGraph = async function(i){
		setCurrent_wallet(i);
		try{
			if(showEdit){
				await fetch(`${apiUrl}/wallet/current_graph`, {
					method: 'POST',
					headers: {
					'Content-Type': 'application/json',
					},
					credentials: 'include',
					body: JSON.stringify({ current_graph : i}),
				});
			}
		} catch (err){
			console.log(err);
		}
	}

	return(
		<>
		<div className="w-full flex border-b-2 border-zinc-300">
			{wallet_button.map((i, index) => (
			<div key={index} className={`px-2 rounded-t-sm ${current_wallet === i && 'text-[15px] border-zinc-300 border-l-2 border-t-2 border-r-2 inset-shadow-sm inset-shadow-zinc-900 bg-zinc-600 text-white'}`}>
				<button className="cursor-pointer"
				onClick={() => handleCurrentGraph(i)}
				>{i}</button>
			</div>
			))}
		</div>
		{loading ?
			<div className='h-70 flex justify-center items-center'>
				<div className='text-rose-600 rounded-full h-16 w-16 bg-white border-5 border-dashed animate-spin'></div>
			</div>
		:
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
		}
	</>
	)
}

export default Skill_Chart;