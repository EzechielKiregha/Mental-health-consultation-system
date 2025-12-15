"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-green-800 mb-6">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-green-800 font-semibold">
            What is Mental Health Support?
          </AccordionTrigger>
          <AccordionContent className="text-gray-800">
            Mental Health Support is a platform designed to help users connect with therapists,
            perform self-checks, access resources, and manage their mental health effectively.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-green-800 font-semibold">
            How do I book an appointment?
          </AccordionTrigger>
          <AccordionContent className="text-gray-800">
            You can book an appointment by navigating to the "Appointments" section in your dashboard
            and selecting a suitable time slot with your preferred therapist.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-green-800 font-semibold">
            Are the resources free to access?
          </AccordionTrigger>
          <AccordionContent className="text-gray-800">
            Yes, all resources provided on the platform are free to access for registered users.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-green-800 font-semibold">
            How do I perform a self-check?
          </AccordionTrigger>
          <AccordionContent className="text-gray-800">
            You can perform a self-check by navigating to the "Self-Check" section, answering the
            questions, and receiving personalized recommendations based on your responses.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
