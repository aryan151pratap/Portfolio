import { useState } from "react";
import upload from '../image/upload.png';
import { compressImage } from "./utils/imagCompressor";
import { saveProject } from "./utils/saveProject";
import { useEffect } from "react";

function Add_image({ color, img, showEdit }){

	const [image, setImage] = useState('');

	useEffect(() => {
		setImage(img);
	}, [])

	const handleImageChange = async (e) => {
		const file = e.target.files[0];
		if (file) {
			const base64Compressed = await compressImage(file);
			setImage(base64Compressed);
			console.log(base64Compressed);
			await saveProject('remember/image', {image: base64Compressed})
		}
	};

	const newCOlor = color === 'zinc' ? color+"-400" : 'zinc-200';

	return(
		<>
		<div className="w-[140px] h-[140px] sm:w-[200px] sm:h-[200px] md:w-[200px] md:h-[200px]">
		{image ?
		<div className="w-full h-full">
			<img src={image} alt="" className="w-full h-full object-cover border-4 border-white rounded-full"/>
		</div>
		:
		<div className={`w-full h-full bg-${newCOlor} border-4 border-white rounded-full`}>
			<div className={`w-full h-full flex items-center justify-center`}>
				<p className={`font-thin text-${'white'}`}>No Profile</p>
			</div>
		</div>
		}
		{showEdit &&
			<div className="w-full flex justify-end px-2">
			<label htmlFor="image-upload" className="cursor-pointer">
				<img src={upload} alt="Upload" className="w-8 h-8" />
			</label>
			<input
				id="image-upload"
				type="file"
				accept="image/*"
				onChange={handleImageChange}
				className="hidden" 
				/>
			</div>
		}
		</div>
		</>
	)
}

export default Add_image;