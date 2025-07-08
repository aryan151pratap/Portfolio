import { use, useEffect, useState } from "react";
import Show_certificate from "./show_certificate";
import Search from '../search.jsx';
import Form from './form.jsx';
import verified_img from '../../image/verified.png';
import Empty from '../../image/empty.png';
import { getProject, deleteProject} from "../utils/saveProject.jsx";

function Certificate(){

	const [skill_button, setSkill_button] = useState(['provider', 'skill'])
	const [current_button, setCurrent_button] = useState('skill');
	const [current_img, setCurrent_img] = useState('');
	const [row, setRow] = useState(false);
	const [data, setData] = useState([]);
	const [current_data, setCurrent_data] = useState([]);
	const [filter_certificate, setFilter_certificate] = useState(current_data);
	const [loading, setLoading] = useState(true);
	const [refreshTrigger, setRefreshTrigger] = useState(0);
	const [offset, setOffset] = useState(0);
	const [edit, setEdit] = useState(null);
	const [show_form, setShow_form] = useState(false);

	useEffect(() => {
		console.log(data);
		const updated = [...new Set(data.flatMap(i => i[current_button].split(',').map(v => v.trim())))];
		setCurrent_data(updated);
	}, [data, current_button]);

	useEffect(() => {
		const get_data = async function(){
			setLoading(true);
			try{
				const new_data = await getProject(`certificate/get/${offset}`);
				if(new_data.ok){
					if(offset === 0){
						setData(new_data.result.certificates);
					} else {
						setData([...data, ...new_data.result.certificates]);
					}
				}
			} catch (error) {
				console.error('Error:', error);
			} finally {
				setLoading(false);
			}
		}
		get_data();
	}, [refreshTrigger, offset]);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [show_form]);
	
	const filtered_data = data.filter(item =>
		item[current_button]
			?.split(',')
			.map(v => v.trim())
			.some(val => filter_certificate.includes(val))
	);


	const handleShowImage = function(img){
		setCurrent_img(img);
	}

	const handle_button = function(i){
		setCurrent_button(i);
	}

	const handle_delete = async function(id){
		const confirmDelete = confirm('Are you sure you want to delete?');
    	if (!confirmDelete) return;  
		try{
			const new_data = await deleteProject(`certificate/delete/${id}`)
			if (new_data.ok) {
				setData(prev => prev.filter(item => item._id !== id));
			}		
		} catch (error) {
			console.error('Error:', error);
		}
	}


	return(
		<>
		<div className="w-full sm:p-2 md:p-2 p-2">
			<div className="flex gap-2 items-center">
				<p className="text-2xl font-bold text-black-500">Certificates</p>
				<div>
					<img src={verified_img} alt="" className="h-10 w-10"/>
				</div>
			</div>
			
			<div className="w-full py-5">

				<Search data={current_data} setData={setFilter_certificate}/>

				<div className="flex flex-col gap-2 shadow-md p-2 border-1 border-zinc-200">

					<div className="w-full">
						<button className="bg-zinc-500 px-2 text-white rounded-sm inset-shadow-sm inset-shadow-zinc-800"
						onClick={() => setRow(!row)}
						>{row ? 'Row' : 'Column'}</button>
					</div>
					<div className={`w-full flex ${row ? 'flex-row' : 'flex-col'} justify-between gap-4`}>
						
						<div className="w-full h-full order-1 md:order-2">
							<Form setFormData={setData} setRefreshTrigger={setRefreshTrigger} show_form={show_form} setShow_form={setShow_form} edit={edit} setEdit={setEdit}/>
						</div>

						<div className="w-full bg-zinc-200 order-2 md:order-1 border-1 border-zinc-200 border-black shadow-md rounded- p-2 text-sm">
							<div className="w-full flex border-b-2 border-zinc-300">
								{skill_button.map((i, index) => (
								<div key={index} className={`px-2 rounded-t-sm ${current_button === i && 'text-[15px] border-zinc-300 border-l-2 border-t-2 border-r-2 inset-shadow-sm inset-shadow-zinc-900 bg-zinc-600 text-white'}`}>
									<button className="cursor-pointer capitalize"
									onClick={() => handle_button(i)}
									>{i}</button>
								</div>
								))}
							</div>
							{filter_certificate.length > 0 ?
							<div className="w-full flex flex-wrap gap-5 py-4 capitalize">
								{filter_certificate.map((i, index) => (
									<div key={index}>
										<div className="bg-indigo-500 text-white font-semibold px-2 py-1 rounded-sm border-b-4 border-r-2 border-indigo-800">
											<p>{i}</p>
										</div>
									</div>
								))}
							</div>
							:
							<div className="w-full h-40 md:h-60 items-center flex flex-col justify-center">
								<img src={Empty} alt="" className="h-20 w-20 md:w-40 md:h-40"/>
								<p className="capitalize italic">no  content found...</p>
							</div>
							}
						</div>
					
					</div>
				</div>

				<div className="w-full px-2 py-6">
					{loading ?
					<div className="w-full h-full flex items-center justify-center">
						<div className="flex flex-col items-center space-y-4">
							<div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
							<p className="text-gray-700 text-lg font-medium animate-pulse">Loading, please wait…</p>
						</div>
					</div>	
					:
				
					<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
						{filtered_data.map((i, index) => (
						<div 
							key={index} 
							className="flex flex-col group bg-white rounded-sm shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
						>
							{/* Image section with overlay effect */}
							<div 
								className="relative h-30 sm:h-48 md:h-56 overflow-hidden cursor-pointer"
								onClick={() => handleShowImage(i)}
							>
								{i.imageUrl ? (
									<img 
									src={i.imageUrl} 
									alt={i.title || "Certificate"} 
									className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
									/>
								) : (
									<div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
									</svg>
									</div>
								)}
								
								{/* Hover overlay */}
								<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
									<span className="text-white font-medium text-sm">View Certificate</span>
								</div>
								
								{/* Date badge */}
								{i.date && (
									<div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
									{i.date.split('T')[0]}
									</div>
								)}
							</div>

							{/* Content section */}
							<div className="p-3 sm:p-4 flex flex-col">
								<div className="flex-1">
									<div className="flex flex-row">
										<h3 className="font-bold text-gray-800 text-sm sm:text-base line-clamp-2 leading-tight">
										{i.title}
										</h3>
										{i.paid > 0 &&
										<div className="relative p-1">
											<div className="absolute inset-0 left-auto w-fit h-fit rounded-full p-1 bg-green-600 animate-ping">
											</div>
											<div className="absolute inset-0 left-auto w-fit h-fit rounded-full bg-green-700 p-1"></div>
											<p className="flex gap-1 text-green-900 border-2 border-green-700 text-sm bg-green-200 px-2 rounded-sm">
												<span>₹</span> {i.paid}
											</p>
										</div>
										}
									</div>
									
									<p className="text-blue-600 text-xs sm:text-sm font-medium mt-1">
									{i.provider}
									</p>
									
									<div className="flex flex-wrap gap-2 mt-3">
									<span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-md">
										{i.industry}
									</span>
									<span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-md">
										{i.skill}
									</span>
									</div>
									
									{/* Description - visible on all screens but truncated */}
									<div className="mt-3">
										<p className="text-gray-600 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3 md:line-clamp-3">
											{i.description}
										</p>
									</div>
								</div>
							
							</div>
						{/* View button */}
							<div className="p-2 mt-auto mt-4 flex justify-between">
								<button 
									className="flex items-center bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-3 py-1.5 rounded-sm text-xs font-medium transition-all duration-300 border-b-4 border-r-2 border-indigo-700"
									onClick={() => handleShowImage(i)}
								>
									<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
									</svg>
									View
								</button>
								<div className="flex justify-center items-center">
									<span
										className="flex justify-center items-center text-zinc-500 cursor-pointer hover:text-zinc-900 inline-block align-middle"
										onClick={() => {
											setEdit(i);
											setShow_form(true);
										}}
									>
										<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
										</svg>
									</span>

									<button className="text-gray-400 hover:text-gray-600 opacity-100 group-hover:opacity-100 transition-opacity cursor-pointer"
									onClick={() => handle_delete(i._id)}
									>
										<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0H7m3-3h4a1 1 0 011 1v1H8V5a1 1 0 011-1z" />
										</svg>

									</button>
									
								</div>
							</div>
						</div>
						))}
					</div>
					}
					{offset <= data.length &&
						<div className="flex justify-center items-center text-blue-600 hover:underline cursor-pointer"
						onClick={() => {
							setOffset(e => e + 10);
							console.log(offset)
						}}
						>
							more
						</div>
					}
				</div>

				<Show_certificate current_img={current_img} setCurrent_img={setCurrent_img}/>
				
			</div>

		</div>
		</>
	)
}

export default Certificate;