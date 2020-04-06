const express = require('express');
const xss = require('xss');

const notesRouter = express.Router();
const NotesService = require('./notes-service');

// middleware setup
notesRouter.use(express.json());


// sanitizing note data before it goes out
const sanitizeNote = note => {
  return {
    id: note.id,
    name: xss(note.name),
    content: xss(note.content),
    folderId: note.folderId,
    modified: note.modified
  };
};


// create record
notesRouter.post('/', (req, res, next) => {
  const db = req.app.get('db');
  
  // if id or modified is blank we'll ignore it
  // name, content and folderId must not be blank

  const requiredFields = ['name', 'content', 'foldrId'];
  for (let field in requiredFields) {
    if (!req.body[field]) {
      return res
        .status(400)
        .send(`'${field}' is required`);
    }
  }

  const { id, name, content, folderId, modified } = req.body;
  const note = { name, content, folderId };
  if (id) note.id = id;
  if (modified) note.modified = modified;

  NotesService.addNote(db, note)
    .then(note => {
      return res.status(200).json(sanitizeNote(note));
    })
    .catch(next);
});

// read records
notesRouter.get('/', (req, res, next) => {
  const db = req.app.get('db');

  NotesService.getNotes(db)
    .then(notes => {
      return res.status(200).json(notes.map(sanitizeNote));
    })
    .catch(next);
});

notesRouter.get('/:id', (req, res, next) => {
  const { id } = req.params;
  const db = req.app.get('db');

  NotesService.getNoteById(db, id)
    .then(note => {
      if (note) {
        return res.status(200).json(sanitizeNote(note));
      } else {
        return res.status(404).send('Note not found');
      }
      
    })
    .catch(next);
});


// delete record


module.exports = notesRouter;