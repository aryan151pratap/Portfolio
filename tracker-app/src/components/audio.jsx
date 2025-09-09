import { useState, useRef, useEffect } from "react";
const apiUrl = import.meta.env.VITE_BACKEND_ADD;

export default function Audio({ userId, currentTime, setCurrentTime, duration, setDuration }) {
  const audioRef = useRef(null);
  const [music, setMusic] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const getMusic = async () => {
      try {
        const res = await fetch(`${apiUrl}/audio/music/${userId}`, {
          method: "GET",
          credentials: "include",
        });
        const result = await res.json();
        if (res.ok && result.music) {
          const audioData = `data:${result.music.contentType};base64,${result.music.data}`;
          setMusic({ ...result.music, audioSrc: audioData });
		  audioRef.current.volume = volume;
        }
      } catch (err) {
        console.log(err);
      }
    };
    getMusic();
  }, [userId]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          console.log("Playback failed: user interaction required");
        });
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className={`fixed bottom-2 right-2 bg-blue-400 text-white ${collapsed ? "p-2" : "p-2"} rounded-xl shadow-lg flex flex-col z-50`}>
      <div className="flex items-center gap-2">
		{collapsed &&
			<div className="flex items-center gap-2">
				<button
				onClick={togglePlay}
				className="bg-blue-500 hover:bg-blue-600 p-2 rounded-full"
				>
				{isPlaying ? "⏸" : "▶️"}
				</button>

				<div>
				<p className="text-sm font-medium">{music?.name}</p>
				<p className="text-xs text-gray-300">
					{formatTime(currentTime)} / {formatTime(duration)}
				</p>
				</div>
			</div>
		}

		<button className="p-1 bg-blue-500 rounded-md hover:bg-blue-600 cursor-pointer"
			onClick={() => setCollapsed(!collapsed)}
		>
			{collapsed ? "⬅️" : "➡️"}
		</button>
      </div>

	  {collapsed &&
	  	<div className="flex items-center gap-1 h-fit mt-1">
			<input
				type="range"
				min="0"
				max="1"
				step="0.01"
				value={volume}
				onChange={handleVolumeChange}
				className="w-full h-1 mt-2"
			/>
		</div>
	}

      {music?.audioSrc && (
        <audio
          ref={audioRef}
          loop
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        >
          <source src={music.audioSrc} type={music.contentType} />
        </audio>
      )}
    </div>
  );
}
