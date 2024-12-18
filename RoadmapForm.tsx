import React, { useState } from 'react';
import { Roadmap } from '../types';

interface Props {
  onSubmit: (data: Omit<Roadmap, '_id'>) => void;
  onCancel: () => void;
  initialData?: Roadmap | null;
}

const RoadmapForm: React.FC<Props> = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    category: initialData?.category || 'Frontend',
    description: initialData?.description || '',
    steps: initialData?.steps || [{ title: '', description: '', resources: [''] }],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addStep = () => {
    setFormData({
      ...formData,
      steps: [...formData.steps, { title: '', description: '', resources: [''] }],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Title
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Category
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="DevOps">DevOps</option>
          </select>
        </label>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Description
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </label>
      </div>

      <div className="mb-4">
        <h3 className="text-gray-700 font-bold mb-2">Steps</h3>
        {formData.steps.map((step, index) => (
          <div key={index} className="mb-4 p-4 border rounded">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
              placeholder="Step Title"
              value={step.title}
              onChange={(e) => {
                const newSteps = [...formData.steps];
                newSteps[index].title = e.target.value;
                setFormData({ ...formData, steps: newSteps });
              }}
            />
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
              placeholder="Step Description"
              value={step.description}
              onChange={(e) => {
                const newSteps = [...formData.steps];
                newSteps[index].description = e.target.value;
                setFormData({ ...formData, steps: newSteps });
              }}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addStep}
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
        >
          Add Step
        </button>
      </div>

      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        >
          {initialData ? 'Update' : 'Create'} Roadmap
        </button>
      </div>
    </form>
  );
};

export default RoadmapForm;