"use client";

import React, { useState } from "react";
import { useResources } from "../../hooks/useResources";
import { useAuth } from "../../context/AuthContext";
import api from "../../lib/api";
import ErrorMessage from "../../components/ErrorMessage";
import Hero from "@/components/Hero";
import DLoader from "@/components/DataLoader";
import BasePopover from "@/components/BasePopover";
import { Resource } from "../../hooks/useResources";

function ResourceCard({ resource, onSave }: { resource: Resource; onSave: (id: string) => void }) {
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaving(true);
    try {
      await api.post(`/resources/${resource.id}/save`);
      alert("Resource saved successfully!");
      onSave(resource.id);
    } catch (err) {
      console.error("Failed to save resource:", err);
      alert("Failed to save resource");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <BasePopover
      title={resource.title}
      buttonLabel={resource.title}
    >
      <div className="w-full max-h-[600px] overflow-y-auto">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">{resource.resourceType}</p>
            <p className="text-gray-800 leading-relaxed">{resource.content}</p>
          </div>
          {user?.role.includes("PATIENT") && (
            <button
              onClick={handleSaveClick}
              disabled={isSaving}
              className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded transition-colors"
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          )}
        </div>
      </div>
    </BasePopover>
  );
}

export default function ResourcesPage() {
  const { data, loading, error } = useResources();

  const handleSave = () => {
    // Optionally refetch resources or update state
  };

  if (loading) return <DLoader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      <Hero
        title="Mental Health Resources"
        subtitle="Explore a variety of resources to support your mental health journey."
        imageSrc="/images/resources.jpg"
        reverse={true}
        ctaText="Read More"
        ctaLink="/resources/#resources"
      />
      <div id="resources" className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-green-800 mb-2">Resources</h1>
        <p className="text-gray-600 mb-8">Click on any resource card to read the full content</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((resource) => (
            <div
              key={resource.id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col h-full">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">{resource.resourceType}</p>
                <h2 className="text-lg font-bold text-green-800 mb-3 line-clamp-2">{resource.title}</h2>
                <p className="text-gray-700 text-sm mb-4 flex-grow line-clamp-3">
                  {resource.content.slice(0, 150)}...
                </p>
                <div className="pt-4 border-t border-gray-200">
                  <ResourceCard resource={resource} onSave={handleSave} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
