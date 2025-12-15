"use client";

import React, { useState } from "react";
import api from "../lib/api";
import RecommendedResources from "./RecommendedResources";
import BasePopover from "./BasePopover";
import { useAuth } from "@/context/AuthContext";

const questions = [
  "Over the last two weeks, how often have you had little interest or pleasure in doing things?",
  "Over the last two weeks, how often have you felt down, depressed, or hopeless?",
  "Over the last two weeks, how often have you had trouble falling or staying asleep, or sleeping too much?",
  "Over the last two weeks, how often have you felt tired or had little energy?",
  "Over the last two weeks, how often have you had poor appetite or overeating?",
  "Over the last two weeks, how often have you had trouble concentrating on things, such as reading or watching TV?",
  "Over the last two weeks, how often have you been feeling nervous, anxious, or on edge?",
];

export default function SelfCheckQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(0));
  const [submitted, setSubmitted] = useState(false);
  const [recommendations, setRecommendations] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const { user } = useAuth();

  const handleAnswer = (value: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = value;
    setAnswers(updatedAnswers);
  };

  const handleNext = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setLoading(true);
      const score = answers.reduce((sum, value) => sum + value, 0);
      const payload = {
        score,
        answers,
        takenAt: new Date().toISOString(),
      };

      try {
        const res = await api.post("/self-check", payload, {
          params: {
            userId: Number(user?.userId)
          }
        });
        setRecommendations(res.data.recommendedResourceIds);
        setSubmitted(true);
        setPopoverOpen(true);
      } catch (error) {
        console.error("Failed to submit self-check:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (submitted) {
    return (
      <div className="container mx-auto p-4">
        {/* your quiz UI here */}
        <BasePopover
          title="Your Recommendations"
          buttonLabel=""           // hide the trigger, we'll open programmatically
          isOpen={isPopoverOpen}
          onClose={() => setPopoverOpen(false)}
        >
          <RecommendedResources resourceIds={recommendations} />
        </BasePopover>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-green-50 border border-green-600 rounded-lg p-6">
        <p className="text-lg font-semibold text-green-800">{questions[currentQuestionIndex]}</p>
        <div className="flex gap-4 mt-4">
          {["Not at all", "Several days", "More than half the days", "Nearly every day"].map((label, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`px-4 py-2 rounded font-semibold ${answers[currentQuestionIndex] === index
                ? "bg-green-600 text-white"
                : "bg-white text-green-800 border border-green-600"
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <button
          onClick={handleNext}
          disabled={loading}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded disabled:opacity-50"
        >
          {currentQuestionIndex === questions.length - 1 ? "DONE" : "Next"}
        </button>
      </div>
    </div>
  );
}
