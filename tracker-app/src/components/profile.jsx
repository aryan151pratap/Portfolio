import { useState, useEffect } from "react";
import Add_image from './add_image';
import Animation from "./animation/animation";
import Bubble from "./animation/bubble";
import { saveProject } from './utils/saveProject';
import AddAudio from "./add_audio";

function Profile({ color, data, showEdit }) {
	const [form, setForm] = useState({ bio: '', details: [] });
	const [isEditingBio, setIsEditingBio] = useState(false);
	const [isEditingDetail, setIsEditingDetail] = useState(null);
	const [tempBio, setTempBio] = useState('');
	const [tempDetails, setTempDetails] = useState([]);
	const [addingNew, setAddingNew] = useState(false);
	const [newBookmark, setNewBookmark] = useState("");
	const [newDetailText, setNewDetailText] = useState("");

	useEffect(() => {
		const formatted = Array.isArray(data.details)
			? data.details.map(d => typeof d === 'string' ? { bookmark: "📌 Bookmark", detail: d } : d)
			: [];
		setForm({ bio: data.bio || '', details: formatted });
		setTempBio(data.bio || '');
		setTempDetails(formatted);
	}, [data]);

	const saveBio = async () => {
		const updatedForm = { ...form, bio: tempBio };
		setForm(updatedForm);
		await saveProject('remember/save', updatedForm);
		setIsEditingBio(false);
	};

	const cancelBioEdit = () => {
		setTempBio(form.bio);
		setIsEditingBio(false);
	};

	const saveDetail = async (index) => {
		const updatedDetails = [...form.details];
		updatedDetails[index] = tempDetails[index];
		const updatedForm = { ...form, details: updatedDetails };
		setForm(updatedForm);
		await saveProject('remember/save', updatedForm);
		setIsEditingDetail(null);
	};

	const cancelDetailEdit = () => {
		setTempDetails([...form.details]);
		setIsEditingDetail(null);
	};

	const addNewDetail = async () => {
		if (newBookmark.trim() && newDetailText.trim()) {
			const newItem = {
				bookmark: newBookmark.trim(),
				detail: newDetailText.trim()
			};
			const updatedDetails = [...form.details, newItem];
			const updatedForm = { ...form, details: updatedDetails };
			setForm(updatedForm);
			setTempDetails(updatedDetails);
			setNewBookmark("");
			setNewDetailText("");
			setAddingNew(false);
			await saveProject('remember/save', updatedForm);
		}
	};

	const cancelNewDetail = () => {
		setNewBookmark("");
		setNewDetailText("");
		setAddingNew(false);
	};

	return (
		<div className="w-full flex flex-col gap-10 text-black md:py-6">
			<div className="w-full h-full flex flex-col gap-6">
				<div className="w-full md:bg-white bg-sky-200">
					<div className="relative w-full h-[200px]">
						<div className="absolute inset-0 flex flex-wrap items-center justify-center overflow-hidden">
							<div><Bubble /></div>
							<div><Animation text={typeof form.bio === 'string' ? form.bio.split('|') : []} /></div>
						</div>
						<div className="absolute -bottom-30 px-6 py-4">
							<Add_image color={color} img={data.image} showEdit={showEdit} />
						</div>
					</div>
				</div>
				

				<div className="flex pt-30 pt-1 w-full md:w-3/4 px-4">
					<div className="flex flex-col w-full">
						{isEditingBio ? (
							<>
								<textarea
									className="w-full border p-2 rounded-md text-lg"
									value={tempBio}
									onChange={(e) => setTempBio(e.target.value)}
								/>
								<div className="mt-2 flex gap-2">
									<button onClick={saveBio} className="px-4 py-1 bg-green-500 text-white rounded-md">Save</button>
									<button onClick={cancelBioEdit} className="px-4 py-1 bg-gray-300 rounded-md">Cancel</button>
								</div>
							</>
						) : (
							<div className="flex flex-col gap-2 h-full p-4 text-wrap text-2xl mt-4">
								<p>I’m <span className="font-bold uppercase"> {data.username}</span>,</p>
								<p>{form.bio}</p>
								{showEdit &&
									<span
										onClick={() => setIsEditingBio(true)}
										className="ml-auto text-zinc-500 cursor-pointer hover:text-zinc-900 inline-block align-middle"
									>
										<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
										</svg>
									</span>
								}
								
							</div>
						)}
					</div>
				</div>
				{showEdit &&
				<div>
					<AddAudio/>
				</div>
				}
			</div>

			<div className="text-start grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
				{form.details.map((item, index) => (
					<div key={index} className="flex flex-col border border-zinc-200 w-full shadow-md p-4 rounded-md">
						{isEditingDetail === index ? (
							<div className="flex flex-col gap-2">
								<input
									type="text"
									className="w-full p-2 border rounded-md text-base"
									value={tempDetails[index]?.bookmark}
									onChange={(e) => {
										const updated = [...tempDetails];
										updated[index].bookmark = e.target.value;
										setTempDetails(updated);
									}}
								/>
								<textarea
									className="w-full border p-2 rounded-md text-base"
									value={tempDetails[index]?.detail}
									onChange={(e) => {
										const updated = [...tempDetails];
										updated[index].detail = e.target.value;
										setTempDetails(updated);
									}}
								/>
								<div className="flex gap-2">
									<button onClick={() => saveDetail(index)} className="px-3 py-1 bg-green-500 text-white rounded-md">Save</button>
									<button onClick={cancelDetailEdit} className="px-3 py-1 bg-gray-300 rounded-md">Cancel</button>
								</div>
							</div>
						) : (
							<div className="flex flex-col relative bg-white p-2">
								<div className="absolute -top-5 -left-6 bg-rose-500 text-white px-4 py-1 rounded-tr-md rounded-br-md font-semibold text-sm shadow-md border-b-4 border-rose-800 clip-bookmark capitalize">
									<div className="absolute -z-10 inset-0 blur-sm opacity-50 bg-rose-700 rounded-md"></div>
									{item.bookmark}
								</div>
								<p className="ml-2 mt-2 text-gray-800">{item.detail}</p>
								{showEdit &&
									<div
										onClick={() => setIsEditingDetail(index)}
										className="ml-auto text-zinc-500 cursor-pointer hover:text-zinc-900"
									>
										<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
										</svg>
									</div>
								}
							</div>
						)}
					</div>
				))}

				{showEdit && (
					<div>
						{addingNew ? (
							<div className="flex flex-col border border-dashed border-blue-400 w-full shadow-sm p-4 rounded-md">
								<input
									type="text"
									className="w-full p-2 border rounded-md text-base"
									placeholder="Enter heading..."
									value={newBookmark}
									onChange={(e) => setNewBookmark(e.target.value)}
								/>
								<textarea
									className="w-full border p-2 rounded-md text-base mt-2"
									placeholder="Enter detail..."
									value={newDetailText}
									onChange={(e) => setNewDetailText(e.target.value)}
								/>
								<div className="mt-2 flex gap-2">
									<button onClick={addNewDetail} className="px-3 py-1 bg-blue-500 text-white rounded-md">Add</button>
									<button onClick={cancelNewDetail} className="px-3 py-1 bg-gray-300 rounded-md">Cancel</button>
								</div>
							</div>
						) : (
							<button
								onClick={() => setAddingNew(true)}
								className="mt-4 px-4 py-2 border-2 border-blue-400 text-blue-600 rounded-md hover:bg-blue-50 w-fit"
							>
								+ Add Detail
							</button>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

export default Profile;
