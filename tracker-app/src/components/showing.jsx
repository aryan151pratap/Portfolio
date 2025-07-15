import { useState } from "react";
import Preview from "./edit/preview";
import { saveProject, getProject, deleteProject } from './utils/saveProject.jsx';

function Showing({ open_skill, setOpen_skill, setPreview_data, setPublish, routes, showEdit }) {
	const [activeTab, setActiveTab] = useState("preview");

	const handleDelete = async function(id) {
		const confirmDelete = confirm('Are you sure you want to delete this project?');
		if (!confirmDelete) return;
		try {
			const result = await deleteProject(`${routes}/delete/${id}`);
			if(result.ok) {
				setOpen_skill(null);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}

  return(
	<div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center sm:p-1 bg-white">
		<div className="w-full bg-white sm:rounded-lg shadow-2xl overflow-hidden flex flex-col h-screen">
			{/* Header */}
			<div className="flex flex-row justify-between items-start sm:items-center bg-gradient-to-r from-gray-800 to-gray-900 p-2 gap-3">
				{showEdit &&
				<div className="flex flex-row gap-2">
					<button 
						className="p-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md flex items-center gap-1 transition-colors"
						onClick={() => {
							setPreview_data(open_skill.content);
							setPublish(true);
						}}
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
						</svg>
						{/* Edit Project */}
					</button>

					<button
						className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-md flex items-center gap-1 transition-colors"
						onClick={() => handleDelete(open_skill._id)}
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
						</svg>
					</button>
				</div>
				}
				<div className="text-white font-semibold text-sm p-2 bg-gray-600 rounded">
					<span>{open_skill?.skill || open_skill?.name}</span>
				</div>

				<button 
					className="p-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-sm flex items-center gap-1 ml-auto transition-colors"
					onClick={() => setOpen_skill(null)}
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			{/* Tab Navigation */}
			<div className="flex border-b border-gray-200 bg-gray-50">
				<button 
					className={`px-4 py-3 font-medium text-sm ${activeTab === 'preview' ? 'text-blue-600 border-b-2 border-blue-600 bg-white' : 'text-gray-500 hover:text-gray-700'}`}
					onClick={() => setActiveTab("preview")}
				>
					Preview
				</button>
				<button 
					className={`px-4 py-3 font-medium text-sm ${activeTab === 'code' ? 'text-blue-600 border-b-2 border-blue-600 bg-white' : 'text-gray-500 hover:text-gray-700'}`}
					onClick={() => setActiveTab("code")}
				>
					Code
				</button>
				<button 
					className={`px-4 py-3 font-medium text-sm ${activeTab === 'images' ? 'text-blue-600 border-b-2 border-blue-600 bg-white' : 'text-gray-500 hover:text-gray-700'}`}
					onClick={() => setActiveTab("images")}
				>
					Images
				</button>
				</div>

				{/* Content Area */}
				<div className="flex-1 overflow-auto bg-gray-50 sm:p-4">
				<Preview 
					preview_data={open_skill.content} 
					code={activeTab === 'code'} 
					image={activeTab === 'images'}
				/>
			</div>
		</div>
	</div>
  )
}

export default Showing;