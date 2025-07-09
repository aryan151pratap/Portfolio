import { useEffect, useState } from "react";
import search_img from '../image/search.png';

function Search({ data, setData }){

	const [search, setSearch] = useState("");

	useEffect(() => {
		if (search === "") {
			setData(data);
			return;
		}
		const new_data = data.filter((i) => {
			if(i !== undefined){
				return i.toLowerCase().startsWith(search.toLowerCase())
			}
		});
		setData(new_data);
	}, [search, data, setData]);


	return(
		<>
		<div className="w-full p-3 mb-2 flex gap-2 bg-zinc-200/70">
			<input type="text" value={search} placeholder="Search . . ." className="w-full md:w-[50%] outline-none"
			onChange={(e) => {setSearch(e.target.value)}}
			/>
			<div className="text-zinc-400 items-center flex gap-2 flex-row justify-center ml-auto">
				{search.trim() !== '' &&
					<button className="text-zinc-500"
					onClick={() => setSearch('')}
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				}
				<div className="border-1 h-full"></div>
				<img src={search_img} alt="" className="w-5 h-5"/>
			</div>
		</div>
		</>
	)
}

export default Search;