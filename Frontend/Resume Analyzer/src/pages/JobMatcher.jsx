import React, { useState } from "react";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const JobMatcher = () => {
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const safeArray = (arr) => (Array.isArray(arr) ? arr : []);

  const handleAnalyze = async () => {
    if (!jobDesc) return alert("Please enter job description");

    setLoading(true);

    try {
      const stored = localStorage.getItem("resumeData");

      if (!stored) {
        alert("Please upload resume first");
        setLoading(false);
        return;
      }

      const resume = JSON.parse(stored);

      const resumeSkills = [
        ...(resume.skills?.technical || []),
        ...(resume.skills?.tools || []),
      ].map((s) => s.toLowerCase());

      const jobWords = jobDesc.toLowerCase().split(/\W+/);

      const matched = resumeSkills.filter((skill) =>
        jobWords.includes(skill)
      );

      const missing = resumeSkills.filter(
        (skill) => !matched.includes(skill)
      );

      const matchScore = resumeSkills.length
        ? Math.round((matched.length / resumeSkills.length) * 100)
        : 0;

      const finalResult = {
        match: matchScore,
        missingSkills: missing,
        suggestions: missing.slice(0, 5).map(
          (s) => `Improve your knowledge in ${s}`
        ),
      };

      setResult(finalResult);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-900 min-h-screen text-white">

      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
        Job Matcher
      </h1>

     
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-4 flex items-center gap-2 text-sm text-gray-400
                   hover:text-white transition-colors active:scale-95"
      >
        ← Back to Dashboard
      </button>

     
      <div className="bg-gray-800 p-4 sm:p-5 rounded-xl shadow-md mb-4 sm:mb-6">
        <textarea
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          placeholder="Paste job description here..."
          className="w-full h-36 sm:h-40 p-3 rounded-lg bg-gray-700 text-white
                     outline-none resize-none text-sm sm:text-base
                     focus:ring-2 focus:ring-purple-500 transition"
        />

        <button
          onClick={handleAnalyze}
          className="mt-3 sm:mt-4 w-full sm:w-auto bg-purple-600
                     hover:bg-purple-700 active:scale-95 transition-transform
                     px-6 py-2.5 rounded-lg text-sm sm:text-base font-semibold"
        >
          Analyze Match
        </button>
      </div>

   
      {loading && <Loader />}

     
      {result && !loading && (
        <div className="bg-gray-800 p-4 sm:p-5 rounded-xl shadow-md space-y-4">

          <h2 className="text-lg sm:text-xl font-semibold">Result</h2>

          <p className="text-sm sm:text-base">
            Match Percentage:{" "}
            <span className="text-green-400 font-bold text-lg sm:text-xl">
              {result.match}%
            </span>
          </p>

          <div>
            <h3 className="text-red-400 font-semibold mb-2 text-sm sm:text-base">
              Missing Skills:
            </h3>
            <ul className="list-disc ml-5 space-y-1 text-sm sm:text-base">
              {safeArray(result.missingSkills).map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-purple-400 font-semibold mb-2 text-sm sm:text-base">
              Suggestions:
            </h3>
            <ul className="list-disc ml-5 space-y-1 text-sm sm:text-base">
              {safeArray(result.suggestions).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

        </div>
      )}
    </div>
  );
};

export default JobMatcher;