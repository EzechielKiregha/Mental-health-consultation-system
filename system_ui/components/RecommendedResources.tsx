'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Resource } from '@/hooks/useResources';

export default function RecommendedResources({ resourceIds }: { resourceIds: number[] }) {
  const [items, setItems] = useState<Resource[]>([]);
  useEffect(() => {
    api.get<Resource[]>('/resources', {
      params: { ids: resourceIds.join(',') }
    }).then(res => setItems(res.data));
  }, [resourceIds]);

  if (resourceIds.length === 0) {
    return <p className="text-gray-600 italic">No resources to recommend right now. Keep up the good work!</p>;
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-green-800">Recommended for You</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {items.map(r => (
          <div key={r.id} className="bg-green-50 border border-green-600 rounded-lg p-4">
            <h3 className="font-bold">{r.title}</h3>
            <p className="mt-1 text-sm">{r.content.slice(0, 100)}…</p>
          </div>
        ))}
      </div>
    </div>
  );
}
