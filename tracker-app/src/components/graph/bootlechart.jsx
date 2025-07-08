function Piechart({ data }){
	
	const colors = ['red', 'blue', 'orange', 'green', 'yellow', 'purple'];

	return(
		<>
    {data.map((i, index) => {
		let color = colors[0];

		if(i.level >= 90) color = colors[3]
		else if(i.level >= 80) color = colors[1]
		else if(i.level >= 70) color = colors[4]
		else if(i.level >= 60) color = colors[2]
		
		return(
			<div key={index} className="w-[80px]">
				<div className={`text-[10px] border-1 border-zinc-200 bg-zinc-100/50 text-${color}-500 w-full flex justify-center`}>
					<p>{i.skill}</p>
				</div>
				<div className={`w-full h-[80px] group relative rounded-b-md rounded-t-sm shadow-md shrink-0 bg-${'zinc'}-200 inset-shadow-sm inset-shadow-zinc-600 items-end justify-center px-[2px] overflow-hidden`}>
					<div className="absolute top-0 right-0 border border-zinc-300 p-2 bg-white rounded shadow-md opacity-0 group-hover:opacity-100 transition duration-200">
						<p className="text-sm font-semibold">{i.level}%</p>
						<p className="text-xs text-zinc-600">{i.skill}</p>
					</div>
					<div className={`w-full h-[80px] rounded-b-sm flex flex-col bg-${color}-200/50 inset-shadow-sm inset-shadow-zinc-500 justify-end items-end`}>
						<div
							className={`w-full h-[${Math.ceil(80 * (i.level/100))}px] bg-${color}-500/90 inset-shadow-sm inset-shadow-${color}-200 rounded-b-md flex items-center justify-center `}
							>
							<p className="text-white text-sm">{i.level}%</p>
						</div>
					</div>

				</div>
			</div>
		)
	})}
</>

	)
}

export default Piechart;