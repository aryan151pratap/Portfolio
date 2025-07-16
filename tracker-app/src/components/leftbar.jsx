import { use, useState } from "react";
import Logo from "./logo/logo";
import profile from '../image/profile.png';
import skill_wallet from '../image/wallet.png';
import project from '../image/project.png';
import certificate from '../image/certificate.png';
import logout from '../image/logout.png';
import viewers from '../image/viewers.png';
import { Logout } from './utils/saveProject';

function LeftBar({ color, currentPage, setCurrentPage, parallel, setParallel, showEdit }){

	const [bar, Setbar] = useState([{ name:'Profile', img: profile }, 
		{name: 'Skills Wallet', img: skill_wallet }, 
		{name: 'Projects', img: project }, 
		{name:'Certificate', img: certificate },
		showEdit && {name: 'Viewers', img: viewers }
	]);

	const handle_logout = async function(){
		try{
			const res = await Logout();
			if (res.ok) {
				window.location.reload();
			} else {
				console.error('Logout failed:', res.result);
			}
		} catch(err) {
			console.log(err);
		}
	}

	return(
		<>
		<div className={`sm:min-h-screen md:min-h-screen flex shrink-0 ${!parallel ? 'sm:w-fit md:w-fit w-full' : 'w-full sm:w-[250px] md:w-[250px]'} bg-${color}-500 shadow-xl bg-white`}>
		<div className="w-full flex sm:flex-col md:flex-col flex-row">
			<div className={`${parallel ? "sm:w-fit md:w-fit w-full items-center" : ""} sm:justify-end md:justify-end flex p-2`}>				
				<div className="w-6 flex flex-col gap-1 cursor-pointer"
					onClick={() => setParallel(!parallel)}				
				>
					<p className="py-[1px] w-full bg-black"></p>
					<p className="py-[1px] w-full bg-black"></p>
					<p className="py-[1px] w-full bg-black"></p>
				</div>
			</div>

			<div className="w-full h-full flex flex-col">
				<div className={`${parallel ? "hidden sm:flex md:flex" : "flex sm:hidden md:hidden"} w-full shrink-0 p-4 justify-center`}>
					<p className="text-2xl font-bold py-5">Achievement</p>
					<Logo />
				</div>

				<div className="h-full flex sm:flex-col md:flex-col flex-row">
					<div className="w-full sm:py-10 md:py-10 flex sm:flex-col md:flex-col flex-row">
					{bar.map((i, index) => (
						<div
							key={index}
							className={`w-full hover:bg-zinc-400 hover:inset-shadow-sm hover:inset-shadow-zinc-800 flex sm:justify-start md:justify-start justify-center hover:text-white ${
								i.name === currentPage
								? "bg-blue-100 hover:border-zinc-900"
								: ""
							} flex`}
							onClick={() => {
								setCurrentPage(i.name);
							}}
						>
							
							<div className={`${parallel ? 'w-12' : 'w-10' } relative h-full flex items-center justify-center p-2 sm:p-1 md:p-1`}>
								<img src={i.img} alt="" className={`${!parallel ? 'h-7 w-7' : 'h-8 h-8'} ${i.name === currentPage && 'animate-bounce'}`}/>
							</div>
							{parallel ?
							<div className="sm:flex md:flex hidden px-2 py-[10px] font-bold cursor-pointer">
								<button>
									{i.name}
								</button>
							</div>
							:
							<div className="h-14"></div>
							}
						</div>
					))}
					</div>
					<div className="mt-auto mb-2">
						<button className={`text-red-600 hover:text-red-800 flex flex-row justify-center items-center cursor-pointer`} title="Logout"
						onClick={handle_logout}
						>
							<div className={`${parallel ? 'w-12' : 'w-10' } h-full flex items-center justify-center`}>
								<img src={logout} alt="" className={`${!parallel ? 'h-7 w-7' : 'h-8 h-8'}`}/>
							</div>
							{parallel ?
							<div className="sm:flex md:flex hidden px-2 py-[10px] font-bold cursor-pointer">
								<p className="flex">
									Logout
								</p>
							</div>
							:
							<div className="h-14"></div>
							}
						</button>
					</div>
				</div>
			</div>
		</div>
		</div>

		</>
	)
}

export default LeftBar;