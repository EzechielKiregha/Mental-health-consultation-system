"use client";

import React, { useEffect, useState } from "react";
import DynamicTable from "../../../components/tables/DynamicTable";
import api from "../../../lib/api";
import { ArrowLeft } from "lucide-react";
import DLoader from "@/components/DataLoader";

const columns = [
  { id: "id", label: "ID" },
  { id: "name", label: "Name" },
  { id: "score", label: "Score" },
  { id: "date", label: "Date" },
];

export default function SelfCheckResults() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/self-check/results")
      .then((response) => {
        setData(response.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <span className="text-gray-600 mb-4">
        <ArrowLeft className="inline mr-2" />
        <a href="/dashboard" className="text-green-600 hover:underline">
          Back to dashboard
        </a>
      </span>
      <h1 className="text-2xl font-bold text-green-800 mb-4">Self-Check Results</h1>
      {loading ? (
        <DLoader message="Loading results..." />
      ) : (
        <DynamicTable columns={columns} data={data} title="Results" />
      )}
    </div>
  );
}
