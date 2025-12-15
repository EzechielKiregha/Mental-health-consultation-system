import React from "react";
import SelfCheckQuiz from "../../components/SelfCheckQuiz";
import Hero from "@/components/Hero";

export default function SelfCheckPage() {
  return (
    <><Hero
      title="Self-Check Quiz"
      subtitle="Assess your mental health with our self-check quiz."
      imageSrc="/images/Mental-Health-consultation.jpg"
      reverse={false}
      ctaText="Start Quiz"
      ctaLink="/self-check/#quiz" // Adjust the link as needed
    /><div id="quiz" className="container mx-auto px-4 py-8">
        <SelfCheckQuiz />
      </div></>
  );
}
