import React, { useState, useEffect } from 'react';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';
import RoadmapForm from './components/RoadmapForm';
import RoadmapList from './components/RoadmapList';
import { getRoadmaps, createRoadmap, updateRoadmap, deleteRoadmap } from './api';
import { Roadmap } from './types';

function App() {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRoadmap, setEditingRoadmap] = useState<Roadmap | null>(null);

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  const fetchRoadmaps = async () => {
    const data = await getRoadmaps();
    setRoadmaps(data);
  };

  const handleCreateRoadmap = async (roadmap: Omit<Roadmap, '_id'>) => {
    await createRoadmap(roadmap);
    fetchRoadmaps();
    setIsFormOpen(false);
  };

  const handleUpdateRoadmap = async (id: string, roadmap: Omit<Roadmap, '_id'>) => {
    await updateRoadmap(id, roadmap);
    fetchRoadmaps();
    setEditingRoadmap(null);
  };

  const handleDeleteRoadmap = async (id: string) => {
    await deleteRoadmap(id);
    fetchRoadmaps();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Career Roadmaps</h1>
            <button
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Add Roadmap
            </button>
          </div>

          {(isFormOpen || editingRoadmap) && (
            <RoadmapForm
              onSubmit={editingRoadmap ? 
                (data) => handleUpdateRoadmap(editingRoadmap._id, data) : 
                handleCreateRoadmap}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingRoadmap(null);
              }}
              initialData={editingRoadmap}
            />
          )}

          <RoadmapList
            roadmaps={roadmaps}
            onEdit={setEditingRoadmap}
            onDelete={handleDeleteRoadmap}
          />
        </div>
      </div>
    </div>
  );
}

export default App;