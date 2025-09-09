import { useState, useRef } from "react";
import { Upload } from "lucide-react"; 
const apiUrl = import.meta.env.VITE_BACKEND_ADD;

export default function AddAudio({ token }) {
  const [audioFile, setAudioFile] = useState(null);
  const [audioName, setAudioName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFile(file);
      setAudioName(file.name);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!audioFile) return setMessage("Please select an audio file");
    setUploading(true);
    setMessage("");

    try {
      const base64DataUrl = await toBase64(audioFile);
      const base64Clean = base64DataUrl.split(",")[1];

      const response = await fetch(`${apiUrl}/audio/audio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: audioName,
          data: base64Clean,
          contentType: audioFile.type,
        }),
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Upload failed");

      setMessage("✅ Audio uploaded successfully!");
      setAudioFile(null);
      setAudioName("");
      setPreviewUrl(null);
    } catch (err) {
      console.error(err);
      setMessage(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="px-4 w-full flex flex-col gap-4 rounded">
      {!audioFile ? (
        <div className="w-full flex flex-col gap-2 items-start">
          <input
            type="file"
            accept="audio/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            <Upload className="w-5 h-5" />
            Select Music
          </button>
          {message && <p className="text-green-600">{message}</p>}
        </div>
      ) : (
        <div className="mt-4 w-full flex flex-col gap-2">
          <p className="font-semibold">File: <span className="bg-blue-200 text-blue-600 p-1 px-2 rounded-md">{audioName}</span></p>
          <p className="text-sm text-gray-600">
            Size: {(audioFile.size / 1024 / 1024).toFixed(2)} MB
          </p>
          <audio controls src={previewUrl} className="mt-8 bg-zinc-100 rounded-md"/>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleUpload}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
            <button
              className="px-4 py-2 bg-gray-400 text-white rounded"
              onClick={() => {
                setAudioFile(null);
                setAudioName("");
                setPreviewUrl(null);
              }}
              disabled={uploading}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
