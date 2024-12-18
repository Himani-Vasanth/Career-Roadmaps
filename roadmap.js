import mongoose from 'mongoose';

const roadmapSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Frontend', 'Backend', 'DevOps'],
  },
  description: {
    type: String,
    required: true,
  },
  steps: [{
    title: String,
    description: String,
    resources: [String],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Roadmap = mongoose.model('Roadmap', roadmapSchema);