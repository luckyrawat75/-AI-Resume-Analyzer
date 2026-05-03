const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const ANALYSIS_SCHEMA = `{
  "candidateName": "string",
  "currentRole": "string",
  "experienceYears": "number",
  "score": "number (0-100, weighted average of scoreBreakdown)",
  "scoreBreakdown": {
    "formatting": "number (0-20): ATS-friendly layout, consistent structure, no tables/columns",
    "relevance": "number (0-20): experience matches target roles",
    "impact": "number (0-20): achievements are quantified with numbers/% /$",
    "keywords": "number (0-20): industry-standard tech terms present",
    "clarity": "number (0-20): concise, professional, no fluff"
  },
  "skills": {
    "technical": ["programming languages, frameworks, databases"],
    "soft": ["leadership, communication, teamwork etc"],
    "tools": ["IDEs, CI/CD, cloud platforms, dev tools"],
    "certifications": ["any listed certifications or courses"]
  },
  "missingSkills": ["important skills NOT in resume but expected for this role"],
  "strengthPoints": ["3-5 specific, evidence-based strengths from the resume"],
  "weaknesses": ["3-5 honest, specific weaknesses or gaps"],
  "suggestions": [
    "7-10 concrete, prioritized, actionable improvements",
    "Each must reference a specific section or line in the resume"
  ],
  "atsKeywords": {
    "found": ["industry keywords present in resume"],
    "missing": ["high-value ATS keywords absent from resume"]
  },
  "sectionPresence": {
    "summary": "boolean",
    "experience": "boolean",
    "education": "boolean",
    "skills": "boolean",
    "projects": "boolean",
    "certifications": "boolean",
    "achievements": "boolean",
    "linkedin": "boolean"
  },
  "impactScore": {
    "hasQuantifiedAchievements": "boolean",
    "quantifiedCount": "number of bullet points with metrics",
    "exampleAchievements": ["best 2-3 quantified achievements found"]
  },
  "redFlags": ["any serious issues: gaps, job hopping, vague descriptions, etc."],
  "overallVerdict": "2-3 sentence hiring manager summary with hire/no-hire lean"
}`;

const analyzeResume = async (text) => {
  try {
    const cleanText = text
      .replace(/\s+/g, " ")
      .replace(/[^\x20-\x7E\n]/g, "")
      .trim()
      .substring(0, 4000);

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.1,
      max_tokens: 2000,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You are a world-class ATS system and senior technical recruiter with 20+ years hiring for FAANG and top startups. 

RULES:
1. Return ONLY valid JSON matching the exact schema provided — zero extra text
2. Be brutally honest — do NOT inflate scores to be nice
3. Every suggestion must be specific and reference actual resume content
4. Score strictly: most resumes score 40-70, only exceptional ones score 80+
5. redFlags must be honest — gaps, vague bullets, missing metrics, etc.
6. missingSkills must be role-appropriate, not generic`,
        },
        {
          role: "user",
          content: `Analyze this resume and return ONLY valid JSON matching this exact schema:

${ANALYSIS_SCHEMA}

SCORING GUIDE (be strict):
- 0-40: Major issues, not ready to submit
- 41-60: Needs significant work
- 61-75: Average, would pass some ATS filters  
- 76-85: Strong resume, interview-worthy
- 86-100: Exceptional, reserved for near-perfect resumes

RESUME TEXT:
---
${cleanText}
---

Return ONLY the JSON object. No explanation. No markdown.`,
        },
      ],
    });

    const rawText = response.choices[0]?.message?.content?.trim();

    if (!rawText) throw new Error("Empty response from Groq");

    console.log("✅ GROQ RAW:", rawText.substring(0, 200) + "...");

    return parseGroqResponse(rawText);
  } catch (error) {
    console.error("GROQ ERROR:", error.message);
    return null;
  }
};

// 🛡️ Robust parser with multiple fallback strategies
const parseGroqResponse = (rawText) => {
  // Strategy 1: Direct parse (works when response_format is enforced)
  try {
    return JSON.parse(rawText);
  } catch (_) {}

  // Strategy 2: Extract JSON from markdown code fences
  try {
    const fenceMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (fenceMatch) return JSON.parse(fenceMatch[1].trim());
  } catch (_) {}

  // Strategy 3: Find first { ... } block
  try {
    const start = rawText.indexOf("{");
    const end = rawText.lastIndexOf("}");
    if (start !== -1 && end !== -1) {
      return JSON.parse(rawText.slice(start, end + 1));
    }
  } catch (_) {}

  // Strategy 4: Fallback with partial data preserved
  console.warn("⚠️ All parse strategies failed, returning fallback");
  return {
    score: 0,
    skills: { technical: [], soft: [], tools: [], certifications: [] },
    missingSkills: [],
    strengthPoints: [],
    weaknesses: [],
    suggestions: ["Resume parsing failed — please try re-uploading"],
    redFlags: ["Could not parse AI response"],
    overallVerdict: "Analysis incomplete due to parsing error.",
    _parseError: true,
  };
};

module.exports = { analyzeResume };
