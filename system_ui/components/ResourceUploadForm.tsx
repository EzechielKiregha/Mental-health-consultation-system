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
    <div className="container mx-auto px-4 py-8">
      <span className="text-gray-600 mb-4">
        <ArrowLeft className="inline mr-2" />
        <a href="/dashboard" className="text-green-600 hover:underline">
          Back to dashboard
        </a>
      </span>
      <h1 className="text-2xl font-bold text-green-800 mb-4">Upload Resource</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">Resource uploaded successfully!</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:border-green-600 focus:ring-1 focus:ring-green-600"
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:border-green-600 focus:ring-1 focus:ring-green-600"
          rows={4}
          required
        />
        <select
          title="Resource Type"
          name="resourceType"
          value={form.resourceType}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:border-green-600 focus:ring-1 focus:ring-green-600"
        >
          <option value="ARTICLE">Article</option>
          <option value="EXERCISE">Exercise</option>
          <option value="GUIDE">Guide</option>
        </select>
        <label>
          Question #
          <select
            value={questionIndex}
            onChange={e => setQuestionIndex(Number(e.target.value))}
            className="border p-2 rounded ml-2"
          >
            {questions.map((_, i) => <option key={i} value={i}>{i + 1}</option>)}
          </select>
        </label>
        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-2 ${loading ? "bg-green-200 hover:bg-green-300 text-green-900" : "bg-green-600 hover:bg-green-700 text-white"} rounded disabled:opacity-50`}
        >
          {loading ? <Loader message="Uploading..." /> : "Upload"}
        </button>
      </form>
    </div>
  );
}
