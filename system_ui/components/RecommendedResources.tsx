'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Resource } from '@/hooks/useResources';
import BasePopover from './BasePopover';

function ResourceCard({ resource }: { resource: Resource }) {
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
        </div>
      </div>
    </BasePopover>
  );
}

export default function RecommendedResources({ resourceIds }: { resourceIds: number[] }) {
  const [items, setItems] = useState<Resource[]>([]);

  useEffect(() => {
    if (resourceIds.length > 0) {
      api.get<Resource[]>('/resources', {
        params: { ids: resourceIds.join(',') }
      }).then(res => setItems(res.data));
    }
  }, [resourceIds]);

  if (resourceIds.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="text-5xl mb-4">✨</div>
        <p className="text-gray-700 text-lg font-medium">No resources to recommend right now</p>
        <p className="text-gray-500 mt-2">Keep up the great work on your mental health journey!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-green-800 mb-2">Recommended Resources</h2>
        <p className="text-gray-600">Based on your assessment, we recommend these resources to help you</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(r => (
          <div
            key={r.id}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col h-full">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">{r.resourceType}</p>
              <h3 className="text-lg font-bold text-green-800 mb-3 line-clamp-2">{r.title}</h3>
              <p className="text-gray-700 text-sm mb-4 flex-grow line-clamp-3">
                {r.content.slice(0, 150)}...
              </p>
              <div className="pt-4 border-t border-gray-200">
                <ResourceCard resource={r} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
