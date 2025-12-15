import React from "react";
import RequireAuth from "../../../components/RequireAuth";
import ResourceUploadForm from "../../../components/ResourceUploadForm";
import Hero from "@/components/Hero";

export default function UploadPage() {
  return (
    <RequireAuth>
      <div id="upload" className="container mx-auto px-4 py-8">
        <ResourceUploadForm />
      </div>
    </RequireAuth>
  );
}
