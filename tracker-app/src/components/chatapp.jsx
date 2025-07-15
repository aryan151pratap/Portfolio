import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Skill from './page/skills';
import LeftBar from './leftbar';
import Certificate from "./page/certificate";
import Wallet from './page/wallet';
import Project from './page/project';
import Footer from "./footer";
import Showing from "./showing.jsx";
import Edit_box from './edit/edit_box.jsx';
import Preview from "./edit/preview";
import { saveProject, getProject } from './utils/saveProject.jsx';

function ShowProject({ login_userId }) {
	const { userId } = useParams();
	const [ id, setId] = useState(null);
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);

	const color = 'white';
	const [currentPage, setCurrentPage] = useState('Profile');
	const [parallel, setParallel] = useState(true);
	const [open_skill, setOpen_skill] = useState(null);
	const [publish, setPublish] = useState(false);
	const [edit, setEdit] = useState(true);
	const [preview_data, setPreview_data] = useState([]);
	const [skill, setSkill] = useState([]);
	const [routes, setRoutes] = useState('');

	const [showEdit, setShowEdit] = useState(true);

	useEffect(() => {
		let isMounted = true;

		const fetchData = async () => {
			if (userId) {
				try {
					const response = await getProject(`remember/user-by-id/${userId}`);
					if (response.ok && isMounted) {
						setData(response.result.user);
						if(login_userId !== userId) setShowEdit(false);
					}
				} catch (err) {
					if (isMounted) console.error('Fetch error:', err);
				} finally {
					if (isMounted) setLoading(false);
				}
			}
		};

		fetchData();

		return () => { isMounted = false };
	}, [userId, data]);

	useEffect(() => {
		if(data){
			setId(data.id);
		}
	}, [data])


	const handle_add_document = async () => {
		if (preview_data.length > 0 && (open_skill.name?.trim() || open_skill.skill?.trim())) {
			let payload = {};
			if (currentPage === 'Projects') {
				payload = {
				name: open_skill.name,
				url: open_skill.url,
				content: preview_data,
				};
			} else if (currentPage === 'Skills Wallet') {
				payload = {
				skill: open_skill.skill,
				level: open_skill.level || 0,
				content: preview_data,
				};
			} else {
				console.warn("Unsupported page:", currentPage);
				return;
			}

			try {
				const data = await saveProject(`${routes}/save`, payload);
				setOpen_skill(data.updatedProject);
				setPreview_data([]);
				setPublish(false);
			} catch (err) {
				console.error("Save failed:", err);
			}
		}
	};

	useEffect(() => {
		const check_auth = async () => {
		try {
			if(id){
				const response = await getProject(`wallet/get/${id}`);
				if (response.ok) {
					setSkill(response.result.skills);
				}
			}
		} catch (error) {
			console.error('Error:', error);
		}
		};

		check_auth();
	}, [currentPage, open_skill, id]);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		if (currentPage === 'Skills Wallet') {
			setRoutes('wallet');
		} else if (currentPage === 'Projects') {
			setRoutes('projects');
		}
	}, [currentPage]);

	if (loading) {
		return (
		<div className="flex items-center justify-center h-screen bg-gray-100">
			<div className="flex flex-col items-center space-y-4">
			<div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
			<p className="text-gray-700 text-lg font-medium animate-pulse">Loading profile…</p>
			</div>
		</div>
		);
	}

	return (
		<div className={`w-full min-h-screen bg-${color}-800`}>
		{publish ? (
			<div className="bg-white rounded-xl shadow-md sm:p-2 md:p-6">
			<div className="mb-4 flex items-center justify-between">
				<h2 className="text-xl font-bold text-gray-800 p-4">Page Editor</h2>
				<div className="flex gap-2 p-4">
				<button
					className={`px-3 py-1.5 ${edit ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-indigo-600 text-white hover:bg-indigo-700'} rounded-lg text-sm font-medium`}
					onClick={() => setEdit(false)}
				>
					Preview
				</button>
				<button
					className={`px-3 py-1.5 ${!edit ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-indigo-600 text-white hover:bg-indigo-700'} rounded-lg text-sm font-medium`}
					onClick={() => setEdit(true)}
				>
					Publish
				</button>
				</div>
			</div>
			{edit ? (
				<div className="flex flex-col gap-2">
					<Edit_box setPreview_data={setPreview_data} preview_data={preview_data} />
				</div>
			) : (
				<Preview preview_data={preview_data} />
			)}
			<div className="p-2 flex justify-between">
				<button
				className="bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 text-white px-5 py-2.5 rounded-lg font-medium shadow-md transition-all duration-200 mt-6 md:mt-0 self-end"
				onClick={() => setPublish(false)}
				>
				Discard
				</button>
				<button
				className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-5 py-2.5 rounded-lg font-medium shadow-md transition-all duration-200 mt-6 md:mt-0 self-end"
				onClick={handle_add_document}
				>
				Publish
				</button>
			</div>
			</div>
		) : open_skill ? (
			<Showing
				open_skill={open_skill}
				setOpen_skill={setOpen_skill}
				setPreview_data={setPreview_data}
				setPublish={setPublish}
				routes={routes}
				showEdit={showEdit}
			/>
		) : (
			<div>
			<div className="w-full h-full flex sm:flex-row md:flex-row flex-col">
				<div className="sticky top-0 z-10 top-0 sm:h-screen md:h-screen">
				<LeftBar
					color={color}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					parallel={parallel}
					setParallel={setParallel}
				/>
				</div>

				<div className="w-full min-h-screen flex justify-center overflow-x-auto">
				<div className="w-full flex flex-col items-center">
					<div className={`w-full flex ${!parallel && 'md:w-[80%]'}`}>
					{currentPage === 'Profile' ? (
						<Skill color={color} 
							skill_data={skill} 
							data={data} 
							showEdit={showEdit}
							userId={id}
						/>
					) : currentPage === 'Skills Wallet' ? (
						<Wallet
						skill={skill}
						setSkill={setSkill}
						setOpen_skill={setOpen_skill}
						showEdit={showEdit}
						userId={id}
						/>
					) : currentPage === 'Projects' ? (
						<Project
						setPublish={setPublish}
						setOpen_skill={setOpen_skill}
						showEdit={showEdit}
						userId={id}
						/>
					) : currentPage === 'Certificate' ? (
						<Certificate 
						showEdit={showEdit}
						userId={id}
						/>
					) : (
						<div></div>
					)}
					</div>
				</div>
				</div>
			</div>
			{currentPage === 'Profile' &&
			<Footer data={data} />
			}
			</div>
		)}
		</div>
	);
}

export default ShowProject;
