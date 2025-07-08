function WaterChart({ level = 75, skill = "React" }) {
  const waveHeight = 100 - level;

  return (
    <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-blue-400 shadow-lg">
      {/* Water background */}
      <div
        className="absolute w-full bottom-0 bg-blue-400"
        style={{ height: `${level}%` }}
      ></div>

      {/* Animated wave */}
      <svg
        className="absolute bottom-0 left-0 w-[200%] h-full animate-wave"
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        style={{ bottom: `${waveHeight}%` }}
      >
        <path
          d="M0,30 C150,80 350,0 600,30 C850,60 1050,10 1200,30 L1200,100 L0,100 Z"
        //   fill="#3b82f6"
		  className="bg-blue-500"
          opacity="1"
        />
      </svg>

      {/* Skill label */}
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-white font-bold text-xl">{skill} - {level}%</p>
      </div>
    </div>
  );
}

export default WaterChart;