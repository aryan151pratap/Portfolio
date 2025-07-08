function Linechart({ data }){
	
	const colors = ['red', 'blue', 'orange', 'green', 'yellow', 'purple'];

	return(
		<>
		<div className="w-full p-4">
			<h1 className="text-[20px] mb-2">Line chart</h1>
			
			{data.map((i, index) => {
				let color = colors[0];

				if(i.level >= 90) color = colors[3]
				else if(i.level >= 80) color = colors[1]
				else if(i.level >= 70) color = colors[4]
				else if(i.level >= 60) color = colors[2]

				return(
				<div key={index} className="group relative w-full flex flex-col p-1">
					<div className="absolute z-10 top-0 right-0 border border-zinc-300 p-2 bg-white rounded shadow-md opacity-0 group-hover:opacity-100 transition duration-200">
						<p className="text-sm font-semibold">{i.level}%</p>
						<p className="text-xs text-zinc-600">{i.skill}</p>
					</div>
					<div className="w-full flex justify-between">
						<p>{i.skill}</p>
						<p>{i.level}%</p>
					</div>
					<div className="w-full flex rounded-full overflow-hidden">
						<div className={`w-[${i.level}%] py-1 bg-${color}-500 rounded-r-full`}></div>
						<div className={`w-[${100 - i.level}%]  bg-${color}-200 py-1 rounded-r-full`}></div>
					</div>
				</div>
				)
			})}
		</div>
		</>
	)
}

export default Linechart;