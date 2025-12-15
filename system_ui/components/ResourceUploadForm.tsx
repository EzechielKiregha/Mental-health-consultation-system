"use client";

import React, { useState } from "react";
import api from "../lib/api";
import Loader from "./Loader";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeft } from "lucide-react";

const questions = [
  "Over the last two weeks, how often have you had little interest or pleasure in doing things?",
  "Over the last two weeks, how often have you felt down, depressed, or hopeless?",
  "Over the last two weeks, how often have you had trouble falling or staying asleep, or sleeping too much?",
  "Over the last two weeks, how often have you felt tired or had little energy?",
  "Over the last two weeks, how often have you had poor appetite or overeating?",
  "Over the last two weeks, how often have you had trouble concentrating on things, such as reading or watching TV?",
  "Over the last two weeks, how often have you been feeling nervous, anxious, or on edge?",
];

export default function ResourceUploadForm() {

  const { user } = useAuth();
  const [form, setForm] = useState({
    title: "",
    content: "",
    resourceType: "",
  });
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {

      if (!user?.userId) {
        setError("User not authenticated");
        return;
      } else {
        console.log("User ID:", user.userId);
        console.log("Form data:", form);
        const res = await api.post("/resources/upload", form, {
          params: { userId: user.userId, questionIndex },
        });
        if (res.status === 200) {
          setSuccess(true);
          setForm({ title: "", content: "", resourceType: "ARTICLE" });
          setQuestionIndex(0);
        } else {
          setError("Failed to upload resource. Please try again.");
        }
      }
    } catch (err) {
      setError("Failed to upload resource. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <a href="/dashboard" className="inline-flex items-center text-green-600 hover:text-green-700 font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to dashboard
          </a>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-green-800 mb-2">Upload Resource</h1>
            <p className="text-gray-600">Share helpful resources linked to specific assessment questions</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700">{error}</p>
            </div>
          )}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700">✓ Resource uploaded successfully!</p>
            </div>
          )}

          {/* Question Display */}
          <div className="mb-8 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">Question #{questionIndex + 1}</p>
            <p className="text-lg font-semibold text-gray-800">{questions[questionIndex]}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Resource Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter a descriptive title"
                value={form.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <textarea
                name="content"
                placeholder="Provide detailed content for this resource..."
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none transition-colors"
                rows={6}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Resource Type</label>
                <select
                  name="resourceType"
                  value={form.resourceType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none transition-colors"
                  required
                >
                  <option value="">Select a type</option>
                  <option value="ARTICLE">Article</option>
                  <option value="EXERCISE">Exercise</option>
                  <option value="GUIDE">Guide</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Link to Question</label>
                <select
                  value={questionIndex}
                  onChange={e => setQuestionIndex(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none transition-colors"
                >
                  {questions.map((_, i) => (
                    <option key={i} value={i}>Question #{i + 1}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                loading
                  ? "bg-gray-200 text-gray-700 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {loading ? (
                <>
                  <Loader />
                  Uploading...
                </>
              ) : (
                "Upload Resource"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
