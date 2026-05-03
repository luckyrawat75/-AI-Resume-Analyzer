

import API from "./api";

// 📄 Upload Resume
export const uploadResume = async (file) => {
  try {
    const formData = new FormData();
    formData.append("resume", file);

    const res = await API.post("/resume/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    throw error.response?.data || "Upload failed";
  }
};

// 📊 Get Resume Analysis
export const getAnalysis = async () => {
  try {
    const res = await API.get("/resume/analysis");
    return res.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch analysis";
  }
};

// 💼 Job Matcher
export const matchJob = async (jobDesc) => {
  try {
    const res = await API.post("/job/match", { jobDesc });
    return res.data;
  } catch (error) {
    throw error.response?.data || "Job match failed";
  }
};