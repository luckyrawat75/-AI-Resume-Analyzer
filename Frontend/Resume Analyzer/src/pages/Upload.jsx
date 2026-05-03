import React, { useState } from "react";
import Loader from "../components/Loader";
import API from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return toast.error("Please select a file ❌");

    const formData = new FormData();
    formData.append("resume", file);

    setLoading(true);

    try {
      const res = await API.post("/resume/upload", formData);
     
      toast.success("Resume analyzed successfully 🎉");
      setResult(res.data.data);
      localStorage.setItem("resumeData", JSON.stringify(res.data.data));
      setFile(null);
    } catch (error) {
      console.error("❌ ERROR:", error.response?.data);
      toast.error(error.response?.data?.message || "Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const safeArray = (arr) => (Array.isArray(arr) ? arr : []);

  return (
    <div className="p-4 sm:p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
        Upload Resume
      </h1>

      <button
        onClick={() => navigate("/dashboard")}
        className="mb-4 flex items-center gap-2 text-sm text-gray-400
             hover:text-white transition-colors active:scale-95"
      >
        ← Back to Dashboard
      </button>
      
      <div className="bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md w-full max-w-xl mx-auto sm:mx-0">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="mb-4 block w-full text-sm text-gray-300
            file:mr-3 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
            file:bg-purple-600 file:text-white
            hover:file:bg-purple-700 file:cursor-pointer
            file:active:scale-95 file:transition-transform"
        />

        <button
          onClick={handleUpload}
          className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700
                     active:scale-95 transition-transform
                     px-6 py-2.5 rounded-lg text-sm sm:text-base font-semibold"
        >
          Upload Resume
        </button>

        {file && (
          <p className="mt-3 text-sm text-gray-400 truncate">
            Selected: {file.name}
          </p>
        )}
      </div>

     
      {loading && (
        <div className="mt-6 flex justify-center">
          <Loader />
        </div>
      )}

   
      {result && (
        <div className="mt-6 bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md w-full max-w-xl mx-auto sm:mx-0 space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-purple-400">
            Analysis Result
          </h2>

        
          <p className="text-green-400 text-sm sm:text-base">
            <b>Score:</b>{" "}
            <span className="text-2xl sm:text-3xl font-bold">
              {result.score || 0}%
            </span>
          </p>

        
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm sm:text-base">
            <p>
              <b>Technical Skills:</b>{" "}
              <span className="text-gray-300">
                {safeArray(result.skills?.technical).join(", ") || "N/A"}
              </span>
            </p>
            <p>
              <b>Soft Skills:</b>{" "}
              <span className="text-gray-300">
                {safeArray(result.skills?.soft).join(", ") || "N/A"}
              </span>
            </p>
            <p>
              <b>Tools:</b>{" "}
              <span className="text-gray-300">
                {safeArray(result.skills?.tools).join(", ") || "N/A"}
              </span>
            </p>
          </div>

         
          <p className="text-red-400 text-sm sm:text-base">
            <b>Missing Skills:</b>{" "}
            {safeArray(result.missingSkills).join(", ") || "N/A"}
          </p>

      
          <div>
            <b className="text-sm sm:text-base">Strengths:</b>
            <ul className="list-disc ml-5 mt-1 text-green-300 space-y-1 text-sm sm:text-base">
              {safeArray(result.strengthPoints).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

   
          <div>
            <b className="text-sm sm:text-base">Weaknesses:</b>
            <ul className="list-disc ml-5 mt-1 text-red-300 space-y-1 text-sm sm:text-base">
              {safeArray(result.weaknesses).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

      
          <div>
            <b className="text-sm sm:text-base">Suggestions:</b>
            <ul className="list-disc ml-5 mt-1 text-gray-300 space-y-1 text-sm sm:text-base">
              {safeArray(result.suggestions).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

       
          <p className="text-yellow-400 text-sm sm:text-base pt-1 border-t border-gray-700">
            <b>Verdict:</b> {result.overallVerdict || "N/A"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Upload;
