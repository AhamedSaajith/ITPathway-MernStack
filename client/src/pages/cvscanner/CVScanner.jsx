import React, { useState } from "react";
import axios from "axios";

export default function CVScanner() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recommendations, setRecommendations] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setData(null);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("⚠️ Please upload a file first.");
      return;
    }
    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("cv", file);

    try {
      const res = await axios.post("http://127.0.0.1:5002/upload-cv", formData);
      setData(res.data);
      setRecommendations(res.data.recommendations);
    } catch (err) {
      console.error("Upload error:", err);
      setError("❌ Failed to scan CV. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: "linear-gradient(to bottom right, #061733, #073d69, #e9eef3)",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="w-full max-w-3xl bg-white/30 backdrop-blur-lg shadow-xl rounded-2xl p-8 border border-blue-200">
        
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-8">
          📄 AI-Powered CV Recommendation
        </h2>

        {/* Upload Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="file"
            accept=".pdf,.docx,.png,.jpg,.jpeg"
            onChange={handleFileChange}
            className="w-full p-3 bg-white border border-gray-300 rounded-lg text-sm shadow-sm"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-800 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition duration-300"
          >
            {loading ? "🔍 Scanning..." : "📤 Upload and Analyze"}
          </button>
        </form>

        {/* Error */}
        {error && (
          <p className="text-red-600 font-semibold text-center mt-4">{error}</p>
        )}

        {/* Result */}
        {data && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              🔮 Gemini Recommendations
            </h3>
            <div className="bg-blue-50 border border-blue-200 p-5 rounded-xl shadow-md text-blue-800 whitespace-pre-line leading-relaxed text-sm">
              {recommendations}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
