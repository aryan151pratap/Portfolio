import { useEffect, useState } from "react";

function Bubble(){
	
	const [bubbles, setBubbles] = useState([]);
	  
	useEffect(() => {
		const generateBubbles = () => {
		const colors = ['blue', 'pink', 'purple', 'teal', 'amber', 'emerald'];
		const newBubbles = Array.from({ length: 20 }, (_, i) => ({
			id: i,
			size: Math.random() * 4 + 1, // 1-5
			color: colors[Math.floor(Math.random() * colors.length)],
			left: Math.random() * 100,
			duration: Math.random() * 15 + 10, // 10-25 seconds
			delay: Math.random() * 5,
			top: Math.random() * 100
		}));
		setBubbles(newBubbles);
		};
		
		generateBubbles();
	}, []);

	return(
		<>
		<div className="flex flex-wrap items-center justify-center overflow-hidden">
			{bubbles.map((bubble) => (
			<div
				key={bubble.id}
				className={`absolute rounded-full bg-${bubble.color}-500 opacity-40 animate-float`}
				style={{
				width: `${bubble.size}rem`,
				height: `${bubble.size}rem`,
				left: `${bubble.left}%`,
				top: `${bubble.top}%`,
				animationDuration: `${bubble.duration}s`,
				animationDelay: `${bubble.delay}s`,
				}}
			/>
			))}

		</div>
		</>
	)
}

export default Bubble;