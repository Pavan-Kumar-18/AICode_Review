const SUPPORTED_LANGUAGES = [
  "auto", "javascript", "typescript", "python", "java", "c", "cpp",
  "csharp", "go", "rust", "php", "ruby", "swift", "kotlin",
  "sql", "html", "css", "bash", "json", "yaml",
];

function validateReviewRequest(req, res, next) {
  const { code, language } = req.body;

  if (!code || typeof code !== "string") {
    return res.status(400).json({ error: "code field is required and must be a string." });
  }

  if (code.trim().length < 5) {
    return res.status(400).json({ error: "Code is too short. Please provide at least a few lines." });
  }

  if (code.trim().length > 8000) {
    return res.status(400).json({ error: "Code is too long. Maximum 8,000 characters allowed." });
  }

  if (language && !SUPPORTED_LANGUAGES.includes(language)) {
    return res.status(400).json({ error: "Unsupported language." });
  }

  req.body.code = code.trim();
  req.body.language = language || "auto";
  next();
}

module.exports = { validateReviewRequest };