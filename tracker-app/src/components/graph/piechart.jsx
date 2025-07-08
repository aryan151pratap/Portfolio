function Piechart({ data }) {
  const colors = [
    { main: "#3b82f6", light: "#81b6fb" },
    { main: "#10b981", light: "#5ee7b2" },
    { main: "#f59e0b", light: "#fbc966" },
    { main: "#ef4444", light: "#f98b8b" },
    { main: "#8b5cf6", light: "#bb9dfb" },
    { main: "#ec4899", light: "#f58dc0" },
    { main: "#06b6d4", light: "#5ee3f0" },
    { main: "#22d3ee", light: "#7deafa" },
	{ main: "#eab308", light: "#fde047" },
  ];

  const getColorByLevel = (level) => {
    if (level >= 90) return colors[0];
    if (level >= 80) return colors[1];
    if (level >= 70) return colors[8];
    if (level >= 60) return colors[2];
    return colors[3];
  };

  return (
    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-8 p-4">
      {data.map((item, i) => {
        const degree = (item.level / 100) * 360;
        const color = getColorByLevel(item.level);

        return (
          <div key={i} className="group relative w-full flex flex-col items-center justify-center gap-2">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center border-4 border-white shadow-md"
              style={{
                background: `conic-gradient(${color.main} 0deg ${degree}deg, ${color.light} ${degree}deg 360deg)`,
              }}
            >
              <div className="absolute top-0 right-0 border border-zinc-300 p-2 bg-white rounded shadow-md opacity-0 group-hover:opacity-100 transition duration-200">
                <p className="text-sm font-semibold">{item.level}%</p>
                <p className="text-xs text-zinc-600">{item.skill}</p>
              </div>
			  
			  {/* <div></div> */}
				<div className="w-15 h-15 bg-white rounded-full">
				<p className="text-zinc-600 w-full h-full flex items-center justify-center">{item.level}%</p>
				</div>

            </div>
            <div className="bg-white text-center">
					<p className="text-sm font-medium text-zinc-700">{item.skill}</p>
					<p className="text-xs text-zinc-500">{item.level}%</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Piechart;
