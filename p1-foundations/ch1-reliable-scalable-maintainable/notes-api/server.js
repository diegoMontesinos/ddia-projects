const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = './notes.json';

app.use(express.json());

// Función helper para leer y escribir notas
function readNotes() {
  if (!fs.existsSync(DB_FILE)) return [];
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}

function writeNotes(notes) {
  fs.writeFileSync(DB_FILE, JSON.stringify(notes, null, 2));
}

// GET /notes - obtener todas las notas
app.get('/notes', (req, res) => {
  res.json(readNotes());
});

// POST /notes - crear una nota
app.post('/notes', (req, res) => {
  const notes = readNotes();
  const newNote = { id: uuidv4(), ...req.body };
  notes.push(newNote);
  writeNotes(notes);
  res.status(201).json(newNote);
});

// PUT /notes/:id - actualizar una nota
app.put('/notes/:id', (req, res) => {
  let notes = readNotes();
  const index = notes.findIndex(
    (n) => n.id === req.params.id
  );
  if (index === -1)
    return res
      .status(404)
      .json({ error: 'Note not found' });

  notes[index] = { ...notes[index], ...req.body };
  writeNotes(notes);
  res.json(notes[index]);
});

// DELETE /notes/:id - borrar una nota
app.delete('/notes/:id', (req, res) => {
  let notes = readNotes();
  const filtered = notes.filter(
    (n) => n.id !== req.params.id
  );
  if (filtered.length === notes.length) {
    return res
      .status(404)
      .json({ error: 'Note not found' });
  }
  writeNotes(filtered);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(
    `Notes API running on http://localhost:${PORT}`
  );
});
