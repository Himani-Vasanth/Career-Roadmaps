import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Roadmap } from '../types';

interface Props {
  roadmaps: Roadmap[];
  onEdit: (roadmap: Roadmap) => void;
  onDelete: (id: string) => void;
}

const RoadmapList: React.FC<Props> = ({ roadmaps, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {roadmaps.map((roadmap) => (
        <div
          key={roadmap._id}
          className="bg-white overflow-hidden shadow rounded-lg"
        >
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {roadmap.title}
                </h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  {roadmap.category}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onEdit(roadmap)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <Pencil className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDelete(roadmap._id)}
                  className="text-red-400 hover:text-red-500"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-500">{roadmap.description}</p>
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-900">Steps:</h4>
              <ul className="mt-2 space-y-2">
                {roadmap.steps.map((step, index) => (
                  <li key={index} className="text-sm text-gray-500">
                    {index + 1}. {step.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoadmapList;