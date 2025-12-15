"use client";

import React from "react";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Hero from "@/components/Hero";
import FAQSection from "@/components/FAQSection";

export default function LandingPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <Hero
        title="Empower Your Mind"
        subtitle="Connect with therapists, track your well-being, and join our supportive community."
        imageSrc="/mental-health-awareness.jpg"
        ctaText="Get Started"
        ctaLink="/signup"
      />

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-12">How We Can Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-100 mb-4">
                <span className="text-xl">📋</span>
              </div>
              <h3 className="text-lg font-bold text-green-800">Self-Check Quiz</h3>
              <p className="mt-3 text-gray-700">
                Take a quick quiz to assess your mental well-being and get personalized insights.
              </p>
              <a href="/self-check">
                <Button className="mt-4 cursor-pointer w-full">Start Quiz</Button>
              </a>
            </Card>
            <Card>
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-100 mb-4">
                <span className="text-xl">👨‍⚕️</span>
              </div>
              <h3 className="text-lg font-bold text-green-800">Connect with Therapists</h3>
              <p className="mt-3 text-gray-700">
                Find and book appointments with professional, licensed therapists.
              </p>
              <a href="/therapists">
                <Button className="mt-4 cursor-pointer w-full">Find Therapists</Button>
              </a>
            </Card>
            <Card>
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-100 mb-4">
                <span className="text-xl">💬</span>
              </div>
              <h3 className="text-lg font-bold text-green-800">Supportive Resources</h3>
              <p className="mt-3 text-gray-700">
                Access a library of articles, guides, and tools to support your mental health journey.
              </p>
              <a href="/resources">
                <Button className="mt-4 cursor-pointer w-full">Explore Resources</Button>
              </a>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-green-800 mb-6">Why Choose Our Platform?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="text-green-600 font-bold text-2xl">✓</span>
                  <div>
                    <h3 className="font-bold text-gray-800">Professional Therapists</h3>
                    <p className="text-gray-600 text-sm">Licensed and vetted professionals ready to help.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-green-600 font-bold text-2xl">✓</span>
                  <div>
                    <h3 className="font-bold text-gray-800">Completely Confidential</h3>
                    <p className="text-gray-600 text-sm">Your privacy and security are our top priorities.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-green-600 font-bold text-2xl">✓</span>
                  <div>
                    <h3 className="font-bold text-gray-800">Flexible Scheduling</h3>
                    <p className="text-gray-600 text-sm">Book sessions at times that work for you.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-green-600 font-bold text-2xl">✓</span>
                  <div>
                    <h3 className="font-bold text-gray-800">Comprehensive Support</h3>
                    <p className="text-gray-600 text-sm">From self-assessment to ongoing therapy and resources.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img
                src="/images/The-Crucial-Years-Supporting-Mental-Health-Care-for-Children.png"
                alt="Platform Overview"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <div className="flex items-start gap-4">
                <img
                  src="/images/avatar1.png"
                  alt="User Avatar"
                  className="w-14 h-14 rounded-full flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 font-medium">"This platform has genuinely changed my life for the better. The therapists are incredibly supportive."</p>
                  <p className="text-gray-500 text-sm mt-2">Sarah M.</p>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex items-start gap-4">
                <img
                  src="/images/avatar1.png"
                  alt="User Avatar"
                  className="w-14 h-14 rounded-full flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 font-medium">"The self-check quiz helped me understand myself better. Highly recommended!"</p>
                  <p className="text-gray-500 text-sm mt-2">John D.</p>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex items-start gap-4">
                <img
                  src="/images/avatar1.png"
                  alt="User Avatar"
                  className="w-14 h-14 rounded-full flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 font-medium">"The resources here are incredibly helpful and easy to understand. Great content!"</p>
                  <p className="text-gray-500 text-sm mt-2">Emma L.</p>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex items-start gap-4">
                <img
                  src="/images/avatar1.png"
                  alt="User Avatar"
                  className="w-14 h-14 rounded-full flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 font-medium">"Professional, confidential, and truly cares about mental health. Perfect platform!"</p>
                  <p className="text-gray-500 text-sm mt-2">Michael R.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg mb-8 opacity-90">Take the first step towards better mental health today.</p>
          <a href="/signup">
            <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors duration-200">
              Get Started Free
            </button>
          </a>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-12">Frequently Asked Questions</h2>
          <FAQSection />
        </div>
      </section>
    </div>
  );
}
