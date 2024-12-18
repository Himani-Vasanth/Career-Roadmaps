import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Roadmap } from './models/roadmap.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/career-roadmaps');

// Create a new roadmap
app.post('/api/roadmaps', async (req, res) => {
  try {
    const roadmap = new Roadmap(req.body);
    await roadmap.save();
    res.status(201).json(roadmap);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all roadmaps
app.get('/api/roadmaps', async (req, res) => {
  try {
    const roadmaps = await Roadmap.find();
    res.json(roadmaps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a roadmap
app.put('/api/roadmaps/:id', async (req, res) => {
  try {
    const roadmap = await Roadmap.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(roadmap);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a roadmap
app.delete('/api/roadmaps/:id', async (req, res) => {
  try {
    await Roadmap.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});