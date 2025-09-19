const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();

const PORT = process.env.PORT || 3000;
const DB_FILE = './data/notes.json';

// Utility functions
const loadNotesFromFile = () => {
  if (!fs.existsSync(DB_FILE)) return {};
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
};

const saveNotesToFile = (notes) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(notes, null, 2));
};

const notes = loadNotesFromFile();

app.use(express.json());

// GET /notes - get all the notes
app.get('/notes', (req, res) => {
  res.json(notes);
});

// GET /notes/:id - get a specific note by id
app.get('/notes/:id', (req, res) => {
  const { id } = req.params;
  if (notes[id]) {
    return res.json(notes[id]);
  }

  res.status(404).json({ message: 'Note not found' });
});

// POST /notes - create a new note
app.post('/notes', (req, res) => {
  const { content } = req.body;
  const id = uuidv4();

  notes[id] = { id, content };
  saveNotesToFile(notes);

  res.status(201).json(notes[id]);
});

// PUT /notes/:id - update a note by id
app.put('/notes/:id', (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  if (notes[id]) {
    notes[id].content = content;
    saveNotesToFile(notes);
    return res.json(notes[id]);
  }

  res.status(404).json({ message: 'Note not found' });
});

// DELETE /notes/:id - delete a note by id
app.delete('/notes/:id', (req, res) => {
  const { id } = req.params;
  delete notes[id];
  saveNotesToFile(notes);

  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(
    `Notes API running on http://localhost:${PORT}`
  );
});
