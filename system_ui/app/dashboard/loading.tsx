'use client';

import DLoader from "@/components/DataLoader";

export default function RootLoading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <DLoader message="Loading page…" />
    </div>
  );
}
