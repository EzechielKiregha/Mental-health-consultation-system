import React from "react";
import { useEmergencyContacts } from "../../hooks/useEmergencyContacts";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import Hero from "@/components/Hero";

export default function EmergencyPage() {
  const { data, loading, error } = useEmergencyContacts();

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <><Hero
      title="Emergency Contacts"
      subtitle="Reach out to your trusted contacts in times of need."
      imageSrc="/images/ba-crisis-assistance.png"
      reverse={false}
      ctaText="Get Started"
      ctaLink="/emergency/#contacts" // Adjust the link as needed
    />
      <div id="contacts" className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-green-800 mb-4">Emergency Contacts</h1>
        <ul className="space-y-4">
          {data?.map((contact) => (
            <li key={contact.id} className="bg-green-50 border border-green-600 rounded-lg p-4 shadow-sm">
              <h2 className="text-lg font-bold text-green-800">{contact.name}</h2>
              <p className="text-sm text-gray-600">{contact.relationship}</p>
              <p className="text-gray-800">{contact.phone}</p>
            </li>
          ))}
        </ul>
      </div></>
  );
}
