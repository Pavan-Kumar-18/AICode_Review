const express = require("express");
const router = express.Router();
const { reviewCode } = require("../services/openaiService");
const { validateReviewRequest } = require("../middleware/validate");

router.post("/", validateReviewRequest, async (req, res) => {
  const { code, language } = req.body;

  try {
    const result = await reviewCode(code, language);
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error("Review error:", err.message);

    if (err.status === 429) {
      return res.status(429).json({ error: "Gemini rate limit reached. Please wait and try again." });
    }

    if (err instanceof SyntaxError) {
      return res.status(500).json({ error: "Failed to parse AI response. Please try again." });
    }

    return res.status(500).json({ error: "Failed to review code. Please try again." });
  }
});

router.get("/languages", (req, res) => {
  const languages = [
    "auto", "javascript", "typescript", "python", "java", "c", "cpp",
    "csharp", "go", "rust", "php", "ruby", "swift", "kotlin",
    "sql", "html", "css", "bash", "json", "yaml",
  ];
  res.json({ languages });
});

module.exports = router;