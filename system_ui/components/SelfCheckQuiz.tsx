"use client";

import React, { useState } from "react";
import api from "../lib/api";
import RecommendedResources from "./RecommendedResources";
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

const answerOptions = [
  { value: 0, label: "Not at all", description: "0 points" },
  { value: 1, label: "Several days", description: "1 point" },
  { value: 2, label: "More than half", description: "2 points" },
  { value: 3, label: "Nearly every day", description: "3 points" },
];

export default function SelfCheckQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(0));
  const [submitted, setSubmitted] = useState(false);
  const [recommendations, setRecommendations] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);

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
      const totalScore = answers.reduce((sum, value) => sum + value, 0);
      const payload = {
        score: totalScore,
        answers,
        takenAt: new Date().toISOString(),
      };

      try {
        const res = await api.post("/self-check", payload, {
          params: {
            userId: Number(user?.userId)
          }
        });
        setScore(totalScore);
        setRecommendations(res.data.recommendedResourceIds);
        setSubmitted(true);
      } catch (error) {
        console.error("Failed to submit self-check:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleRetake = () => {
    setCurrentQuestionIndex(0);
    setAnswers(Array(questions.length).fill(0));
    setSubmitted(false);
    setRecommendations([]);
    setScore(0);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Results Header */}
            <div className="text-center mb-12">
              <div className="inline-block mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">{score}</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-green-800 mb-3">Assessment Complete</h1>
              <p className="text-gray-600 text-lg">Your total score is <span className="font-semibold text-green-700">{score} out of 21</span></p>
              
              {/* Score Interpretation */}
              <div className="mt-6 p-6 bg-white rounded-lg border border-gray-200 inline-block">
                <p className="text-gray-700">
                  {score <= 4 && "Your score suggests minimal symptoms. Keep maintaining your mental wellness routine!"}
                  {score > 4 && score <= 9 && "Your score suggests mild symptoms. Consider exploring the resources below for support."}
                  {score > 9 && score <= 14 && "Your score suggests moderate symptoms. We recommend reviewing the resources and considering professional support."}
                  {score > 14 && "Your score suggests notable symptoms. Please reach out to a mental health professional for personalized guidance."}
                </p>
              </div>
            </div>

            {/* Resources Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
              <RecommendedResources resourceIds={recommendations} />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleRetake}
                className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors duration-200"
              >
                Retake Assessment
              </button>
              <a
                href="/therapists"
                className="px-8 py-3 border-2 border-green-600 text-green-600 hover:bg-green-50 rounded-lg font-semibold transition-colors duration-200"
              >
                Find a Therapist
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-green-800 mb-2">Mental Health Assessment</h1>
            <p className="text-gray-600">A quick 7-question assessment based on PHQ-7</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-700">Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span className="text-sm font-medium text-green-600">{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-8 mb-8">
            <p className="text-xl font-semibold text-gray-800 mb-8">
              {questions[currentQuestionIndex]}
            </p>

            {/* Answer Options Grid */}
            <div className="space-y-3">
              {answerOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left flex items-center justify-between group ${
                    answers[currentQuestionIndex] === option.value
                      ? "border-green-600 bg-green-50"
                      : "border-gray-200 hover:border-green-300 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      answers[currentQuestionIndex] === option.value
                        ? "border-green-600 bg-green-600"
                        : "border-gray-300 group-hover:border-green-300"
                    }`}>
                      {answers[currentQuestionIndex] === option.value && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{option.label}</p>
                      <p className="text-sm text-gray-500">{option.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={loading}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
                loading
                  ? "bg-gray-200 text-gray-700 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  {currentQuestionIndex === questions.length - 1 ? "Submit Assessment" : "Next Question"}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </div>

          {/* Help Text */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-gray-700">
            <p>💡 <span className="font-medium">Tip:</span> Answer based on how you've felt over the last two weeks. There are no right or wrong answers.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
